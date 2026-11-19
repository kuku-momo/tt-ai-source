// 补齐缺失的画风缩略图：先尝试线上，取不到则用相近图兜底，避免破图
const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');

const outDir = process.argv[2];
const base = process.argv[3] || 'https://khd.yxzyxm.top';
fs.mkdirSync(outDir, { recursive: true });

function dl(url) {
  return new Promise((resolve) => {
    const go = (u, hops) => {
      https.get(u, { headers: { 'user-agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && hops > 0) {
          res.resume();
          return go(new URL(res.headers.location, u).href, hops - 1);
        }
        if (res.statusCode !== 200) { res.resume(); return resolve(null); }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          // 必须是 PNG：8 字节魔数
          if (buf.length < 100 || buf[0] !== 0x89 || buf[1] !== 0x50) return resolve(null);
          resolve(buf);
        });
      }).on('error', () => resolve(null));
    };
    go(url, 5);
  });
}

// 缺失文件 → 候选兜底（用同一目录里已有的相近图）
const FALLBACK = {
  cg: 'cyberpunk-cg',          // CG风格 ≈ CG赛博朋克
  gongbi: 'chinese-animation-2d', // 工笔画 ≈ 2D国漫
};

(async () => {
  for (const [key, fallbackKey] of Object.entries(FALLBACK)) {
    const dest = path.join(outDir, key + '.png');
    if (fs.existsSync(dest)) { console.log(`SKIP ${key}.png 已存在`); continue; }

    // 1) 试线上原名
    const buf = await dl(`${base}/style-thumbnails/${key}.png`);
    if (buf) {
      fs.writeFileSync(dest, buf);
      console.log(`OK   ${key}.png 来自线上 ${buf.length} B`);
      continue;
    }

    // 2) 兜底：复制相近图
    const fb = path.join(outDir, fallbackKey + '.png');
    if (fs.existsSync(fb)) {
      fs.copyFileSync(fb, dest);
      console.log(`FB   ${key}.png ← ${fallbackKey}.png（线上无此图）`);
    } else {
      console.log(`FAIL ${key}.png 线上无图且兜底缺失`);
    }
  }

  console.log('\n目录现有：');
  for (const f of fs.readdirSync(outDir).sort()) {
    const b = fs.readFileSync(path.join(outDir, f));
    console.log(`  ${f.padEnd(30)} ${b.length} B  ${b[0] === 0x89 ? 'PNG' : '???'}`);
  }
})();
