/**
 * 前端入口
 *
 * 说明：runtime/index.js 是从线上 Vite 产物还原出来的共享层（Vue 运行时 + vue-router
 * + 应用外壳 App + 路由表）。页面组件在 src/views/*，样式在 src/styles/**。
 *
 * App 外壳内部自己带了「卡密激活 / 落地页 / 侧边栏 / router-view」，
 * 路由表也在 runtime 里（与线上完全一致），所以这里只做挂载。
 */
import './styles/base.css';
import { App, router, createApp } from './runtime/index.js';

const app = createApp(App);
app.use(router);
app.mount('#app');

// 纯浏览器调试（npm run dev）时没有 Electron preload，补一个本地兜底：
// 授权校验已移除，兜底直接返回永久授权，避免 /api/auth/status 打到 vite 代理报错。
if (!window.aiCreationLicense) {
  const granted = {
    activated: true,
    expiresAt: null,
    cardName: '永久卡',
    cardType: 'permanent',
    permanent: true,
  };
  window.aiCreationLicense = {
    status: () => Promise.resolve({ ...granted }),
    activate: () =>
      Promise.resolve({ ok: true, msg: '激活成功，永久有效', ...granted }),
    logout: () => Promise.resolve({ ok: true }),
    apiBase: () => Promise.resolve(''),
  };
}
