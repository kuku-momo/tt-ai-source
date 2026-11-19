const { contextBridge, ipcRenderer } = require('electron');

/* ==========================================================================
 * [NO-LICENSE] 授权层已移除
 *
 * 本工程不再有卡密校验、不再请求 /api/auth/*，页面挂载后直接进入可用状态。
 * preload 只负责两件事：
 *   1. 把页面里的 /api/* 业务请求改道到本地网关（跨源需要 credentials: include）；
 *   2. 暴露更新检查与豆包助手桥。
 *
 * 保留 aiCreationLicense 这个全局对象只为兼容旧页面代码：它恒返回已授权，
 * 不读取任何许可文件、不发起任何网络请求。
 * ========================================================================== */

const GRANTED = Object.freeze({
  activated: true,
  expiresAt: null,
  cardName: '本地版',
  cardType: 'local',
  permanent: true
});

contextBridge.exposeInMainWorld('aiCreationLicense', {
  status: () => Promise.resolve({ ...GRANTED }),
  activate: () => Promise.resolve({ ok: true, msg: '已授权', ...GRANTED }),
  logout: () => Promise.resolve({ ok: true }),
  apiBase: () => ipcRenderer.invoke('license:api-base')
});

function mainWorldHook() {
  if (window.__aiCreationHooked) return;
  window.__aiCreationHooked = true;

  const nativeFetch = window.fetch.bind(window);

  const toUrl = input => {
    try {
      if (typeof input === 'string') return new URL(input, location.href);
      if (input && typeof input.url === 'string') return new URL(input.url, location.href);
    } catch { /* ignore */ }
    return null;
  };

  let baseValue = null;
  let basePromise = null;
  const apiBase = () => {
    if (baseValue !== null) return Promise.resolve(baseValue);
    if (!basePromise) {
      basePromise = Promise.resolve()
        .then(() => window.aiCreationLicense.apiBase())
        .then(value => { baseValue = String(value || ''); return baseValue; })
        .catch(() => { baseValue = ''; return ''; });
    }
    return basePromise;
  };

  window.fetch = async function patchedFetch(input, init) {
    const url = toUrl(input);
    const pathname = url ? url.pathname : '';

    // 授权端点已不存在：旧代码若调用，直接返回已授权结果，不发请求。
    if (pathname === '/api/auth/status') {
      return new Response(JSON.stringify({ ...GRANTED }), {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
      });
    }
    if (pathname === '/api/auth/activate' || pathname === '/api/auth/logout') {
      return new Response(JSON.stringify({ ok: true, ...GRANTED }), {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
      });
    }

    const base = url && pathname.startsWith('/api/') ? await apiBase() : '';
    if (base) {
      // 改道到本地网关属于跨源请求：必须显式带上 credentials，
      // 否则后台会话（Set-Cookie: admin_session）不会被保存，刷新后退回登录页。
      const target = base + pathname + (url.search || '');
      const options = { ...(init || {}), credentials: 'include' };
      return nativeFetch(new Request(target, options));
    }

    return nativeFetch(input, init);
  };
}

function installHook() {
  try {
    if (typeof contextBridge.executeInMainWorld === 'function') {
      contextBridge.executeInMainWorld({ func: mainWorldHook });
    } else {
      mainWorldHook();
    }
  } catch (error) {
    console.error('[preload] 主世界钩子注入失败', error);
  }
}

installHook();

function mountUpdateNotice(update) {
  if (!update?.version || document.getElementById('ai-creation-update-notice')) return;
  const notice = document.createElement('div');
  notice.id = 'ai-creation-update-notice';
  notice.innerHTML = '<span class="ai-creation-update-text"></span><button type="button">立即下载</button><button type="button" class="ai-creation-update-close" aria-label="关闭">×</button>';
  notice.querySelector('.ai-creation-update-text').textContent = `发现新版本 v${update.version}`;
  const style = document.createElement('style');
  style.textContent = `#ai-creation-update-notice{position:fixed;top:16px;right:18px;z-index:2147483647;display:flex;align-items:center;gap:10px;padding:10px 12px 10px 14px;border:1px solid rgba(255,255,255,.14);border-radius:10px;background:#20242b;color:#f5f7fa;box-shadow:0 8px 28px rgba(0,0,0,.28);font:13px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}#ai-creation-update-notice button{border:0;border-radius:7px;padding:6px 10px;background:#4f8cff;color:#fff;cursor:pointer;font:inherit}#ai-creation-update-notice button:hover{background:#6a9cff}#ai-creation-update-notice .ai-creation-update-close{padding:2px 5px;background:transparent;color:#aab2c0;font-size:18px;line-height:1}#ai-creation-update-notice .ai-creation-update-close:hover{color:#fff;background:rgba(255,255,255,.1)}`;
  document.documentElement.appendChild(style);
  document.body.appendChild(notice);
  notice.querySelector('button:not(.ai-creation-update-close)').addEventListener('click', () => {
    ipcRenderer.invoke('open-update-download').catch(() => {});
  });
  notice.querySelector('.ai-creation-update-close').addEventListener('click', () => notice.remove());
}

function handleUpdate(update) {
  if (document.body) mountUpdateNotice(update);
  else window.addEventListener('DOMContentLoaded', () => mountUpdateNotice(update), { once: true });
}

ipcRenderer.on('update-available', (_event, update) => handleUpdate(update));

contextBridge.exposeInMainWorld('doubaoAgent', {
  pair: code => ipcRenderer.invoke('doubao-agent-pair', String(code || '')),
  openAccount: profileId => ipcRenderer.invoke('doubao-agent-open-account', String(profileId || 'legacy')),
  accountStatus: profileId => ipcRenderer.invoke('doubao-agent-account-status', String(profileId || 'legacy'))
});

contextBridge.exposeInMainWorld('aiCreationUpdater', {
  check: () => ipcRenderer.invoke('check-for-updates')
});
