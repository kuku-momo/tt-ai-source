// 验证 v1.5.8 破解版：逐页渲染 + 卡密/激活字样扫描 + 控制台错误
const CDP = process.env.CDP_URL || 'http://127.0.0.1:9222';
const SHOT = process.env.SHOT_DIR || 'D:\\Backup\\Downloads\\ai-158';
const { chromium } = await import('playwright-core');

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
const page = ctx.pages().find((p) => p.url().startsWith('https://khd.yxzyxm.top')) || ctx.pages()[0];
console.log('page =', page.url());

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push('[console] ' + m.text().slice(0, 160)); });
page.on('pageerror', (e) => errors.push('[pageerror] ' + String(e.message).slice(0, 160)));

await page.waitForTimeout(2500);

// 1) 首屏状态
const first = await page.evaluate(() => ({
  title: document.title,
  hasActivation: !!document.querySelector('.auth-wrap, .activation, .login-page, .auth-page'),
  hasCardText: document.body.innerText.includes('卡密'),
  hasActivateText: document.body.innerText.includes('激活'),
  topbar: (document.querySelector('.topbar')?.innerText || '').replace(/\s+/g, ' '),
  navs: [...document.querySelectorAll('.nav-item .label, .nav-item')].map((n) => n.textContent.trim()).filter(Boolean),
  contentLen: (document.querySelector('.content')?.innerText || '').length,
}));
console.log('\n== 首屏 ==');
console.log(JSON.stringify(first, null, 1));

// 2) 逐个导航点击
const routes = ['首页', '任务记录', '短剧制作', 'AI漫剧全功能', '短剧重制', '视频换人', '剧本制作',
  '作品广场', '聊天', '绘画', '视频', '大模型设置', '意见反馈'];
const rows = [];
for (const label of routes) {
  const before = errors.length;
  const clicked = await page.evaluate((text) => {
    const items = [...document.querySelectorAll('.nav-item')];
    const el = items.find((n) => n.textContent.trim() === text || n.textContent.includes(text));
    if (!el) return false;
    el.click();
    return true;
  }, label);
  await page.waitForTimeout(1600);
  const info = await page.evaluate(() => ({
    len: (document.querySelector('.content')?.innerText || '').replace(/\s+/g, ' ').trim().length,
    head: (document.querySelector('.content')?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60),
    path: location.pathname,
    card: document.body.innerText.includes('卡密'),
  }));
  rows.push({ label, clicked, ...info, err: errors.length - before });
}

console.log('\n== 分页渲染 ==');
let ok = 0;
for (const r of rows) {
  if (r.len > 20) ok++;
  console.log(`${r.len > 20 ? 'OK   ' : 'EMPTY'} ${r.label.padEnd(12)} ${String(r.len).padStart(5)}字 path=${r.path.padEnd(28)} 卡密=${r.card} 错误+${r.err} | ${r.head}`);
}
console.log(`\n渲染成功 ${ok}/${rows.length}`);
console.log(`控制台错误 ${errors.length} 条`);
[...new Set(errors)].slice(0, 10).forEach((e) => console.log('  ' + e));

await page.screenshot({ path: SHOT + '\\v158-page.png' });
console.log('\n截图: ' + SHOT + '\\v158-page.png');
await browser.close();
