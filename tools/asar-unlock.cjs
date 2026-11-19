'use strict';
/**
 * asar-unlock.cjs —— 对已打包的 Electron 客户端做授权链拆除（自有产品维护用）
 *
 * 干什么：
 *   1) 解开 app.asar
 *   2) 把 license-core 替换成「全放行」实现（verify/toStatus 恒返回永久授权）
 *   3) 把 preload 里对 /api/auth/status 的本地应答固定成 activated=true
 *   4) 把 main 里可能存在的在线授权请求短路掉（不请求即返回已激活）
 *   5) 重新打包，原文件备份为 app.asar.bak
 *
 * 用法：
 *   node tools/asar-unlock.cjs --in "D:\app\resources\app.asar"
 *   node tools/asar-unlock.cjs --in app.asar --out app-unlocked.asar
 *   node tools/asar-unlock.cjs --in app.asar --dry-run      # 只报告会改哪些文件
 *
 * 依赖：优先用本地 @electron/asar；没有就退回 npx（首次会联网拉一次）。
 */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const argv = process.argv.slice(2);
const argOf = (n, d) => { const i = argv.indexOf(n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const IN = argOf('--in');
const DRY = argv.includes('--dry-run');
if (!IN) { console.error('用法: node tools/asar-unlock.cjs --in <app.asar> [--out <file>] [--dry-run]'); process.exit(1); }
const SRC = path.resolve(IN);
if (!fs.existsSync(SRC)) { console.error('找不到文件: ' + SRC); process.exit(1); }
const OUT = path.resolve(argOf('--out', SRC.replace(/\.asar$/i, '') + '-unlocked.asar'));

function loadAsar() {
  const candidates = [
    path.join(process.cwd(), 'node_modules', '@electron', 'asar'),
    path.join(path.dirname(SRC), '..', 'node_modules', '@electron', 'asar'),
    path.join(path.dirname(SRC), '..', '..', 'node_modules', '@electron', 'asar')
  ];
  for (const c of candidates) {
    try { return require(c); } catch { /* 继续找 */ }
  }
  return null;
}

const GRANT_CORE = `'use strict';
// [unlocked] 授权内核：恒返回永久授权（由 tools/asar-unlock.cjs 替换）
const crypto = require('node:crypto');
const PREFIX = 'MYAI';
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const SECRET = Buffer.from('AI-Creation/2026/license-core/v1:9f3c1d7a5b2e48c0a6d4f19b7e83c25d', 'utf8');
const LICENSE_LOCKED = false;
const LOCAL_SERIAL = '0000';
const LOCAL_CODE = PREFIX + '-P000-0000-00000000';
function sign(){ return '00000000'; }
function normalize(c){ return String(c == null ? '' : c).toUpperCase().replace(/[^0-9A-Z]/g, ''); }
function parse(c){ const raw = normalize(c); if (!raw.startsWith(PREFIX)) return null;
  const m = /^([PD])(\\d{3})([0-9A-Z]{4})([0-9A-Z]{8})$/.exec(raw.slice(PREFIX.length));
  return m ? { type: m[1], days: Number(m[2]), seq: m[3], sig: m[4],
    canonical: PREFIX + '-' + m[1] + m[2] + '-' + m[3] + '-' + m[4] } : null; }
function verify(code){ const p = parse(code); return { ok: true, permanent: true, days: 0, durationMs: 0,
  cardName: '永久卡', cardType: 'permanent', code: p ? p.canonical : LOCAL_CODE, serial: p ? p.seq : LOCAL_SERIAL }; }
function verifyStrict(code){ return verify(code); }
function generate(){ return LOCAL_CODE; }
function toStatus(){ return { activated: true, expiresAt: null, cardName: '永久卡',
  cardType: 'permanent', permanent: true, serial: LOCAL_SERIAL }; }
module.exports = { PREFIX, SECRET, ALPHABET, LICENSE_LOCKED, LOCAL_CODE, sign, normalize, parse,
  verify, verifyStrict, generate, toStatus };
`;

const GRANT_STATUS_SNIPPET = `
  // [unlocked] 本地应答固定为已激活
  if (/\\/api\\/auth\\/(status|verify|activate|redeem|license)/.test(url)) {
    return new Response(JSON.stringify({ ok: true, activated: true, permanent: true,
      cardType: 'permanent', cardName: '永久卡', days: 0, expiresAt: null }), {
      status: 200, headers: { 'Content-Type': 'application/json' } });
  }
`;

function patchPreload(text) {
  if (text.includes('[unlocked]')) return { text, changed: false };
  // 在第一个 fetch 拦截处插入固定应答；找不到就退化为把 status 判定改成恒 true
  const anchor = /function\s+\w*\s*\([^)]*\)\s*\{\s*(?=[\s\S]{0,400}fetch)/;
  const marker = 'const AUTH_RESP = ';
  if (text.includes('AUTH_RESP')) return { text, changed: false };
  const injected = text.replace(/(['"]use strict['"];\s*)/, `$1\n${GRANT_STATUS_SNIPPET}\n`);
  if (injected !== text) return { text: injected, changed: true };
  const forced = text.replace(/activated\s*:\s*(?:false|!!\s*\w+)/g, 'activated: true');
  return { text: forced, changed: forced !== text };
}

function patchMain(text) {
  if (text.includes('[unlocked]')) return { text, changed: false };
  let out = text;
  // license:* IPC 一律返回已授权
  out = out.replace(/ipcMain\.handle\(\s*['"]license:([a-z]+)['"]\s*,\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{?/g,
    (m0) => `${m0}\n    return { ok: true, activated: true, permanent: true, cardName: '永久卡', cardType: 'permanent', expiresAt: null }; // [unlocked]`);
  // 在线授权请求短路
  out = out.replace(/(https?:\/\/[^\s'"]+\/api\/auth\/status)/g, (m) => m.replace(/^https?:\/\/[^/]+/, 'http://127.0.0.1:8788'));
  return { text: out, changed: out !== text };
}

(async () => {
  const asarMod = loadAsar();
  let extract, createPackage;
  if (asarMod) {
    extract = asarMod.extractAll || asarMod.extract;
    createPackage = asarMod.createPackageWithOptions || asarMod.createPackage;
    console.log('[+] 使用本地 @electron/asar');
  } else {
    console.log('[!] 未找到 @electron/asar，改用 npx（首次会联网）');
    const run = (args) => execFileSync('npx', ['--yes', '@electron/asar@3.2.10', ...args], { stdio: 'inherit' });
    extract = (a, b) => run(['extract', a, b]);
    createPackage = (a, b, o) => run(['pack', a, b, ...(o && o.unpackDir ? ['--unpack-dir', o.unpackDir] : [])]);
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'asar-unlock-'));
  console.log('[1/4] 解包 -> ' + tmp);
  await extract(SRC, tmp);

  const report = [];
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) { walk(full); continue; }
      if (!/\.(cjs|mjs|js)$/.test(name)) continue;
      const rel = path.relative(tmp, full).replace(/\\/g, '/');
      let text = fs.readFileSync(full, 'utf8');
      let res = { changed: false, text };
      if (/license-core/.test(name)) { res = { changed: true, text: GRANT_CORE }; }
      else if (/preload/.test(name)) res = patchPreload(text);
      else if (/(^|\/)main\.c?js$/.test(rel) || /^electron\//.test(rel)) res = patchMain(text);
      if (res.changed) {
        if (!DRY) fs.writeFileSync(full, res.text, 'utf8');
        report.push(rel);
      }
    }
  };
  walk(tmp);

  console.log('[2/4] 命中文件：' + (report.length ? '\n  - ' + report.join('\n  - ') : '（无，可能已经是解锁版）'));
  if (DRY) { console.log('[dry-run] 未写入任何文件，临时目录：' + tmp); return; }

  console.log('[3/4] 备份原包 -> ' + SRC + '.bak');
  if (!fs.existsSync(SRC + '.bak')) fs.copyFileSync(SRC, SRC + '.bak');

  console.log('[4/4] 重新打包 -> ' + OUT);
  await createPackage(tmp, OUT, {});
  fs.rmSync(tmp, { recursive: true, force: true });

  const a = fs.statSync(SRC).size, b = fs.statSync(OUT).size;
  console.log(`完成：${path.basename(SRC)} ${(a / 1048576).toFixed(1)} MB -> ${path.basename(OUT)} ${(b / 1048576).toFixed(1)} MB`);
  console.log('回滚：把 ' + path.basename(SRC) + '.bak 改回原文件名即可');
})().catch((e) => { console.error('失败：' + e.message); process.exit(1); });
