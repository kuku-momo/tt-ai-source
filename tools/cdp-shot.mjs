// 通过 CDP 连接正在运行的 Electron，截图并断言界面内容
// 用法： bun tools/smoke-app.mjs（等价实现，独立于仓库原脚本）
import fs from 'node:fs';
import path from 'node:path';

const OUT = process.env.SHOT_DIR || 'D:\\Backup\\Downloads\\AI-Creation-Source\\docs';
const CDP = process.env.CDP_URL || 'http://127.0.0.1:9222';

const { chromium } = await import('playwright-core');

const listTargets = async () => {
  const res = await fetch(`${CDP}/json/list`);
  return res.json();
};

const targets = await listTargets();
console.log('CDP 目标数:', targets.length);
for (const t of targets) console.log(`  [${t.type}] ${t.title} :: ${t.url}`);

const page = targets.find((t) => t.type === 'page' && !t.url.startsWith('devtools://'));
if (!page) {
  console.error('没有可用的 page 目标');
  process.exit(1);
}

const browser = await chromium.connectOverCDP(`http://127.0.0.1:9222`);
const contexts = browser.contexts();
console.log('context 数:', contexts.length);
const pages = contexts.flatMap((c) => c.pages());
console.log('页面数:', pages.length);
for (const p of pages) console.log('  页面:', p.url());

const target = pages.find((p) => p.url().startsWith('http://127.0.0.1:')) || pages[0];
if (!target) {
  console.error('没有可截图的页面');
  process.exit(1);
}

await target.waitForLoadState('domcontentloaded').catch(() => {});
await target.waitForTimeout(3000);

const info = await target.evaluate(() => {
  const txt = (sel) => document.querySelector(sel)?.textContent?.trim() || null;
  const sidebar = [...document.querySelectorAll('.nav-item .label')].map((n) => n.textContent.trim());
  return {
    title: document.title,
    bodyLen: document.body.innerText.length,
    badge: txt('.badge'),
    navItems: sidebar,
    hasSidebar: !!document.querySelector('.sidebar'),
    hasContent: !!document.querySelector('.content'),
    loading: document.body.innerText.includes('加载中'),
    firstText: document.body.innerText.slice(0, 300).replace(/\s+/g, ' '),
  };
});

console.log('\n== 界面状态 ==');
console.log(JSON.stringify(info, null, 2));

fs.mkdirSync(OUT, { recursive: true });
const homeShot = path.join(OUT, 'smoke-app-home.png');
await target.screenshot({ path: homeShot, fullPage: false });
console.log('\n截图保存:', homeShot, fs.statSync(homeShot).size, '字节');

// 再访问设置页
await target.evaluate(() => {
  const link = [...document.querySelectorAll('a')].find((a) => a.getAttribute('href') === '/settings');
  if (link) link.click();
});
await target.waitForTimeout(2500);
const settingsShot = path.join(OUT, 'smoke-app-settings.png');
await target.screenshot({ path: settingsShot, fullPage: false });
const settingsUrl = target.url();
console.log('设置页 URL:', settingsUrl);
console.log('截图保存:', settingsShot, fs.statSync(settingsShot).size, '字节');

await browser.close();
console.log('\n完成');
