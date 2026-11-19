// 遍历所有路由，检查每个页面是否真实渲染 + 收集控制台错误
import fs from 'node:fs';
import path from 'node:path';

const CDP = process.env.CDP_URL || 'http://127.0.0.1:9222';
const OUT = process.env.SHOT_DIR || 'D:\\Backup\\Downloads\\AI-Creation-Source\\docs';
const { chromium } = await import('playwright-core');

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
const page = ctx.pages().find((p) => p.url().startsWith('http://127.0.0.1:')) || ctx.pages()[0];

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`[console] ${m.text().slice(0, 200)}`);
});
page.on('pageerror', (e) => errors.push(`[pageerror] ${String(e.message).slice(0, 200)}`));

const routes = [
  ['/', '首页'],
  ['/tasks', '任务记录'],
  ['/works', '作品广场'],
  ['/chat', '聊天'],
  ['/draw', '绘画'],
  ['/video', '视频'],
  ['/short-drama-production', '短剧制作'],
  ['/drama-auto', 'AI漫剧'],
  ['/remake-workshop', '短剧重制'],
  ['/video-face-swap', '视频换人'],
  ['/drama-commerce', '电商短剧'],
  ['/script-tools', '剧本工具'],
  ['/script-maker', '剧本制作'],
  ['/canvas', '画布'],
  ['/settings', '大模型设置'],
  ['/tutorials', '教程中心'],
  ['/agency', '代理加盟'],
  ['/admin', '后台管理'],
];

const rows = [];
for (const [route, label] of routes) {
  const before = errors.length;
  await page.goto(`http://127.0.0.1:${new URL(page.url()).port}${route}`, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(1200);
  const info = await page.evaluate(() => {
    const content = document.querySelector('.content');
    const text = (content?.innerText || '').replace(/\s+/g, ' ').trim();
    return {
      len: text.length,
      head: text.slice(0, 60),
      h1: document.querySelector('.content h1')?.textContent?.trim() || null,
    };
  });
  rows.push({
    route,
    label,
    rendered: info.len > 20,
    len: info.len,
    h1: info.h1,
    head: info.head,
    newErrors: errors.length - before,
  });
}

console.log('== 路由渲染检查 ==');
let ok = 0;
for (const r of rows) {
  if (r.rendered) ok++;
  console.log(
    `${r.rendered ? 'OK  ' : 'EMPTY'} ${r.route.padEnd(26)} 文本${String(r.len).padStart(5)}字  错误+${r.newErrors}  ${r.head.slice(0, 50)}`
  );
}
console.log(`\n渲染成功 ${ok}/${rows.length}`);
console.log(`控制台错误累计 ${errors.length} 条`);
for (const e of errors.slice(0, 12)) console.log('  ' + e);

fs.mkdirSync(OUT, { recursive: true });
await page.goto(`http://127.0.0.1:${new URL(page.url()).port}/short-drama-production`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
const shot = path.join(OUT, 'smoke-app-drama.png');
await page.screenshot({ path: shot });
console.log('\n截图:', shot, fs.statSync(shot).size, '字节');

await browser.close();
