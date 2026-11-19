// 诊断：复现后台「批量生成卡密」，抓全量控制台消息 + 失败请求 + 响应体
const CDP = process.env.CDP_URL || 'http://127.0.0.1:9222';
const PW = process.env.ADMIN_PW || 'admin-local-2026';
const { chromium } = await import('playwright-core');

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
const page = ctx.pages().find((p) => p.url().startsWith('http://127.0.0.1:')) || ctx.pages()[0];
const base = `http://127.0.0.1:${new URL(page.url()).port}`;
console.log('页面:', page.url(), '→ base', base);

const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}\n${(e.stack || '').split('\n').slice(0, 4).join('\n')}`));
page.on('requestfailed', (r) => logs.push(`[requestfailed] ${r.method()} ${r.url()} :: ${r.failure()?.errorText}`));
page.on('response', async (r) => {
  if (r.url().includes('/api/') && r.status() >= 400) {
    let body = '';
    try { body = (await r.text()).slice(0, 300); } catch { body = '(读不到)'; }
    logs.push(`[http ${r.status()}] ${r.request().method()} ${r.url()} :: ${body}`);
  }
});

await page.goto(base + '/admin', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);

// 登录（若已在登录页）
const needLogin = await page.evaluate(() => !!document.querySelector('.admin-root input[type="password"]'));
console.log('需要登录:', needLogin);
if (needLogin) {
  await page.locator('.admin-root input[type="password"]').first().fill(PW);
  await page.locator('.admin-root button.primary').first().click();
  await page.waitForTimeout(2500);
}

// 进入卡密管理
await page.goto(base + '/admin?section=cards', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);

// 点击「批量生成卡密」
const btn = page.locator('.admin-root button', { hasText: '批量生成卡密' }).first();
const cnt = await btn.count();
console.log('找到生成按钮:', cnt);
if (cnt > 0) {
  logs.length = 0;
  await btn.click();
  await page.waitForTimeout(3500);
  const state = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.admin-root tbody tr')].map((tr) => tr.innerText.replace(/\s+/g, ' ').trim());
    return {
      rows,
      toast: [...document.querySelectorAll('.admin-root [role="status"], .admin-root .message, .admin-root .toast')].map((n) => n.textContent.trim()),
      bodyText: (document.querySelector('.admin-root')?.innerText || '').replace(/\s+/g, ' ').slice(0, 400),
    };
  });
  console.log('\n== 点击后列表 ==');
  console.log('rows:', JSON.stringify(state.rows.slice(0, 5), null, 2));
  console.log('toast:', JSON.stringify(state.toast));
  console.log('\n== 点击过程的控制台/网络 ==');
  if (!logs.length) console.log('(无任何错误或失败请求)');
  for (const l of logs) console.log('  ' + l);
}

// 直接打网关确认后端行为
const direct = await page.evaluate(async () => {
  const out = {};
  try {
    const r1 = await fetch('/api/admin/status');
    out.status = { code: r1.status, body: await r1.text() };
    const r2 = await fetch('/api/admin/cards');
    out.cards = { code: r2.status, body: (await r2.text()).slice(0, 300) };
  } catch (e) { out.error = String(e); }
  return out;
});
console.log('\n== 页面内直接请求 ==');
console.log(JSON.stringify(direct, null, 2));

await browser.close();
