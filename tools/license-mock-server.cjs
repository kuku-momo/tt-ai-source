'use strict';
/**
 * license-mock-server.cjs —— 本地授权服务替身
 *
 * 作用：客户端把 /api/auth/* 指向本服务时，任何卡密（含空值）都返回永久授权，
 *       用于自有产品在无网/演示/测试环境下的授权链路联调。
 *
 * 覆盖的接口（与 gateway/ai-gateway.cjs、electron/preload.cjs 中的判定一致）：
 *   POST /api/auth/activate   { code }        -> activated=true, permanent
 *   POST /api/auth/verify     { code }        -> 同上
 *   GET  /api/auth/status                     -> 同上（preload 注入用的就是这个）
 *   POST /api/auth/redeem     { code }        -> 同上
 *   GET  /api/auth/license                    -> 同上
 *
 * 用法：
 *   node tools/license-mock-server.cjs --port 8788
 *   node tools/license-mock-server.cjs --port 8788 --days 30   # 返回 30 天卡
 *   node tools/license-mock-server.cjs --port 8788 --strict    # 只放行 keygen 签发的真卡
 *
 * 客户端指向修改（任选其一）：
 *   1) electron/preload.cjs 顶部把 AUTH_BASE 改成 http://127.0.0.1:8788
 *   2) 或在 hosts 里把 api 域名指向 127.0.0.1，再让本服务监听 443（需证书）
 *   3) 或在网关侧加一条代理：/api/auth/* -> http://127.0.0.1:8788
 */

const http = require('node:http');
const path = require('node:path');

const argv = process.argv.slice(2);
const argOf = (name, def) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : def;
};
const PORT = Number(argOf('--port', '8788'));
const DAYS = Number(argOf('--days', '0'));
const STRICT = argv.includes('--strict');

let core = null;
try {
  core = require(path.join(__dirname, '..', 'electron', 'license-core.cjs'));
} catch (e) {
  console.warn('[!] 未加载到 license-core.cjs，严格模式不可用：' + e.message);
}

const now = () => new Date().toISOString();
const log = (...a) => console.log(`[${now()}]`, ...a);

function grant(code) {
  const permanent = DAYS <= 0;
  const expiresAt = permanent ? null : new Date(Date.now() + DAYS * 86400000).toISOString();
  return {
    ok: true,
    activated: true,
    permanent,
    cardType: permanent ? 'permanent' : 'duration',
    cardName: permanent ? '永久卡' : `${DAYS} 天卡`,
    days: permanent ? 0 : DAYS,
    expiresAt,
    serial: (code || '').replace(/[^0-9A-Z]/gi, '').slice(-12) || '0000',
    issuedAt: now(),
    mock: true
  };
}

function readBody(req) {
  return new Promise((resolve) => {
    let s = '';
    req.on('data', (c) => { s += c; if (s.length > 1e6) req.destroy(); });
    req.on('end', () => resolve(s));
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.pathname.replace(/\/+$/, '') || '/';
  const send = (obj, code = 200) => {
    const body = JSON.stringify(obj);
    res.writeHead(code, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
    });
    res.end(body);
  };

  if (req.method === 'OPTIONS') { res.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'}); return res.end(); }

  if (p === '/health') return send({ ok: true, port: PORT, strict: STRICT, days: DAYS });

  const authPaths = ['/api/auth/status', '/api/auth/verify', '/api/auth/activate',
                     '/api/auth/redeem', '/api/auth/license', '/api/auth/check'];
  if (authPaths.includes(p)) {
    const raw = req.method === 'POST' ? await readBody(req) : '';
    let code = url.searchParams.get('code') || '';
    if (raw) {
      try { code = (JSON.parse(raw).code || code); } catch { /* 忽略非 JSON */ }
    }

    if (STRICT && core) {
      const r = core.verifyStrict(code);
      log(`${req.method} ${p} code=${code || '(空)'} -> ${r.ok ? 'PASS' : 'REJECT: ' + r.reason}`);
      if (!r.ok) return send({ ok: false, activated: false, reason: r.reason }, 200);
      return send({ ...grant(code), permanent: r.permanent, cardName: r.cardName,
                    days: r.days, expiresAt: r.permanent ? null
                      : new Date(Date.now() + (r.durationMs || 0)).toISOString(), mock: true });
    }

    log(`${req.method} ${p} code=${code || '(空)'} -> GRANT(permanent=${DAYS <= 0})`);
    return send(grant(code));
  }

  log(`404 ${req.method} ${p}`);
  return send({ ok: false, error: 'not found', path: p }, 404);
});

server.listen(PORT, '127.0.0.1', () => {
  log(`license mock listening on http://127.0.0.1:${PORT}`);
  log(`mode: ${STRICT ? 'strict（只放行 keygen 真卡）' : 'grant-all'}  days=${DAYS}`);
  log(`try: curl http://127.0.0.1:${PORT}/api/auth/status`);
});
