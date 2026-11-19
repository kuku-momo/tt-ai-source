# v158 —— 官方 1.5.8 客户端的本地化改造

官方 `AI-Creation-Windows-v1.5.8.zip`（154.1 MB，SHA256 `9e41848cb5ea0005e3de17c678e5c064cb74141dc0872356abfa943a66552203`）
与 1.5.5 的源码工程完全不同：**主进程不再是明文 JS，而是 V8 字节码**。

## 官方 1.5.8 的结构

```
resources/
├─ app.asar
│  ├─ main.cjs                 // 2 行：require('./bytecode-loader.cjs')(module, 'main')
│  ├─ branding.cjs             // 同上
│  ├─ policy.cjs               // 明文校验 home.json + 字节码加载 policy
│  ├─ bytecode-loader.cjs      // 用 vm.Script + cachedData 还原函数
│  ├─ preload.cjs              // 30 行，只暴露 doubaoAgent / aiCreationUpdater
│  └─ .compiled/{main,policy,branding}.{bin,json}
├─ doubao-agent/               // 同样改成字节码（.compiled + dom-adapter）
├─ branding.json / home.json
```

`bytecode-loader.cjs` 的三重校验决定了不能替换运行时：

```js
if (process.versions.v8 !== meta.v8 || process.versions.modules !== meta.modules || process.arch !== meta.arch)
  throw new Error('客户端组件版本不一致，请重新完整解压客户端。');
```

当前官方包的目标是 `v8=15.2.124.28-electron.0  modules=149  arch=x64`，
因此**必须用官方 `梦颜AI.exe` 运行**，用别的 Electron 版本替换会直接抛错。

## 授权在哪

对 `main.bin` 做字符串扫描（256 条可打印串），关键字
`license|card|auth|activat|verify|token|session|403|admin|ipcMain|handle|license-core`
只命中 5 条，且全是 preload 权限处理器的名字：

```
preload
preload.cjs
setPermissionRequestHandler
setPermissionCheckHandler
setWindowOpenHandler
```

**主进程里没有任何授权代码**。发包抓取证实授权只有一个判据：

```
GET /api/auth/status  →  {"activated":false,"expiresAt":null,"cardName":null,"cardType":null,"permanent":false}
```

返回 `activated:false` 时远端 SPA 渲染激活页（要求输入卡密 / 扫码领卡密）。
UA 是 `AICreation/1.5.8`，页面来自 `https://khd.yxzyxm.top/`。

## 改造方式

用自定义 `preload.cjs` 替换官方那份（见 `preload.cjs`），在主世界装 fetch 钩子：

| 路径 | 处理 |
|---|---|
| `/api/auth/status` | 直接返回 `{activated:true, cardName:'本地版', permanent:true}` |
| `/api/auth/activate` | 返回 `{ok:true, ...}` |
| `/api/auth/logout` | 返回 `{ok:true}`，不清任何状态 |
| `/api/site/card-claim` | 返回 `enabled:false`，关闭领卡弹窗 |
| 其它 `/api/*` | 探活 `127.0.0.1:8787/api/health`，通则改道本地网关（带 `credentials:'include'`），否则回落远端 |

另外用 `MutationObserver` 隐藏 `我的卡密 / 退出登录 / 领取卡密 / 激活 / 教程中心 / 代理加盟`
六个入口，避免把用户导回领卡流程。

`preload.cjs` 里的钩子函数会被 `contextBridge.executeInMainWorld` 序列化到主世界执行，
**不能引用 preload 作用域的变量**，所有常量和工具函数都写在函数体内。

## 网关

`resources/gateway/` 由本仓库 `gateway/` + `electron/license-core.cjs` 提供，
覆盖对话 SSE / 绘画 / 视频 / 作品 / 任务 / 重制 / 电商 / 剧本工具 / 上传 / 豆包台账
以及 `/api/admin/*` 全套后台接口与 `/api/feedback`。

用官方 exe 的 Node 模式跑，不需要额外装 node：

```
set ELECTRON_RUN_AS_NODE=1
梦颜AI.exe resources\gateway\ai-gateway.cjs
```

## 启动

双击 `启动.cmd` → 调 `launcher.ps1`：

1. 探 `127.0.0.1:8787/api/health`，已在跑就跳过
2. 否则用 `ELECTRON_RUN_AS_NODE=1 梦颜AI.exe resources\gateway\ai-gateway.cjs` 起网关，最多等 7 秒
3. 再启动客户端

`启动.cmd` 是纯 ASCII + CRLF，`launcher.ps1` 也是纯 ASCII ——
cmd.exe 在 GBK 代码页下读 UTF-8 中文会解析错乱，中文文件名由 PowerShell 按 UTF-16 处理。

## 构建

```
npm run build:v158          # 或 bun tools/build-v158-crack.mjs
```

输入 `D:\Backup\Downloads\ai-158\unpacked\AI-Creation-Windows-v1.5.8`（官方解包目录），
输出 `dist\AI-Creation-v1.5.8-local`：
复制官方运行时 → 解包 app.asar → 换 `preload.cjs` → 重打包 → 灌网关 → 放启动器。

## 验证

```
npm run verify:v158         # 需要客户端带 --remote-debugging-port=9222 启动
```

CDP 连上后逐页点击，实测结果：**13/13 页面渲染、控制台错误 0 条**，
`hasActivation:false`、`hasCardText:false`、顶栏只剩 `客户端 v1.5.8 / 刷新 / 本地版 · 永久有效`。

`/feedback` 页面文本里会出现「卡密」二字，来源是页面自带的隐私提示
「请勿提交完整卡密、API密钥或密码；截图前请遮挡敏感信息」，属于提示文案，非验证入口。

## 与 1.5.5 的差异

| 项 | 1.5.5 | 1.5.8 |
|---|---|---|
| 主进程 | 明文 `main.cjs` | V8 字节码 `.compiled/main.bin` |
| 前端 | 本地 `renderer/dist` | 远端 `https://khd.yxzyxm.top/` |
| 授权判定 | 客户端 `license-core.cjs` 校验卡密签名 | 仅远端 `/api/auth/status` |
| 卡密内核 | 参与本地判定 | 只给网关签发卡密用 |
| preload | 自带许可桥 + fetch 钩子 | 无，需自行替代 |
| 豆包助手 | 明文 JS | 字节码 + `dom-adapter.cjs` |
