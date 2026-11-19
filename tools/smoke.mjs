/**
 * smoke.mjs —— 端到端冒烟（接口 + 界面）
 *
 *   node tools/smoke.mjs            # 需要 playwright-core + 本机 Edge/Chrome
 *   CHROME_PATH=... node tools/smoke.mjs
 *
 * 覆盖：
 *   1. 现场签一张永久卡写进临时 license.json
 *   2. 起 gateway（8787）+ 静态服务器（4321，/api 反代到网关）
 *   3. 接口层：health / chat / draw（真提交并等到 success）/ works / tasks / 扩展路由
 *   4. 界面层：/ /chat /draw /tasks /works /script-maker /short-drama-production /settings
 *      逐页断言关键文案 + 截图 + 收集控制台错误
 * 产物：tools/.smoke/{home,chat,draw,tasks,settings}.png、console.json
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'renderer', 'dist');
const SMOKE = path.join(ROOT, 'tools', '.smoke');
const PORT = 4321;
const GW = 8787;
const BASE = `http://127.0.0.1:${PORT}`;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
};

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('缺少 renderer/dist，先执行 npm run build:web');
  process.exit(1);
}

/* ---------------------------------------------------------------- 准备授权 */
const licenseCore = require(path.join(ROOT, 'electron', 'license-core.cjs'));
const dataDir = path.join(SMOKE, 'data');
fs.mkdirSync(dataDir, { recursive: true });
const licenseFile = path.join(SMOKE, 'license.json');
if (!fs.existsSync(licenseFile)) {
  const code = licenseCore.generate({ type: 'P' });
  fs.writeFileSync(
    licenseFile,
    JSON.stringify({ code, permanent: true, cardName: '永久卡', activatedAt: new Date().toISOString(), expiresAt: null }, null, 2),
    'utf8'
  );
  console.log(`[smoke] 签发临时卡 ${code}`);
}

/* ------------------------------------------------------------------ 起服务 */
const gateway = spawn(process.execPath, [path.join(ROOT, 'gateway', 'ai-gateway.cjs')], {
  env: {
    ...process.env,
    AI_GATEWAY_PORT: String(GW),
    AI_GATEWAY_DATA_DIR: dataDir,
    AI_GATEWAY_LICENSE_MODULE: path.join(ROOT, 'electron', 'license-core.cjs'),
    AI_GATEWAY_LICENSE_FILE: licenseFile,
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});
gateway.stdout.on('data', (d) => process.stdout.write(`[gateway] ${d}`));
gateway.stderr.on('data', (d) => process.stderr.write(`[gateway] ${d}`));

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    const proxy = http.request(
      { host: '127.0.0.1', port: GW, path: req.url, method: req.method, headers: req.headers },
      (upstream) => {
        res.writeHead(upstream.statusCode || 502, upstream.headers);
        upstream.pipe(res);
      }
    );
    proxy.on('error', () => { res.writeHead(502); res.end('bad gateway'); });
    req.pipe(proxy);
    return;
  }
  const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
  let file = path.join(DIST, pathname);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
  const body = fs.readFileSync(file);
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Content-Length': body.length });
  res.end(body);
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
await new Promise((r) => setTimeout(r, 800)); // 等网关监听

/* -------------------------------------------------------------- 接口层断言 */
let failed = 0;
function check(name, ok, extra = '') {
  console.log(`${ok ? '  OK  ' : ' FAIL '} ${name}${extra ? '  ' + extra : ''}`);
  if (!ok) failed += 1;
}

const api = async (p, init) => {
  const res = await fetch(`http://127.0.0.1:${GW}${p}`, init);
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* 非 JSON */ }
  return { status: res.status, json, text, res };
};

console.log('\n===== 接口层 =====');
const health = await api('/api/health');
check('GET /api/health', health.status === 200 && health.json?.ok === true);

const status = await api('/api/auth/status');
check('GET /api/auth/status 识别永久卡', status.json?.activated === true && status.json?.permanent === true, status.json?.cardName || '');

const chatModels = await api('/api/chat/models');
check('GET /api/chat/models', Array.isArray(chatModels.json?.models) && chatModels.json.models.length > 0);

const drawModels = await api('/api/draw/models');
check('GET /api/draw/models', Array.isArray(drawModels.json?.models));

const gen = await api('/api/draw/generate', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ model: 'local-svg', prompt: '雨夜霓虹街头，赛博少女', size: '768x1344', count: 2 }),
});
check('POST /api/draw/generate', gen.json?.ok === true && Boolean(gen.json?.id));

// 对话 SSE
const session = await api('/api/chat/sessions', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ title: 'smoke', model: 'local-echo' }),
});
const sse = await api('/api/chat/completions', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ session_id: session.json?.id, model: 'local-echo', prompt: '写一个三幕短剧开场' }),
});
const events = sse.text.split('\n\n').map((l) => l.replace(/^data:\s*/, '')).filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
check('POST /api/chat/completions 流式', events[0]?.type === 'started' && events.some((e) => e.type === 'delta') && events.some((e) => e.type === 'done'), `${events.length} 个事件`);

const tasks = await api('/api/tasks?type=all&status=all&limit=100');
check('GET /api/tasks 聚合', tasks.json?.ok === true && Array.isArray(tasks.json?.tasks) && typeof tasks.json?.stats === 'object');

const works = await api('/api/works?page=1&q=&sort=latest');
check('GET /api/works', works.json?.ok === true && Array.isArray(works.json?.works));

for (const p of ['/api/remake-workshop/capabilities', '/api/script-tools/meta', '/api/doubao-agent/devices', '/api/tutorials']) {
  const r = await api(p);
  check(`GET ${p}`, r.status === 200 && r.json?.ok === true);
}

// 等绘画任务落盘为 success（网关 7s 后完成）
await new Promise((r) => setTimeout(r, 8000));
const drawTasks = await api('/api/draw/tasks');
const done = drawTasks.json?.tasks?.find((t) => t.id === gen.json?.id);
check('绘画任务 7s 后 success 且有图', done?.status === 'success' && done?.images?.length === 2, `${done?.status} / ${done?.images?.length} 张`);
if (done?.images?.length) {
  const img = await fetch(`http://127.0.0.1:${GW}/api/draw/tasks/${done.id}/images/0/download`);
  check('GET 图片下载返回 image/*', (img.headers.get('content-type') || '').startsWith('image/'), img.headers.get('content-type'));
}

/* ---------------------------------------------------------------- 界面层 */
const { chromium } = require('playwright-core');
const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean);
const executablePath = candidates.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error('未找到 Edge/Chrome，可用 CHROME_PATH 指定');
  gateway.kill(); server.close();
  process.exit(1);
}

const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const messages = [];
page.on('console', (m) => messages.push({ type: m.type(), text: m.text().slice(0, 300), url: page.url() }));
page.on('pageerror', (e) => messages.push({ type: 'pageerror', text: String(e).slice(0, 300), url: page.url() }));

console.log('\n===== 界面层 =====');
const routes = [
  ['/', '把故事，变成可执行的短剧', 'home'],
  ['/chat', '聊天', 'chat'],
  ['/draw', '绘画', 'draw'],
  ['/tasks', '任务', 'tasks'],
  ['/works', '作品', null],
  ['/script-maker', '剧本', null],
  ['/short-drama-production', '短剧', null],
  ['/settings', '大模型设置', 'settings'],
];

for (const [route, expect, shot] of routes) {
  const errorsBefore = messages.filter((m) => m.type === 'error' || m.type === 'pageerror').length;
  await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);
  const text = await page.evaluate(() => document.body.innerText);
  const okText = text.includes(expect);
  const errorsAfter = messages.filter((m) => m.type === 'error' || m.type === 'pageerror').length;
  check(`页面 ${route} 渲染（含「${expect}」）`, okText && text.length > 200 && errorsAfter === errorsBefore, `${text.length} 字符`);
  if (shot) await page.screenshot({ path: path.join(SMOKE, `${shot}.png`) });
}

fs.mkdirSync(SMOKE, { recursive: true });
fs.writeFileSync(path.join(SMOKE, 'console.json'), JSON.stringify(messages, null, 2), 'utf8');
const errors = messages.filter((m) => m.type === 'error' || m.type === 'pageerror');
console.log(`\n控制台错误 ${errors.length} 条`);
for (const e of errors.slice(0, 8)) console.log(` - [${e.type}] ${e.url} ${e.text}`);

await browser.close();
gateway.kill();
server.close();

console.log(`\n===== 结果：${failed === 0 ? '全部通过' : `${failed} 项失败`} =====`);
process.exit(failed === 0 ? 0 : 1);
