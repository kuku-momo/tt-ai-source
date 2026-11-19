/**
 * smoke-app.mjs —— 对「打包产物」做真实启动验证
 *
 *   node tools/smoke-app.mjs
 *
 * 流程：
 *   1. 在 dist/AI-Creation-win32-x64/user-data 预置永久卡 license.json
 *   2. 以 AI_CREATION_LOAD=local + AI_CREATION_DEBUG=1 启动打包出的 AI-Creation.exe
 *      （本地渲染器 + 本地网关 + 远程调试端口 9222）
 *   3. playwright 通过 CDP 连上 Electron，截图并断言「永久卡 · 永久有效」在界面上
 * 产物：tools/.smoke/app-*.png
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APP = path.join(ROOT, 'dist', 'AI-Creation-win32-x64');
const SMOKE = path.join(ROOT, 'tools', '.smoke');
const CDP = 'http://127.0.0.1:9222';

const exe = path.join(APP, 'AI-Creation.exe');
if (!fs.existsSync(exe)) {
  console.error('缺少打包产物，先执行 npm run build');
  process.exit(1);
}

const licenseCore = require(path.join(ROOT, 'electron', 'license-core.cjs'));
const userData = path.join(APP, 'user-data');
fs.mkdirSync(userData, { recursive: true });
fs.writeFileSync(
  path.join(userData, 'license.json'),
  JSON.stringify({ code: licenseCore.generate({ type: 'P' }), permanent: true, cardName: '永久卡', activatedAt: new Date().toISOString(), expiresAt: null }, null, 2),
  'utf8'
);
fs.writeFileSync(
  path.join(userData, 'crack-config.json'),
  JSON.stringify({ mode: 'local', gatewayPort: 8787, gatewayAutoStart: true, debug: true, devtools: false }, null, 2),
  'utf8'
);

console.log('[smoke-app] 启动打包客户端…');
// 本机若配了 HTTP_PROXY，CDP 的 127.0.0.1 请求必须直连
process.env.NO_PROXY = '127.0.0.1,localhost';
process.env.no_proxy = '127.0.0.1,localhost';
const child = spawn(exe, [], {
  cwd: APP,
  env: (() => {
    // 与上游 README 同款坑：本机残留 ELECTRON_RUN_AS_NODE 会让 exe 以 Node 模式启动
    const env = { ...process.env, AI_CREATION_LOAD: 'local', AI_CREATION_DEBUG: '1' };
    delete env.ELECTRON_RUN_AS_NODE;
    return env;
  })(),
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: false,
});
child.stdout.on('data', (d) => process.stdout.write(`[app] ${d}`));
child.stderr.on('data', (d) => process.stderr.write(`[app] ${d}`));

const { chromium } = require('playwright-core');

// 等 CDP 端口就绪（应用冷启动可能要几秒）
const net = await import('node:net');
let cdpUp = false;
for (let i = 0; i < 60 && !cdpUp; i += 1) {
  cdpUp = await new Promise((resolve) => {
    const s = net.default ? undefined : undefined;
    const socket = new net.default.Socket();
    socket.once('connect', () => { socket.destroy(); resolve(true); });
    socket.once('error', () => resolve(false));
    socket.connect(9222, '127.0.0.1');
  });
  if (!cdpUp) await new Promise((r) => setTimeout(r, 500));
}
if (!cdpUp) {
  console.error('CDP 9222 未就绪，应用可能启动失败');
  child.kill();
  process.exit(1);
}
const browser = await chromium.connectOverCDP(CDP, { timeout: 60000 });
const contexts = browser.contexts();
const pages = contexts.flatMap((c) => c.pages());
const cdpPage = pages.find((p) => p.url().startsWith('http')) || (await contexts[0].newPage());
await cdpPage.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
await cdpPage.waitForTimeout(2500);

fs.mkdirSync(SMOKE, { recursive: true });
await cdpPage.screenshot({ path: path.join(SMOKE, 'app-home.png') });
const text = await cdpPage.evaluate(() => document.body.innerText);
const url = cdpPage.url();
console.log(`[smoke-app] 当前 URL: ${url}`);
console.log(`[smoke-app] 永久卡标识: ${text.includes('永久卡') ? 'OK' : 'MISS'}`);
console.log(`[smoke-app] 侧边栏标识: ${text.includes('AI短剧创作系统') || text.includes('功能区') ? 'OK' : 'MISS'}`);

await cdpPage.goto(url.replace(/\/$/, '') + '/tasks', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
await cdpPage.waitForTimeout(1500);
await cdpPage.screenshot({ path: path.join(SMOKE, 'app-tasks.png') });

console.log('\n===== 窗口内可见文本（前 600 字）=====\n' + text.slice(0, 600));

await browser.close();
child.kill();
process.exit(0);
