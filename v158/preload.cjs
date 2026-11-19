const { contextBridge, ipcRenderer } = require('electron');

/* ==========================================================================
 * [NO-LICENSE] v1.5.8 授权拦截 + 本地网关改道
 *
 * v1.5.8 的客户端主进程是 V8 字节码，里面没有任何授权逻辑（已用字符串扫描确认）：
 * 授权完全由远端 SPA 通过 GET /api/auth/status 决定，未激活时渲染激活页
 * （要求输入卡密 / 扫码领卡密）。
 *
 * 本 preload 在主世界装 fetch 钩子，做三件事：
 *   1. /api/auth/status|activate|logout  → 本地直接返回「已授权」，不发请求
 *   2. /api/site/card-claim              → 关闭领卡入口（不再弹二维码）
 *   3. 其它 /api/*                       → 改道本机网关 127.0.0.1:8787；
 *                                          网关未启动时回落到远端
 *
 * 注意：executeInMainWorld 会把函数源码序列化到主世界重建，
 * 钩子内部不能引用 preload 作用域的任何变量，必须完全自包含。
 * ========================================================================== */

const GATEWAY = 'http://127.0.0.1:8787';
const CAPTURE = 'http://127.0.0.1:9999/log';

function mountUpdateNotice(update) {
  if (!update || !update.version || document.getElementById('ai-creation-update-notice')) return;
  const notice = document.createElement('div');
  notice.id = 'ai-creation-update-notice';
  notice.innerHTML = '<span class="ai-creation-update-text"></span><button type="button">立即下载</button><button type="button" class="ai-creation-update-close" aria-label="关闭">×</button>';
  notice.querySelector('.ai-creation-update-text').textContent = `发现新版本 v${update.version}`;
  document.body.appendChild(notice);
  notice.querySelector('button:not(.ai-creation-update-close)').addEventListener('click', () => {
    ipcRenderer.invoke('open-update-download').catch(() => {});
  });
  notice.querySelector('.ai-creation-update-close').addEventListener('click', () => notice.remove());
}

ipcRenderer.on('update-available', (_event, update) => {
  if (document.body) mountUpdateNotice(update);
  else window.addEventListener('DOMContentLoaded', () => mountUpdateNotice(update), { once: true });
});

contextBridge.exposeInMainWorld('doubaoAgent', {
  pair: (code) => ipcRenderer.invoke('doubao-agent-pair', String(code || '')),
  openAccount: (profileId) => ipcRenderer.invoke('doubao-agent-open-account', String(profileId || 'legacy')),
  accountStatus: (profileId) => ipcRenderer.invoke('doubao-agent-account-status', String(profileId || 'legacy'))
});

contextBridge.exposeInMainWorld('aiCreationUpdater', {
  getVersion: () => ipcRenderer.invoke('get-client-version'),
  check: () => ipcRenderer.invoke('check-for-updates')
});

/** 主世界钩子：必须完全自包含 */
function installCrack() {
  if (window.__aiCreationHooked) return;
  window.__aiCreationHooked = true;

  const GATEWAY = 'http://127.0.0.1:8787';
  const CAPTURE = 'http://127.0.0.1:9999/log';
  const GRANTED = { activated: true, expiresAt: null, cardName: '本地版', cardType: 'local', permanent: true };

  const trace = (payload) => {
    try {
      window.fetch(CAPTURE, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'content-type': 'text/plain' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) { /* ignore */ }
  };

  const json = (data, status) => new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });

  const nativeFetch = window.fetch.bind(window);

  const toUrl = (input) => {
    try {
      if (typeof input === 'string') return new URL(input, location.href);
      if (input && typeof input.url === 'string') return new URL(input.url, location.href);
    } catch (e) { /* ignore */ }
    return null;
  };

  const bodyText = (init) => {
    try {
      const b = init && init.body;
      if (typeof b === 'string') return b.slice(0, 400);
    } catch (e) { /* ignore */ }
    return null;
  };

  // 网关是否在线（只探一次，失败后 5 秒重试）
  let gatewayOk = null;
  let gatewayCheckedAt = 0;
  const probeGateway = async () => {
    if (gatewayOk === true) return true;
    if (Date.now() - gatewayCheckedAt < 5000) return gatewayOk === true;
    gatewayCheckedAt = Date.now();
    try {
      const res = await nativeFetch(GATEWAY + '/api/health', { cache: 'no-store' });
      gatewayOk = res.ok;
    } catch (e) {
      gatewayOk = false;
    }
    return gatewayOk === true;
  };

  window.fetch = async function patchedFetch(input, init) {
    const url = toUrl(input);
    const pathname = url ? url.pathname : '';
    const method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();

    if (pathname === '/api/auth/status') {
      trace({ phase: 'crack', path: pathname, action: 'granted' });
      return json(GRANTED);
    }
    if (pathname === '/api/auth/activate') {
      trace({ phase: 'crack', path: pathname, action: 'activate', body: bodyText(init) });
      return json(Object.assign({ ok: true, msg: '已授权' }, GRANTED));
    }
    if (pathname === '/api/auth/logout') {
      trace({ phase: 'crack', path: pathname, action: 'logout-noop' });
      return json({ ok: true });
    }
    if (pathname === '/api/site/card-claim') {
      return json({
        ok: true,
        config: { enabled: false, title: '', wechat: '', description: '', serviceHours: '', qrImage: '' }
      });
    }

    if (pathname.indexOf('/api/') === 0) {
      if (await probeGateway()) {
        const target = GATEWAY + pathname + (url.search || '');
        const options = Object.assign({}, init || {}, { credentials: 'include' });
        try {
          const res = await nativeFetch(new Request(target, options));
          trace({ phase: 'gateway', path: pathname, method, status: res.status });
          return res;
        } catch (e) {
          trace({ phase: 'gateway-error', path: pathname, message: String(e && e.message) });
        }
      }
      trace({ phase: 'passthrough', path: pathname, method });
    }

    return nativeFetch(input, init);
  };

  // 隐藏「我的卡密」「退出登录」入口：卡密体系在本版本已不参与任何判定，
  // 留着这两个按钮只会把用户导向领卡页/登录页。
  const HIDE_TEXTS = ['我的卡密', '退出登录', '领取卡密', '激活', '教程中心', '代理加盟'];
  const hideCardEntries = () => {
    const all = document.querySelectorAll('button, a, span, div');
    for (let i = 0; i < all.length; i += 1) {
      const el = all[i];
      if (el.children && el.children.length) continue;
      const text = (el.textContent || '').trim();
      if (text && HIDE_TEXTS.indexOf(text) !== -1) {
        const host = el.closest('button, a') || el;
        host.style.display = 'none';
        host.setAttribute('data-hidden-by-crack', '1');
      }
    }
  };
  const startHide = () => {
    hideCardEntries();
    try {
      new MutationObserver(hideCardEntries).observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) { /* ignore */ }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startHide, { once: true });
  else startHide();

  trace({ phase: 'hook', url: location.href });
}

try {
  if (typeof contextBridge.executeInMainWorld === 'function') {
    contextBridge.executeInMainWorld({ func: installCrack });
  } else {
    installCrack();
  }
} catch (error) {
  console.error('[crack] 注入失败', error);
}
