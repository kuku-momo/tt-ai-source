// 真实交互测试：走一遍「用起来」的主流程，抓失败点
const CDP = process.env.CDP_URL || 'http://127.0.0.1:9222';
const { chromium } = await import('playwright-core');

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
const page = ctx.pages().find((p) => p.url().startsWith('http://127.0.0.1:')) || ctx.pages()[0];
const port = new URL(page.url()).port;
const base = `http://127.0.0.1:${port}`;
console.log('base', base);

const logs = [];
page.on('console', (m) => { if (m.type() === 'error') logs.push('[console] ' + m.text().slice(0, 200)); });
page.on('pageerror', (e) => logs.push('[pageerror] ' + String(e.message).slice(0, 200)));
page.on('requestfailed', (r) => logs.push(`[failed] ${r.method()} ${r.url()} :: ${r.failure()?.errorText}`));
page.on('response', async (r) => {
  if (r.url().includes('/api/') && r.status() >= 400) {
    let b = ''; try { b = (await r.text()).slice(0, 200); } catch {}
    logs.push(`[http ${r.status()}] ${r.request().method()} ${r.url().replace(base, '')} :: ${b}`);
  }
});

const report = [];
const step = async (name, fn) => {
  const before = logs.length;
  let detail = '';
  try { detail = (await fn()) || ''; } catch (e) { detail = 'EXCEPTION: ' + String(e.message).slice(0, 150); }
  const errs = logs.slice(before);
  report.push({ name, detail, errs });
  console.log(`\n### ${name}`);
  console.log('  结果:', detail || '(无输出)');
  if (errs.length) errs.slice(0, 5).forEach((e) => console.log('  错误:', e));
  else console.log('  错误: 无');
};

// 1 设置页：模型与连通性
await step('设置页读取配置', async () => {
  await page.goto(base + '/settings', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  return page.evaluate(() => {
    const v = document.querySelector('input')?.value || '';
    const tabs = [...document.querySelectorAll('.content button')].map((b) => b.textContent.trim()).filter(Boolean).slice(0, 8);
    return `baseURL=${v} 按钮=${JSON.stringify(tabs)}`;
  });
});

await step('设置页「测试连接」', async () => {
  const btn = page.locator('.content button', { hasText: '测试连接' }).first();
  if (!(await btn.count())) return '未找到测试连接按钮';
  await btn.click();
  await page.waitForTimeout(4000);
  return page.evaluate(() => (document.querySelector('.content')?.innerText || '').replace(/\s+/g, ' ').slice(0, 200));
});

// 2 聊天
await step('聊天发送消息', async () => {
  await page.goto(base + '/chat', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const ta = page.locator('textarea').first();
  if (!(await ta.count())) return '未找到输入框';
  await ta.fill('你好，测试一下');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(6000);
  return page.evaluate(() => {
    const t = (document.querySelector('.content')?.innerText || '').replace(/\s+/g, ' ');
    return t.slice(0, 260);
  });
});

// 3 绘画
await step('绘画生成', async () => {
  await page.goto(base + '/draw', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const prompt = page.locator('textarea').first();
  if (await prompt.count()) await prompt.fill('一只在雨中的猫');
  const btn = page.locator('.content button', { hasText: /生成|立即生成|开始生成/ }).first();
  if (!(await btn.count())) return '未找到生成按钮';
  await btn.click();
  await page.waitForTimeout(9000);
  const state = await page.evaluate(() => {
    const t = (document.querySelector('.content')?.innerText || '').replace(/\s+/g, ' ');
    return {
      text: t.slice(0, 220),
      imgs: [...document.querySelectorAll('.content img')].map((i) => i.src.slice(0, 80)),
    };
  });
  return JSON.stringify(state);
});

// 4 视频
await step('视频生成', async () => {
  await page.goto(base + '/video', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const prompt = page.locator('textarea').first();
  if (await prompt.count()) await prompt.fill('海边日落延时');
  const btn = page.locator('.content button', { hasText: /生成|开始生成/ }).first();
  if (!(await btn.count())) return '未找到生成按钮';
  await btn.click();
  await page.waitForTimeout(9000);
  return page.evaluate(() => (document.querySelector('.content')?.innerText || '').replace(/\s+/g, ' ').slice(0, 220));
});

// 5 新建短剧项目
await step('新建短剧项目', async () => {
  await page.goto(base + '/short-drama-production', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const btn = page.locator('.content button, .content a', { hasText: /新建短剧项目|新建项目/ }).first();
  if (!(await btn.count())) return '未找到新建按钮';
  await btn.click();
  await page.waitForTimeout(2500);
  return page.evaluate(() => ({ url: location.pathname, text: (document.querySelector('.content')?.innerText || '').replace(/\s+/g, ' ').slice(0, 200) }))
    .then((r) => JSON.stringify(r));
});

// 6 作品广场
await step('作品广场加载', async () => {
  await page.goto(base + '/works', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1800);
  return page.evaluate(() => (document.querySelector('.content')?.innerText || '').replace(/\s+/g, ' ').slice(0, 200));
});

console.log('\n\n================ 汇总 ================');
let bad = 0;
for (const r of report) {
  const flag = r.errs.length ? 'ERR ' : 'OK  ';
  if (r.errs.length) bad++;
  console.log(`${flag}${r.name}  ${r.detail.slice(0, 110)}`);
}
console.log(`\n有错误的步骤: ${bad}/${report.length}`);
await browser.close();
