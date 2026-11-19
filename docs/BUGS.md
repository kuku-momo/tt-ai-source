# 已知缺陷（上游遗留，本工程原样保留并标注）

## 1. 限时卡最长只能签 999 天（严重度：低）

`license-core.cjs` 的 `generate()` 把天数夹在 `1..3650`，但卡密字段 `DDD` 只有
3 位数字：`3650` 拼进 `MYAI-D3650-...` 后 `parse()` 的正则
`^([PD])(\d{3})([0-9A-Z]{4})([0-9A-Z]{8})$` 匹配失败，卡直接“格式不正确”。
也就是说上游说明文档里的「365 天卡」能签，「3650 天卡」签出来是废卡。

- `test/license.test.cjs` 已把该行为固化为断言；
- `tools/keygen.py` 的上限改为 999 天并对超限请求打警告。

## 2. 网关演示视频依赖线上域名（低）

`ai-gateway.cjs` 的占位任务 12 秒后返回 `demoBase() + /media/login-demo-*.mp4`，
默认取 `home.json` 的域名。完全离线时视频 404，但任务流程状态机是完整的。
可用 `AI_GATEWAY_DEMO_BASE` 指到任意自有域名。

## 3. doc/docx/pdf 剧本导入是占位（低）

`/api/short-drama-production/source/import` 只解析 txt/md，其它格式返回提示
文本（上游正式服务在服务器侧解析）。要补齐可挂 `mammoth`/`pdf-parse`。

## 4. 打包形态下 __dirname 是 app.asar（已修复）

main.cjs 本地静态服务最初用 `path.join(__dirname,'..','renderer','dist')`，
在打包形态（__dirname = resources/app.asar）会指到 asar 外面导致「renderer/dist
不存在」。已改为两候选路径：asar 内 `renderer/dist` 与仓库 `renderer/dist`。

## 5. 本机 ELECTRON_RUN_AS_NODE 残留（环境坑，与上游 README 提醒一致）

本机若全局设置了 `ELECTRON_RUN_AS_NODE=1`，任何 electron exe（包括打包出的
AI-Creation.exe）都会以纯 Node 模式启动并立即退出。tools/smoke-app.mjs 已在
spawn 时剔除该变量；手动双击运行前也需清掉它。

## 6. 双 Vue 实例风险（提示）

`renderer/src/runtime/index.js` 自带一份 Vue 运行时（与上游 bundle 一致），
因此**不要**在 `renderer` 里再 `npm i vue` 并混用两套实例；新增共享逻辑请
放进 runtime 或通过 props/事件传递。
