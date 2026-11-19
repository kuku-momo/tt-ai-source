# API 一览（前端实际调用的全部端点）

完整清单见 `recovered/api-endpoints.txt`（从 bundle 自动提取，50 条）。

## 授权（preload/主进程本地应答；网关 `/api/auth/*` 同构备用）

| 端点 | 方法 | 应答 |
|---|---|---|
| `/api/auth/status` | GET | `{activated, cardName, permanent, expiresAt}` |
| `/api/auth/activate` | POST `{code}` | `{ok, msg, cardName, permanent, expiresAt}` |
| `/api/auth/logout` | POST | `{ok:true}` |

## 网关已实现（gateway/ai-gateway.cjs）

| 端点 | 方法 | 行为 |
|---|---|---|
| `/api/health` | GET | 存活检查 |
| `/api/settings` | GET/PUT | 大模型 base_url / key（掩码）/ 模型清单，JSON 落盘 |
| `/api/settings/test` | POST | 连通性测试（本地模式跳过真实上游） |
| `/api/video/models` | GET | 占位模型清单 |
| `/api/video/generate` | POST | 建任务，4s→generating，12s→success + demo 视频 URL |
| `/api/video/tasks` / `/api/video/tasks/:id` | GET/DELETE | 任务列表/删除 |
| `/api/drama/projects` | GET/POST | 剧本项目 |
| `/api/short-drama-production/projects[/id]` | GET/POST/PUT/DELETE | 短剧项目 CRUD |
| `/api/short-drama-production/source/import` | POST | 剧本导入（txt/md 直读，doc/pdf 提示占位） |
| `/api/uploads/oss/video` → `/api/uploads/local/:id` | POST/GET | 上传落盘 `data/` 后回读 |
| `/api/tutorials` | GET | 空列表 |
| `/api/site/card-claim` | GET | 购卡配置（本地模式关闭） |
| 其它任意 `/api/*` | * | `{ok:true, local:true, note:...}` 兜底，不 500 |

## 网关扩展路由（[LOCAL] gateway/routes-extra.cjs，本地模式全量可用）

| 端点 | 方法 | 行为 |
|---|---|---|
| `/api/chat/models` | GET | 本地回声模型；配置了上游 Key 时追加「上游模型」 |
| `/api/chat/sessions[/id][/messages]` | GET/POST/DELETE | 会话 CRUD + 消息持久化 |
| `/api/chat/completions` | POST | **SSE 流式**（started/delta/done）；配置上游 Key 后转发到 `<Base URL>/chat/completions` |
| `/api/draw/models` | GET | 本地 SVG 演示模型 |
| `/api/draw/generate` | POST | 2.5s→generating，7s→success；`images` 为 JSON 字符串（前端 `JSON.parse(task.images)`） |
| `/api/draw/tasks/:id/images/:i/download` | GET | 返回 image/svg+xml |
| `/api/draw/tasks/:id` | DELETE | 删除任务 |
| `/api/works` `/api/works/:id` | GET/POST | 作品广场（分页/搜索/排序）+ 详情（自增 views） |
| `/api/tasks?type=&status=&limit=` | GET | draw+video+drama 任务聚合 + stats |
| `/api/remake-workshop/capabilities` | GET | styles/resolutions/max_duration |
| `/api/remake-workshop/projects` | GET/POST | 重制项目 |
| `/api/drama-commerce/projects` `/analyze-product` `/analyze-character` | GET/POST | 电商短剧（识图返回占位分析） |
| `/api/script-tools/meta` `/documents[/id]` | GET/POST/PUT/DELETE | 剧本工具 |
| `/api/uploads/oss/image` | POST | 图片上传落盘（配合已有 `/api/uploads/local/:id` 回读） |
| `/api/doubao-agent/accounts[/id]` `/devices` `/pair/start` | GET/POST/DELETE | 豆包助手台账与配对码 |

## 前端会调、仍走兜底（上游专属）

管理端 `/api/admin/*`。这些页面在本地模式下依赖兜底应答 `{ok:true, local:true}`，
流程能走通但没有数据。要完整功能就把网关相应路由接到真实上游，
或把 `crack-config.json` 的 `mode` 改回 `upstream`。

## 主进程侧下载清单

`GET /downloads/AI-Creation-Windows-version.json` —— `{version, downloadUrl,
releaseNotes, sha256}`，仅同源可下载。
