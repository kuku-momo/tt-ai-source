# 豆包助手便携版

这是本地客户端的基础运行目录。完整解压后运行 `node main.cjs` 可以验证本地配置、设备身份和云端心跳；最终发布包会由 Electron/Node 运行时打包为 exe，用户无需安装 Node.js。

云端通信采用客户端主动发起的 HTTPS 请求，不要求宝塔访问用户电脑端口。客户端使用本机 Chrome 和 Playwright 打开豆包网页，`agent-credentials.json`、Chrome profile、参考图缓存和视频临时文件只保存到本机 `data` 目录，不应上传到代码仓库或宝塔服务器。

发布包默认 `enableTaskPolling` 为 `true`。客户端未配对时只保持待机；完成配对后会自动开始领取任务。需要诊断时可在本机 `config.json` 显式设为 `false`。

开发测试时可使用 `node main.cjs --pair 配对码` 完成一次配对；配对令牌会保存到本机数据目录。正式 Electron 客户端提供“连接豆包助手”窗口，不要求用户打开命令行。用户电脑需要已安装 Chrome，客户端不会上传豆包 Cookie。
