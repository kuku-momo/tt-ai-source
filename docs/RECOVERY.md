# 还原过程记录（可复现）

## 1. 解包 app.asar

`tools/unasar.js`（零依赖，自写解析）：

```
偏移 0   uint32 = 4
偏移 4   uint32 = pickleSize        # 本包 600
偏移 8   uint32 = jsonSize + 4      # 596
偏移 12  uint32 = jsonSize          # 592，JSON 从偏移 16 开始
数据区   baseOff = 8 + pickleSize   # 608
```

`app.asar` 内 11 个文件：main.cjs / preload.cjs / policy.cjs / license-core.cjs /
offline.html / home.json / package.json / README.txt / brand-icon.{ico,png} /
production-resources/。这些即是「外壳源码」，本来就是明文 JS，原样入库存档。

## 2. 抓取前端

前端不在 asar 里 —— 客户端只是壳，真 SPA 部署在 `home.json` 的
`https://khd.yxzyxm.top/`（梦颜AI）：

```
index.html
  └─ /assets/index-Z8pMLIar.js   189,850 B   （Vue3 + vue-router + 外壳 + /admin）
     /assets/index-DAbMVIvo.css   51,215 B
     └─ 动态 import 19 个路由分块 + WorkPublisher + 24 个 lucide 图标分块
        （mapDeps 里还引用 20 个页面级 CSS，全部抓取）
```

共 66 个文件，全部抓取存档；prettier 美化后放 `recovered/bundles/`。

## 3. 还原成源码工程

`tools/clone-back.mjs` 做四类机械改写（幂等，可反复执行）：

| 改写 | 原 | 还原后 |
|---|---|---|
| 挂载尾句 | `Eu(yv).use(Ev).mount("#app")` | `export { yv as App, Ev as router, Eu as createApp }` |
| CSS 预载 | `, __vite__mapDeps([...])` | 删除；每页顶部显式 `import "../styles/pages/X.css"` |
| 路由动态导入 | `import("./Home-BE7O8OSv.js")` | `import("../views/Home.js")` |
| 静态导入 | `from "./index-Z8pMLIar.js"` | `from "../runtime/index.js"`（图标同理） |

关键点：所有分块保留原 `__scopeId`（`data-v-*`），页面 CSS 原样保留
`[data-v-*]` 选择器，因此样式精确命中，无需改任何规则。

## 4. 验证

- `npm run build:web`：Vite 构建通过，21 个 CSS 逐一与线上文件大小对齐
  （index.css 51,124 vs 51,215，页面级均在 ±10B 内）；
- `npm test`：10/10 通过（导航策略 + 卡密内核，含篡改/过期/低熵输入）；
- `npm run smoke`：无头 Edge 实测 —— 首页/设置页完整渲染、识别
  「永久卡 · 永久有效」、业务接口命中本地网关、控制台 0 错误
  （截图 docs/smoke-home.png、docs/smoke-settings.png）。

## 5. 已知限制

- `runtime/index.js` 与 `views/*.js` 是**格式化后的产物源码**：逻辑、字符串、
  结构 100% 同源，但变量名仍是压缩名（上游未提供 map）。要改成模板语法的
  SFC，可对每个组件的 `setup/render` 做二次手工还原，本仓库先保证可构建可运行。
- `/admin` 组件内嵌在 runtime 主包里（上游就没拆分块），未单独出文件。
- 线上若发新版，分块 hash 变化后需重跑第 2、3 步。
