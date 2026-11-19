// 后台 UI 端到端：登录后台 → 各栏目渲染 → 签发卡密 → 教程页渲染
import fs from 'node:fs';
import path from 'node:path';

const CDP = process.env.CDP_URL || 'http://127.0.0.1:9222';
const OUT = process.env.SHOT_DIR || 'D:\\Backup\\Downloads\\AI-Creation-Source\\docs';
const PW = process.env.ADMIN_PW || 'admin-local-2026';
const { chromium } = await import('playwright-core');

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
const page = ctx.pages().find((p) => p.url().startsWith('http://127.0.0.1:')) || ctx.pages()[0];
const port = new URL(page.url()).port;
const base = `http://127.0.0.1:${port}`;

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 180)); });
page.on('pageerror', (e) => errors.push('pageerror: ' + String(e.message).slice(0, 180)));

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}${detail ? ' :: ' + detail : ''}`);
};

// 1) 教程页
await page.goto(base + '/tutorials', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
let info = await page.evaluate(() => ({
  len: (document.querySelector('.content')?.innerText || '').replace(/\s+/g, ' ').trim().length,
  head: (document.querySelector('.content')?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 80),
}));
check('/tutorials 渲染', info.len > 20, `${info.len} 字 | ${info.head}`);

// 2) 后台页
await page.goto(base + '/admin', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);

// 先清掉可能残留的后台会话，保证每次都从登录页开始
await page.evaluate(() => fetch('/api/admin/logout', { method: 'POST' }).catch(() => {}));
await page.goto(base + '/admin', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);

const adminBefore = await page.evaluate(() => ({
  hasRoot: !!document.querySelector('.admin-root'),
  text: (document.querySelector('.admin-root')?.innerText || '').replace(/\s+/g, ' ').trim(),
}));
check('/admin 进入后有登录表单', adminBefore.hasRoot && adminBefore.text.includes('后台管理'), adminBefore.text.slice(0, 70));

// 3) 输密码登录
const pwdInput = page.locator('.admin-root input[type="password"]').first();
await pwdInput.fill(PW);
await page.locator('.admin-root button.primary').first().click();
await page.waitForTimeout(2500);

const afterLogin = await page.evaluate(() => ({
  text: (document.querySelector('.admin-root')?.innerText || '').replace(/\s+/g, ' ').trim(),
  navs: [...document.querySelectorAll('.admin-sidebar [aria-label], .admin-sidebar li, .admin-sidebar button')]
    .map((n) => n.textContent.trim()).filter(Boolean).slice(0, 12),
  metrics: [...document.querySelectorAll('.metric strong')].map((n) => n.textContent.trim()),
}));
check('后台登录成功', !afterLogin.text.includes('请输入后台密码'), afterLogin.text.slice(0, 90));
check('后台概况有数据', afterLogin.metrics.length > 0, 'metrics=' + JSON.stringify(afterLogin.metrics));

// 4) 逐栏目切换
const sections = ['overview', 'styles', 'tutorials', 'agency', 'oss', 'works'];
const secRows = [];
for (const s of sections) {
  const before = errors.length;
  await page.goto(`${base}/admin?section=${s}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1400);
  const t = await page.evaluate(() => (document.querySelector('.admin-root')?.innerText || '').replace(/\s+/g, ' ').trim());
  secRows.push({ s, len: t.length, err: errors.length - before, head: t.slice(0, 46) });
}
let okSec = 0;
for (const r of secRows) {
  if (r.len > 30) okSec++;
  console.log(`  ${r.len > 30 ? 'OK  ' : 'EMPTY'} section=${r.s.padEnd(11)} ${String(r.len).padStart(4)}字 错误+${r.err} | ${r.head}`);
}
check('后台栏目全部渲染', okSec === sections.length, `${okSec}/${sections.length}`);

// 5) 卡密栏目与「领取卡密」入口应已从界面消失
await page.goto(`${base}/admin?section=cards`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);
const cardsGone = await page.evaluate(() => {
  const t = (document.querySelector('.admin-root')?.innerText || '');
  const navs = [...document.querySelectorAll('.admin-sidebar button, .admin-sidebar li, .admin-sidebar a')]
    .map((n) => n.textContent.trim());
  return {
    hasCardNav: navs.some((n) => n.includes('卡密')),
    hasCardPanel: t.includes('卡密管理') || t.includes('批量生成卡密'),
    landedOn: document.querySelector('.admin-header h1')?.textContent?.trim() || t.slice(0, 40),
  };
});
check('后台无卡密栏目', !cardsGone.hasCardNav, JSON.stringify(cardsGone));
check('卡密面板不可达', !cardsGone.hasCardPanel, '当前栏目: ' + cardsGone.landedOn);

await page.screenshot({ path: path.join(OUT, 'smoke-app-admin.png') });

// 6) 回前台首页确认
await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
const home = await page.evaluate(() => ({
  badge: document.querySelector('.badge')?.textContent?.trim() || '',
  len: (document.querySelector('.content')?.innerText || '').length,
  hasCardText: document.body.innerText.includes('卡密'),
}));
check('前台首页仍正常且无卡密字样', home.len > 100 && !home.hasCardText, `badge="${home.badge}" 文本${home.len}字`);

console.log(`\n控制台错误 ${errors.length} 条`);
[...new Set(errors)].slice(0, 8).forEach((e) => console.log('  ' + e));
const pass = results.filter((r) => r.ok).length;
console.log(`\n== ${pass}/${results.length} 通过 ==`);
if (pass !== results.length) process.exitCode = 1;

await browser.close();
