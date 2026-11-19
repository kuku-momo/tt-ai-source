# 架构

## 进程模型

```
AI-Creation.exe (Electron 44.4.3)
├─ 主进程 electron/main.cjs
│   ├─ BrowserWindow → preload.cjs → 加载页面
│   │    ├─ 上游模式：home.json 的站点（默认 https://khd.yxzyxm.top/）
│   │    └─ 本地模式：renderer/dist（本工程，见 main.cjs [LOCAL] 段）
│   ├─ fork → gateway/ai-gateway.cjs     127.0.0.1:8787（端口被占自动改随机）
│   ├─ fork → doubao-agent/main.cjs      本机浏览器自动化助手
│   └─ IPC：license:status/activate/logout/api-base、
│           doubao-agent-pair/-open-account/-account-status、
│           check-for-updates / open-update-download
└─ 渲染进程（sandbox + contextIsolation）
    preload 暴露：aiCreationLicense / doubaoAgent / aiCreationUpdater
    并在主世界装 fetch 钩子：
      /api/auth/status  → 主进程离线卡密应答
      /api/auth/activate|logout → 主进程
      /api/* 其它       → 改道 http://127.0.0.1:<gatewayPort>
```

安全边界（与上游一致）：`policy.cjs` 限定 `will-navigate`/`windowOpen` 只允许
HOME 同源跳转，外链交给系统浏览器；权限只放行 HOME 内的剪贴板写入；
webview 一律拒绝；失败页固定 offline.html。

## 数据流

- 授权：卡密 → `license-core.verify()`（HMAC-SHA256 签名 + Crockford Base32）
  → `user-data/license.json`（0600 原子写）→ `/api/auth/status` 驱动外壳 UI。
- 业务：页面 `fetch('/api/...')` → preload 钩子 → 网关 → `data/gateway/db.json` 落盘。
  视频任务 4s 后进入 generating、12s 后 success 并返回 demo 域名占位视频。
- 豆包助手：页面 → IPC → `doubao-agent`，用 playwright-core 为每个账号开独立
  浏览器窗口提交分镜提示词/资产图，结果回填服务器（配对信息存 user-data）。
- 更新：启动 3.5s 后拉 `/downloads/AI-Creation-Windows-version.json`，
  仅提示下载，不自动替换文件。

## 卡密算法

```
code = MYAI-<T><DDD>-<SSSS>-<HHHHHHHH>
sig  = CrockfordB32( HMAC-SHA256(SECRET, "MYAI|T|DDD|SSSS")[0..4] )   # 每字节→2字符，取高3位/低5位
SECRET = "AI-Creation/2026/license-core/v1:9f3c1d7a5b2e48c0a6d4f19b7e83c25d"
字母表 = 0123456789ABCDEFGHJKMNPQRSTVWXYZ   （无 I L O U）
```

`tools/keygen.py` 与 `electron/license-core.cjs` 是同一算法的两种实现，
`python tools/keygen.py --selftest` 会互相签/验对方产物做交叉自检。

## 端口与文件

| 项 | 值 |
|---|---|
| 网关 | 127.0.0.1:8787（占用则随机） |
| 本地静态服务 | 随机端口，仅 `AI_CREATION_LOAD=local` 时启动 |
| user-data | exe 同目录 `user-data/`（license.json、crack-config.json、gateway.log、license.log、data/gateway/db.json） |
| 豆包数据 | `user-data/`（DOUBAO_AGENT_CONFIG_DIR） |
