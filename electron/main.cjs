const { app, BrowserWindow, Menu, shell, dialog, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const http = require('node:http');
const https = require('node:https');
const { fork } = require('node:child_process');
const { HOME, isInternal, isExternal } = require('./policy.cjs');
const license = require('./license-core.cjs');

// Keep the portable client's Chromium profile beside the extracted app. This
// avoids stale global profile locks and keeps Doubao login state local to the
// portable package. An explicit directory is still available for diagnostics.
const portableDataDirectory = process.env.AI_CREATION_DATA_DIR ||
  path.join(path.dirname(process.execPath), 'user-data');
try {
  fs.mkdirSync(portableDataDirectory, { recursive: true });
  app.setPath('userData', portableDataDirectory);
} catch {
  // Electron will fall back to its normal per-user data directory if the
  // portable folder is read-only (for example, when launched from a protected
  // directory).
}

/* ==========================================================================
 * [PATCH] 本地许可层：离线卡密，取代远端 /api/auth/*
 * ========================================================================== */
const LICENSE_FILE = path.join(portableDataDirectory, 'license.json');
const CRACK_CONFIG_FILE = path.join(portableDataDirectory, 'crack-config.json');
const LICENSE_LOG = path.join(portableDataDirectory, 'license.log');

const DEFAULT_CONFIG = {
  mode: 'local',              // local = 本地网关接管 /api；upstream = 全部走真服务器
  gatewayPort: 8787,
  gatewayAutoStart: true,
  debug: false,
  devtools: false
};

function readCrackConfig() {
  try {
    const raw = JSON.parse(fs.readFileSync(CRACK_CONFIG_FILE, 'utf8'));
    return { ...DEFAULT_CONFIG, ...raw };
  } catch {
    try {
      fs.writeFileSync(CRACK_CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf8');
    } catch { /* 只读目录忽略 */ }
    return { ...DEFAULT_CONFIG };
  }
}

const CRACK_CONFIG = readCrackConfig();

function logLine(tag, text) {
  const line = `${new Date().toISOString()} [${tag}] ${text}\n`;
  try { fs.appendFileSync(LICENSE_LOG, line, 'utf8'); } catch { /* ignore */ }
  console.log(`[license] ${text}`);
}

function readLicenseRecord() {
  try { return JSON.parse(fs.readFileSync(LICENSE_FILE, 'utf8')); } catch { return null; }
}

function writeLicenseRecord(record) {
  const tmp = `${LICENSE_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(record, null, 2), { encoding: 'utf8', mode: 0o600 });
  fs.renameSync(tmp, LICENSE_FILE);
}

function osFingerprint() {
  return crypto
    .createHash('sha256')
    .update(`${process.env.COMPUTERNAME || ''}|${process.env.USERNAME || ''}|ai-creation`, 'utf8')
    .digest('hex')
    .slice(0, 16);
}

/* ==========================================================================
 * [NO-LICENSE] 授权层已移除
 *
 * 不再有卡密校验：不读 license.json、不写许可记录、不比对签名。
 * 以下 IPC 只为兼容旧页面保留，全部恒返回已授权。
 * ========================================================================== */
const GRANTED_STATUS = Object.freeze({
  activated: true,
  expiresAt: null,
  cardName: '本地版',
  cardType: 'local',
  permanent: true,
  serial: '0000'
});

ipcMain.handle('license:status', () => ({ ...GRANTED_STATUS }));

ipcMain.handle('license:activate', () => ({
  ok: true,
  msg: '已授权',
  ...GRANTED_STATUS
}));

ipcMain.handle('license:logout', () => ({ ok: true }));

ipcMain.handle('license:api-base', async () => {
  if (CRACK_CONFIG.mode !== 'local') return '';
  await gatewayReady;
  return `http://127.0.0.1:${gatewayPort}`;
});

/* ==========================================================================
 * [PATCH] 本地 API 网关（子进程）：顶替被服务端会话拦截的业务接口
 * ========================================================================== */
let gatewayProcess;
let gatewayPort = CRACK_CONFIG.gatewayPort;
let gatewayReadyResolve;
const gatewayReady = new Promise(resolve => { gatewayReadyResolve = resolve; });
setTimeout(() => gatewayReadyResolve(false), 4000);

function gatewayEntry() {
  const packaged = path.join(process.resourcesPath || '', 'gateway', 'ai-gateway.cjs');
  const development = path.join(__dirname, '..', 'gateway', 'ai-gateway.cjs');
  if (fs.existsSync(packaged)) return packaged;
  if (fs.existsSync(development)) return development;
  return null;
}

function startGateway() {
  if (CRACK_CONFIG.mode !== 'local' || CRACK_CONFIG.gatewayAutoStart === false) return null;
  if (gatewayProcess && !gatewayProcess.killed) return gatewayProcess;
  const entry = gatewayEntry();
  if (!entry) {
    logLine('gateway', '未找到 ai-gateway.cjs，业务接口将直连远端（会返回 403 未激活）');
    return null;
  }
  gatewayProcess = fork(entry, [], {
    cwd: path.dirname(entry),
    env: {
      ...process.env,
      AI_GATEWAY_PORT: String(CRACK_CONFIG.gatewayPort),
      AI_GATEWAY_DATA_DIR: path.join(portableDataDirectory, 'data', 'gateway'),
      AI_GATEWAY_LICENSE_MODULE: path.join(__dirname, 'license-core.cjs'),
      AI_GATEWAY_LICENSE_FILE: LICENSE_FILE,
      AI_GATEWAY_LOG: path.join(portableDataDirectory, 'gateway.log')
    },
    stdio: ['ignore', 'pipe', 'pipe', 'ipc']
  });
  gatewayProcess.stdout?.on('data', chunk => console.log(`[gateway] ${String(chunk).trimEnd()}`));
  gatewayProcess.stderr?.on('data', chunk => console.error(`[gateway] ${String(chunk).trimEnd()}`));
  gatewayProcess.on('message', message => {
    if (message?.type === 'gateway-port' && message.port) {
      gatewayPort = message.port;
      gatewayReadyResolve(true);
      logLine('gateway', `ready http://127.0.0.1:${gatewayPort}`);
    }
  });
  gatewayProcess.on('exit', code => {
    gatewayProcess = null;
    if (code) console.error(`[gateway] 已退出 code=${code}`);
  });
  logLine('gateway', `started on 127.0.0.1:${CRACK_CONFIG.gatewayPort}`);
  return gatewayProcess;
}

// Use Chromium's hardware acceleration by default. Software rendering is kept
// as an explicit compatibility fallback for machines with broken GPU drivers.
const softwareRendering = process.env.AI_CREATION_SOFTWARE_RENDERING === '1' ||
  fs.existsSync(path.join(path.dirname(process.execPath), 'software-rendering.flag'));
if (softwareRendering) {
  app.disableHardwareAcceleration();
  app.commandLine.appendSwitch('disable-gpu');
}
if (CRACK_CONFIG.debug || process.env.AI_CREATION_DEBUG === '1') {
  app.commandLine.appendSwitch('remote-debugging-port', '9222');
  app.commandLine.appendSwitch('remote-allow-origins', '*');
}
app.setName('TT助手AI');
app.setAppUserModelId('top.yxzyxm.khd.client');
let mainWindow;
let agentProcess;
let latestUpdate = null;

const UPDATE_MANIFEST_PATH = '/downloads/AI-Creation-Windows-version.json';

function parseVersion(value) {
  const match = String(value || '').trim().replace(/^v/i, '').match(/^(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2] || 0), Number(match[3] || 0)];
}

function compareVersions(left, right) {
  const a = parseVersion(left);
  const b = parseVersion(right);
  if (!a || !b) return 0;
  for (let index = 0; index < 3; index += 1) {
    if (a[index] !== b[index]) return a[index] > b[index] ? 1 : -1;
  }
  return 0;
}

function requestJson(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const transport = target.protocol === 'https:' ? https : http;
    const request = transport.get(target, { headers: { accept: 'application/json' } }, response => {
      if (response.statusCode < 200 || response.statusCode >= 300) {
        response.resume();
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => {
        try { resolve(JSON.parse(body)); } catch { reject(new Error('版本清单格式无效')); }
      });
    });
    request.setTimeout(timeoutMs, () => request.destroy(new Error('版本检查超时')));
    request.on('error', reject);
  });
}

function sendUpdateAvailable(update) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.webContents.send('update-available', update);
}

/**
 * 更新检查。
 *
 * 原版每次失败都会弹「检查更新失败」对话框（301/离线/清单缺失都弹），成功时
 * 还会弹「发现新版本」。本工程默认整体关闭：既不请求清单，也不发 update-available，
 * 界面不会出现「有新版」角标或右上角提示条。
 * 需要时设 AI_CREATION_UPDATE_CHECK=1 恢复；再加 AI_CREATION_UPDATE_DIALOG=1 才弹窗。
 */
const UPDATE_ENABLED = process.env.AI_CREATION_UPDATE_CHECK === '1';
const UPDATE_DIALOG = process.env.AI_CREATION_UPDATE_DIALOG === '1';

async function checkForUpdates(showResult = false) {
  if (!UPDATE_ENABLED) {
    logLine('update', '检查更新已关闭（AI_CREATION_UPDATE_CHECK=1 可开启）');
    return { ok: true, available: false, disabled: true, version: app.getVersion() };
  }
  const verbose = showResult && UPDATE_DIALOG;
  try {
    const manifestUrl = new URL(UPDATE_MANIFEST_PATH, HOME).href;
    const manifest = await requestJson(manifestUrl);
    const currentVersion = app.getVersion();
    const remoteVersion = String(manifest.version || '').trim();
    const downloadUrl = new URL(String(manifest.downloadUrl || ''), HOME);
    if (!parseVersion(remoteVersion) || !isExternal(downloadUrl.href) || downloadUrl.origin !== new URL(HOME).origin) {
      throw new Error('版本清单内容无效');
    }
    if (compareVersions(remoteVersion, currentVersion) > 0) {
      latestUpdate = {
        version: remoteVersion.replace(/^v/i, ''),
        downloadUrl: downloadUrl.href,
        releaseNotes: String(manifest.releaseNotes || '').trim(),
        sha256: String(manifest.sha256 || '').trim()
      };
      sendUpdateAvailable(latestUpdate);
      if (verbose) {
        await dialog.showMessageBox(mainWindow, { type: 'info', title: '发现新版本', message: `发现新版本 v${latestUpdate.version}`, detail: latestUpdate.releaseNotes || '点击右上角提示即可下载。', buttons: ['知道了'] });
      }
      return { ok: true, available: true, ...latestUpdate };
    }
    latestUpdate = null;
    if (verbose) await dialog.showMessageBox(mainWindow, { type: 'info', title: '已是最新版本', message: `当前版本 v${currentVersion} 已是最新版本。`, buttons: ['知道了'] });
    return { ok: true, available: false, version: currentVersion };
  } catch (error) {
    logLine('update', `check failed: ${error?.message || error}`);
    return { ok: false, available: false, message: error?.message || '检查更新失败' };
  }
}

function agentEntry() {
  const packaged = path.join(process.resourcesPath || '', 'doubao-agent', 'main.cjs');
  const development = path.join(__dirname, '..', 'doubao-agent', 'main.cjs');
  if (fs.existsSync(packaged)) return packaged;
  if (fs.existsSync(development)) return development;
  return null;
}

/** 豆包助手是否具备运行条件：入口存在 + playwright-core 已装 */
function agentReady(entry) {
  const candidates = [
    path.join(path.dirname(entry), 'node_modules', 'playwright-core'),
    process.env.DOUBAO_PLAYWRIGHT_PATH
  ].filter(Boolean);
  return candidates.some(dir => {
    try {
      return fs.existsSync(path.join(dir, 'package.json'));
    } catch {
      return false;
    }
  });
}

function startDoubaoAgent() {
  if (agentProcess && !agentProcess.killed) return agentProcess;
  const entry = agentEntry();
  if (!entry) return null;
  if (!agentReady(entry)) {
    // 缺 playwright-core 时不再 fork：子进程会在启动阶段直接抛错并刷屏。
    logLine('agent', '未安装 playwright-core，豆包助手待命（npm run agent:install 后可启用）');
    return null;
  }
  const configDirectory = app.getPath('userData');
  agentProcess = fork(entry, [], {
    cwd: path.dirname(entry),
    env: { ...process.env, DOUBAO_AGENT_CONFIG_DIR: configDirectory, DOUBAO_AGENT_SERVER_URL: new URL(HOME).origin },
    stdio: ['ignore', 'pipe', 'pipe', 'ipc']
  });
  agentProcess.stdout?.on('data', chunk => console.log(`[doubao-agent] ${String(chunk).trimEnd()}`));
  agentProcess.stderr?.on('data', chunk => console.error(`[doubao-agent] ${String(chunk).trimEnd()}`));
  agentProcess.on('exit', (code, signal) => {
    agentProcess = null;
    if (code && !app.isQuitting) logLine('agent', `已退出 code=${code} signal=${signal || 'none'}`);
  });
  return agentProcess;
}

function requestAgent(type, payload = {}, responseType = 'account-result') {
  const process = startDoubaoAgent();
  if (!process || process.killed) return Promise.resolve({ ok: false, message: '本地助手组件缺失，请重新下载完整客户端' });
  const requestId = crypto.randomUUID();
  return new Promise(resolve => {
    const timer = setTimeout(() => { process.removeListener('message', listener); resolve({ ok: false, message: '本地助手响应超时' }); }, 30000);
    const listener = message => {
      if (message?.type !== responseType || message.requestId !== requestId) return;
      clearTimeout(timer); process.removeListener('message', listener); resolve(message);
    };
    process.on('message', listener);
    process.send({ type, requestId, ...payload }, error => {
      if (!error) return;
      clearTimeout(timer); process.removeListener('message', listener); resolve({ ok: false, message: '无法连接本地助手' });
    });
  });
}

ipcMain.handle('doubao-agent-pair', (_event, code) => {
  return requestAgent('pair', { code: String(code || '') }, 'pair-result');
});
ipcMain.handle('doubao-agent-open-account', (_event, profileId) => requestAgent('account-open', { profileId: String(profileId || 'legacy') }));
ipcMain.handle('doubao-agent-account-status', (_event, profileId) => requestAgent('account-status', { profileId: String(profileId || 'legacy') }));
ipcMain.handle('check-for-updates', () => checkForUpdates(true));
ipcMain.handle('open-update-download', async () => {
  if (!latestUpdate?.downloadUrl) return { ok: false, message: '暂无可用更新' };
  await openExternal(latestUpdate.downloadUrl);
  return { ok: true };
});

async function openExternal(url) {
  if (!isExternal(url)) return;
  try {
    await shell.openExternal(url);
  } catch {
    dialog.showErrorBox('无法打开链接', '请检查默认浏览器是否可用。');
  }
}

/* ==========================================================================
 * [LOCAL] 源码工程新增：本地渲染器托管
 * --------------------------------------------------------------------------
 * 上游客户端固定加载 home.json 里的远端站点。为了能离线跑「还原出来的前端源码」，
 * 这里多一条本地分支，只在下面两种情况下生效，默认行为与原版完全一致：
 *   AI_CREATION_DEV_URL=http://localhost:5173   → 连 vite dev server（npm run dev）
 *   AI_CREATION_LOAD=local                      → 静态托管 renderer/dist（npm run build:web）
 * ========================================================================== */
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.wasm': 'application/wasm'
};

let localServer = null;
let localBase = '';

function startRendererServer() {
  return new Promise(resolve => {
    // packaged: app.asar 内的 renderer/dist；dev 仓库：项目根下的 renderer/dist
    const candidates = [
      path.join(__dirname, 'renderer', 'dist'),
      path.join(__dirname, '..', 'renderer', 'dist')
    ];
    const root = candidates.find(dir => fs.existsSync(path.join(dir, 'index.html')));
    if (!root) {
      console.warn('[local] renderer/dist 不存在，请先 npm run build:web');
      resolve('');
      return;
    }
    localServer = http.createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
      let file = path.join(root, pathname);
      if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
      if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        file = path.join(root, 'index.html'); // SPA history 回退
      }
      const body = fs.readFileSync(file);
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Content-Length': body.length,
        'Cache-Control': 'no-store'
      });
      res.end(body);
    });
    localServer.on('error', error => {
      console.error(`[local] 静态服务启动失败: ${error.message}`);
      resolve('');
    });
    localServer.listen(0, '127.0.0.1', () => {
      localBase = `http://127.0.0.1:${localServer.address().port}`;
      console.log(`[local] renderer served at ${localBase}`);
      resolve(localBase);
    });
  });
}

function activeBase() {
  if (process.env.AI_CREATION_DEV_URL) return process.env.AI_CREATION_DEV_URL.replace(/\/$/, '');
  return localBase || HOME.replace(/\/$/, '');
}

function loadHome(window) {
  const target = activeBase();
  window.loadURL(target).catch(() => {});
}

function loadRoute(window, pathname) {
  if (!window || window.isDestroyed()) return;
  const base = activeBase();
  if (process.env.AI_CREATION_DEV_URL || localBase) {
    window.loadURL(`${base}${pathname}`).catch(() => {});
  } else {
    window.loadURL(new URL(pathname, HOME).href).catch(() => {});
  }
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 940,
    minWidth: 800,
    minHeight: 600,
    title: 'TT助手AI',
    icon: path.join(__dirname, 'brand-icon.ico'),
    backgroundColor: '#151719',
    show: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true
    }
  });
  window.webContents.session.setPermissionRequestHandler((contents, permission, callback) => {
    callback(permission === 'clipboard-sanitized-write' && isInternal(contents.getURL()));
  });
  window.webContents.session.setPermissionCheckHandler((_contents, permission, origin) => {
    return permission === 'clipboard-sanitized-write' && isInternal(origin);
  });
  window.webContents.on('will-navigate', (event, url) => {
    if (isInternal(url)) return;
    event.preventDefault();
    void openExternal(url);
  });
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (isInternal(url)) {
      const child = createWindow();
      child.loadURL(url).catch(() => {});
    } else {
      void openExternal(url);
    }
    return { action: 'deny' };
  });
  window.webContents.on('will-attach-webview', (event) => event.preventDefault());
  window.webContents.on('did-fail-load', (_event, code, _description, _url, isMainFrame) => {
    if (!isMainFrame || code === -3) return;
    window.loadFile(path.join(__dirname, 'offline.html')).catch(() => {});
  });
  window.webContents.on('render-process-gone', () => {
    dialog.showMessageBox(window, {
      type: 'error', title: '页面已停止', message: '页面进程已停止，是否重新加载？',
      buttons: ['重新加载', '关闭'], defaultId: 0, cancelId: 1
    }).then(({ response }) => response === 0 ? loadHome(window) : window.close());
  });
  // 只有 user-data/crack-config.json 里显式写 "devtools": true 才自动开；
  // 环境变量只用来开调试端口（不弹窗），避免每次启动都甩一个 DevTools 窗口。
  if (CRACK_CONFIG.devtools === true) {
    window.webContents.openDevTools({ mode: 'detach' });
  }
  return window;
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });
  app.whenReady().then(async () => {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      { label: '应用', submenu: [
        { label: '首页', click: () => loadHome(BrowserWindow.getFocusedWindow() || mainWindow) },
        { label: '短剧专业模式', click: () => loadRoute(mainWindow, '/drama') },
        { label: '检查更新', click: () => void checkForUpdates(true) },
        { label: '在浏览器中打开', click: () => void openExternal(activeBase()) },
        { type: 'separator' }, { role: 'quit', label: '退出' }
      ] },
      { label: '编辑', submenu: [
        { role: 'undo', label: '撤销' }, { role: 'redo', label: '重做' },
        { type: 'separator' }, { role: 'cut', label: '剪切' },
        { role: 'copy', label: '复制' }, { role: 'paste', label: '粘贴' },
        { role: 'selectAll', label: '全选' }
      ] },
      { label: '视图', submenu: [
        { role: 'reload', label: '刷新' }, { role: 'resetZoom', label: '实际大小' },
        { role: 'zoomIn', label: '放大' }, { role: 'zoomOut', label: '缩小' },
        { role: 'togglefullscreen', label: '全屏' },
        { role: 'toggleDevTools', label: '开发者工具' }
      ] }
    ]));
    startGateway();
    // 豆包助手不再随启动拉起：它依赖 doubao-agent/node_modules/playwright-core，
    // 缺依赖时会在启动阶段崩溃并把错误刷到终端。改为首次调用时按需启动。
    //
    // 页面来源：默认走本地渲染器（离线可用、无授权校验）。
    // 需要原版行为（加载 home.json 里的远端站点）时设 AI_CREATION_LOAD=upstream。
    const loadMode = process.env.AI_CREATION_LOAD || 'local';
    if (!process.env.AI_CREATION_DEV_URL && loadMode !== 'upstream') {
      await startRendererServer();
    }
    mainWindow = createWindow();
    loadHome(mainWindow);
    // 启动自动检查更新已取消：原版每失败一次就弹窗，离线环境会反复打扰。
    // 需要时用菜单「应用 → 检查更新」手动触发（同样静默，除非开 AI_CREATION_UPDATE_DIALOG=1）。
    logLine('boot', `mode=${CRACK_CONFIG.mode} load=${loadMode} home=${HOME} gatewayPort=${CRACK_CONFIG.gatewayPort}`);
  }).catch(() => {
    dialog.showErrorBox('启动失败', '客户端无法初始化。请完整解压 ZIP 后再运行 AI-Creation.exe。');
    app.quit();
  });
  app.on('before-quit', () => {
    app.isQuitting = true;
    if (agentProcess && !agentProcess.killed) agentProcess.kill();
    if (gatewayProcess && !gatewayProcess.killed) gatewayProcess.kill();
  });
  app.on('window-all-closed', () => app.quit());
}
