<div align="center">

# TT助手 AI · 源码工程 v1.5.5

**AI 视频 · AI 短剧 · AI 创作 · 一键剪辑 · 一键出片**

[![官网](https://img.shields.io/badge/官网-tt2066.top-ff3d5a?style=flat-square)](https://tt2066.top/)
[![API](https://img.shields.io/badge/AI接口-ai.tt2066.top-ffa53d?style=flat-square)](https://ai.tt2066.top/)
[![中转站](https://img.shields.io/badge/破甲中转站-满血版-2ee6a8?style=flat-square)](https://www.tt2066.top/)

</div>

> **本仓库是 TT助手 AI 客户端的完整源码工程。**
> 想直接用成品、不想自己构建 —— 装桌面客户端：[**tt2066.top**](https://tt2066.top/)
> 想接模型、写自己的应用 —— 拿一串密钥接中转站：[**ai.tt2066.top**](https://ai.tt2066.top/)　（OpenAI 协议兼容，一个 base_url 切换全部模型）

---

## 一分钟了解能做什么

| 能力 | 说明 |
|---|---|
| **AI 视频** | 文生视频 / 图生视频，任务队列 + 进度 + 结果下载 |
| **AI 短剧** | 剧本 → 分镜 → 画面，一条流水线出片 |
| **AI 创作** | 绘画、文案、脚本、标题，对话式完成 |
| **一键剪辑** | 素材自动拼接、转场、字幕，导出成片 |
| **一键出短片** | 输入一句话，直接产出可发布的短视频 |

## 两条使用路径

**1. 直接装客户端（推荐给普通用户）**

打开 [tt2066.top](https://tt2066.top/) → 下载 Windows 客户端 → 登录即用。接口已内置，不用配置。

**2. 用源码自己构建（给开发者）**

```bash
npm install
npm run dev          # 开发模式
npm run build        # 打包 Windows 绿色包
```

**3. 只想接模型 API？**

[ai.tt2066.top](https://ai.tt2066.top/) —— 破甲中转站，GPT / Claude / Gemini / Grok / DeepSeek 一个 base_url 全打通：

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-你的密钥",
    base_url="https://ai.tt2066.top/v1"
)
```

---

## 源码说明
# AI Creation（梦颜AI）客户端 · 完整源码工程

对 `AI-Creation v1.5.5`（Electron 绿色客户端）的**整套源码克隆**：
Electron 外壳、本地 API 网关、豆包本地助手、离线卡密内核全部原样还原；
前端 Vue SPA 从线上 Vite 产物逆向还原为可构建、可编辑的源码工程。

> ### 官方 1.5.8 已跟进（见 [`v158/README.md`](v158/README.md)）
>
> 官方最新版 **1.5.8** 换成了 V8 字节码主进程（`.compiled/*.bin` + `bytecode-loader.cjs`），
> 客户端内已无任何授权代码；授权只剩远端 `GET /api/auth/status` 一个判据。
>
> ```bash
> npm run build:v158     # 从官方解包目录生成去授权可运行包 → dist/AI-Creation-v1.5.8-local
> npm run verify:v158    # CDP 逐页验证（实测 13/13 页渲染、控制台 0 错误、无激活页、无卡密入口）
> ```
>
> 产物启动方式：双击 `启动.cmd`（先起本地网关 127.0.0.1:8787，再起客户端）。

> 产物验证（全部实测）：
> - `npm run build:web` 构建通过，21 个 CSS 与线上原包逐字节对齐；
> - `npm test` 8/8 通过（授权链 + 导航策略）；
> - `npm run smoke`：接口层 14 项 + 界面层 8 页全过，控制台 0 错误
>   （含：真提交绘画任务 → 7s 后 success → 图片可下载；对话 SSE 流式应答）；
> - `npm run build` + `node tools/smoke-app.mjs`：**打包出的 AI-Creation.exe 真实启动**，
>   app.asar 里的本地渲染器 + 网关 + 豆包助手全部拉起，CDP 实测窗口内
>   「本地版 · 永久有效」与侧边栏渲染正常（docs/smoke-app-home.png）。
> 截图见 `docs/smoke-*.png`。

## 目录结构

```
AI-Creation-Source/
├─ package.json            # 全部 npm scripts（dev / build / test / keygen / smoke）
├─ build.cjs               # 打包出与官方一致的 Windows 绿色包（app.asar + resources/*）
├─ electron/               # ★ 主进程源码（与原 app.asar 内文件一致，仅 main.cjs 加了本地加载分支）
│  ├─ main.cjs             #   窗口 / 菜单 / 更新检查 / fork 网关与豆包助手 / license IPC
│  ├─ preload.cjs          #   许可桥 + 主世界 fetch 劫持（/api/auth/* 本地应答，/api/* → 网关）
│  ├─ policy.cjs           #   HOME 解析 + 同源/外链判定
│  ├─ license-core.cjs     #   离线卡密内核（HMAC-SHA256 + Crockford Base32）
│  ├─ offline.html / home.json / brand-icon.*
├─ gateway/ai-gateway.cjs  # ★ 本地业务网关（127.0.0.1:8787，JSON 落盘，占位视频任务）
├─ doubao-agent/           # ★ 豆包本地助手（playwright-core 驱动多账号浏览器，IPC 配对）
├─ renderer/               # ★ 前端源码（逆向还原）
│  ├─ index.html / vite.config.mjs / public/
│  └─ src/
│     ├─ main.js           #   入口：挂载 App + router（含纯浏览器调试兜底）
│     ├─ runtime/index.js  #   共享层：Vue 运行时 + 应用外壳(激活页/落地页/侧边栏) + 路由表 + /admin
│     ├─ runtime/icons/    #   24 个 lucide 图标分块
│     ├─ views/            #   20 个页面分块（Home/Chat/Draw/Video/ScriptMaker/...）
│     └─ styles/           #   base.css（全局/外壳） + pages/*.css（每页 1:1 原始样式）
├─ recovered/              # 逆向中间产物：美化后的原始 bundle、路由表、接口清单、chunk 映射
├─ tools/                  # clone-back.mjs（还原脚本）、keygen.py、asar 解包、dev/smoke 启动器
├─ test/                   # node:test 单测（policy / license），npm test 全绿
└─ docs/                   # 架构、接口、还原过程、已知缺陷、与上游差异
```

## 快速开始

```bash
npm install                # electron 44.4.3 较大，首次联网下载（国内可加 ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/）
npm run build:web          # 构建还原前端 → renderer/dist
npm test                   # 10 个单测：导航策略 + 卡密内核
npm run smoke              # 端到端冒烟：静态托管 + 真网关 + 无头浏览器（接口 + 8 个页面）
npm run build              # 打包 Windows 绿色目录（dist/AI-Creation-win32-x64，离线复用本地 electron）
node tools/smoke-app.mjs   # 真实启动打包出的 AI-Creation.exe，CDP 截图验证

npm run start:local        # Electron 加载本地 dist，业务接口走本地网关（完全离线可跑）
npm run dev                # vite dev + electron 热更新联调
npm run start              # 原版形态：加载 home.json 里的远端站点

python tools/keygen.py -t P -n 5        # 签 5 张永久卡（与 JS 内核字节级一致，--selftest 可交叉验证）
python tools/keygen.py --verify MYAI-P000-XXXX-XXXXXXXX
```

首次跑本地形态时：删掉 `user-data/license.json`（如有）重启 → 激活页输入
`python tools/keygen.py` 打出的任意一张卡即可。

## 三种运行形态

| 形态 | 命令 | 页面来源 | 业务接口 | 说明 |
|---|---|---|---|---|
| 上游原版 | `npm run start` | `home.json` 远端站点 | 远端 | 与官方客户端行为一致 |
| 本地源码 | `npm run start:local` | `renderer/dist`（本工程） | 本地网关 8787 | 完全离线；生成结果为网关占位物 |
| 联调 | `npm run dev` | vite dev 5173 | 本地网关 | 前端热更新 |

关键开关（与上游补丁包一致）：`user-data/crack-config.json` 的 `mode`
（`local` / `upstream`）、`gatewayPort`、`debug`、`devtools`。

## 前端还原方式（要点）

1. `tools/unasar.js` 解开 `resources/app.asar`（asar 头部布局见 `docs/RECOVERY.md`）；
2. 抓取线上 SPA：`index.html` → 主包 `index-Z8pMLIar.js`（189KB）+ 45 个分块 + 21 个 CSS；
3. prettier 美化 → `recovered/bundles/*.pretty.js`；
4. `tools/clone-back.mjs` 机械还原：
   - 主包尾部的 `Eu(yv).use(Ev).mount("#app")` 改成
     `export { yv as App, Ev as router, Eu as createApp }`；
   - 删除 `__vite__mapDeps` CSS 预加载参数，改由每个视图顶部显式 `import "../styles/pages/X.css"`；
   - 动态 `import("./Home-BE7O8OSv.js")` → `import("../views/Home.js")`，
     `from "./index-Z8pMLIar.js"` → `from "../runtime/index.js"`，图标分块归位 `runtime/icons/`；
   - 页面级 CSS 按原 `data-v-*` scopeId 保留（组件里的 `__scopeId` 未动，样式选择器照常命中）。
5. 还原是**机械且可复现**的：重跑 `node tools/clone-back.mjs` 可从 `recovered/` 再生 `renderer/src`。

大小对照（还原产物 vs 线上原包）：index.css 51,124 vs 51,215 字节；
各页面 CSS 均在 ±10 字节内；JS 分块因 prettier/摇树体积略有出入，逻辑同源。

## 与上游包的差异（全部标注在源码内）

- `electron/main.cjs`：新增 `[LOCAL]` 本地渲染器托管（`AI_CREATION_DEV_URL` / `AI_CREATION_LOAD=local`），
  其余逻辑逐行保持原样；
- `gateway/routes-extra.cjs`：[LOCAL] 新增业务路由模块（对话 SSE / 绘画 / 作品 / 任务聚合 /
  重制工场 / 电商短剧 / 剧本工具 / 图片上传 / 豆包台账），`ai-gateway.cjs` 只加了
  一处 8 行的挂载点，上游原有路由原样保留；
- `renderer/**`：为可构建而做的模块路径重排（映射表在 `recovered/chunk-map.json`）；
- `tools/keygen.py`：限时卡上限从上游的 3650 天改为 999 天（上游的 3650 天
  卡实际签出来解析不了，见 `docs/BUGS.md`）；
- 新增 `test/`、`tools/smoke.mjs`、`build.cjs`（上游无测试与可复现打包脚本）。

## 合规提示（内部记录，非免责）

本仓库仅还原用户本机已持有客户端的技术结构，供学习、审计与二次开发。
`gateway/ai-gateway.cjs` 的生成接口返回的是占位视频；真实生成需要接入自己的
OpenAI 兼容上游（设置页原生支持），或回 `upstream` 模式走官方服务器。

