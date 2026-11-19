# TT助手AI 客户端源码（改版）

基于官方 1.5.5 客户端还原工程，已移除全部授权验证并做了若干修复。

## 目录说明

```
electron/        Electron 主进程、preload、授权内核
gateway/         本地 API 网关（端口 8787）
renderer/        前端（Vue 3 渲染函数形式）
  src/           源码
  public/        静态资源（含首页图/视频，已本地化，离线可用）
  index.html
  vite.config.mjs
doubao-agent/    豆包本地助手
tools/           构建与校验脚本
test/            单元测试
docs/            截图与说明
v158/            1.5.8 破解版资产（独立目录，含说明）
build.cjs        打包脚本
package.json     依赖与脚本
```

## 安装与运行

```bash
bun install
# 首次需要补 Electron 二进制
ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/ bun node_modules/electron/install.js

# 开发运行（本地模式，不连官方服务器）
set AI_CREATION_LOAD=local
bunx electron .

# 构建前端
bun run build
```

## 本版改动

### 授权
- `electron/license-core.cjs`：`LICENSE_LOCKED=false`，`verify()` 恒通过，`toStatus()` 恒返回已激活；保留 `verifyStrict()` 原算法供测试
- 移除前端的 `/api/auth/status` 校验、激活页、退出登录、卡密入口
- 网关移除 `/api/admin/agency*` 全部接口

### 品牌
- 全局由「梦颜AI」改为「TT助手AI」
- 窗口标题、`productName`、页面 `<title>` 同步

### 功能修复
- **会话 ID 改纯数字**：前端用 `Number()` 比较会话 ID，原来 `chat_xxx` 字符串会得到 `NaN`，导致流式内容不显示、生成状态永不复位（界面卡在"生成中"）
- **模型三段配置**：文本 / 图片 / 视频分别填 Base URL、Key、模型名，各自有「测试连接」「获取模型」「保存」，另有「全部保存」
- **探测区分类型**：图片/视频会额外验证 `/images/generations`、`/videos` 是否存在，不存在直接提示不支持，不再把对话模型误报为可用
- **清除语义修正**：`prev` 改为合并前读取，清空地址能真正删掉派生的上游配置
- **请求超时**：探测与保存都有 12/15 秒硬超时，不再无限转圈
- **DevTools 不再自动弹出**：只有 `user-data/crack-config.json` 里 `"devtools": true` 才开；环境变量 `AI_CREATION_DEBUG=1` 只开调试端口
- **首页媒体本地化**：`char-hero-home.png`、`media/*.mp4` 等 9 个文件已放进 `public`，不再依赖外网
- **画风缩略图**：`public/style-thumbnails/` 14 张已补齐，不再破图

### 移除
- 「代理加盟」：路由、后台导航、组件、网关接口、解锁文案全部删除
- 「AI漫剧全功能」不再内嵌第三方 iframe（原为 `mengyan.kk0606.com`，会强制登录），改为本机 ComfyUI 引擎控制台

## ComfyUI 本地引擎（可选）

`gateway/comfy-manager.cjs` 会在客户机首次使用时自动下载并安装 ComfyUI：

- 官方 Windows 便携包约 1.93 GB（自带 Python + CUDA torch）
- 默认 checkpoint（SD1.5）约 4 GB
- 只监听 `127.0.0.1`，不对外暴露

开关与参数写在 `user-data/data/gateway/db.json` 的 `settings.comfy`：

```json
{ "enabled": true, "checkpoint": "v1-5-pruned-emaonly.safetensors", "steps": 20, "cfg": 7 }
```

未启用时绘画走本地 SVG 占位，8 秒出图。

## 配置上游模型

三种类型可分别用不同服务商。填完点「测试连接」验证，再点「保存」。

- 文本：走 `/chat/completions`
- 图片：走 `/images/generations`
- 视频：走 `/videos`，提交后自动轮询任务

配置只存在本机 `user-data/data/gateway/db.json`，不随包分发。

## 已知限制

- 图片、视频接口需要上游服务商真实支持。很多纯对话中转站没有这两个接口，探测会直接提示不支持
- 视频生成需要上游提供 `/videos` 提交与查询接口，或改用本机 ComfyUI（当前只接了文生图工作流）
