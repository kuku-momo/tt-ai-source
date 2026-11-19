// 抽取 ShortDramaProduction.js 里的画风 key，并从线上抓取对应缩略图
const fs = require('node:fs');
const path = require('node:path');

const src = process.argv[2];   // ShortDramaProduction.js
const outDir = process.argv[3]; // renderer/public/style-thumbnails
const base = process.argv[4] || 'https://khd.yxzyxm.top';

const text = fs.readFileSync(src, 'utf8');
const start = text.indexOf('ee = {');
if (start < 0) { console.error('未找到预设表'); process.exit(1); }
const seg = text.slice(start, start + 8000);

const keys = [...seg.matchAll(/^\s*"([a-z0-9-]+)":\s*\{/gm)].map((m) => m[1]);
console.log('找到画风 key', keys.length, '个：');
console.log('  ' + keys.join(', '));

fs.mkdirSync(outDir, { recursive: true });
const https = require('node:https');

function dl(url, dest) {
  return new Promise((resolve) => {
    const go = (u, hops) => {
      https.get(u, { headers: { 'user-agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && hops > 0) {
          res.resume();
          return go(new URL(res.headers.location, u).href, hops - 1);
        }
        if (res.statusCode !== 200) { res.resume(); return resolve({ ok: false, code: res.statusCode }); }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          if (buf.length < 200) return resolve({ ok: false, code: 'tiny' });
          fs.writeFileSync(dest, buf);
          resolve({ ok: true, bytes: buf.length });
        });
      }).on('error', (e) => resolve({ ok: false, code: e.message }));
    };
    go(url, 5);
  });
}

(async () => {
  let ok = 0;
  for (const k of keys) {
    const dest = path.join(outDir, k + '.png');
    if (fs.existsSync(dest)) { ok += 1; console.log(`  SKIP ${k}.png`); continue; }
    const r = await dl(`${base}/style-thumbnails/${k}.png`, dest);
    if (r.ok) { ok += 1; console.log(`  OK   ${k}.png  ${r.bytes} B`); }
    else console.log(`  FAIL ${k}.png  ${r.code}`);
  }
  console.log(`\n完成 ${ok}/${keys.length}`);
})();
