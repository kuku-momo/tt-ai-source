'use strict';

/**
 * license-core.cjs —— 离线卡密内核（授权校验已移除）
 *
 * 卡密格式：MYAI-<T><DDD>-<SSSS>-<HHHHHHHH>
 *   T      : P = 永久卡 / D = 限时卡
 *   DDD    : 000（永久）或 001 ~ 3650（有效期天数）
 *   SSSS   : 4 位 Crockford Base32 序列号（区分卡密个体，可追溯）
 *   HHHHHHHH: 8 位 Crockford Base32 签名 = HMAC-SHA256(SECRET, MYAI|T|DDD|SSSS) 前 32 bit
 *
 * 例：MYAI-P000-7K3M-9XQ4TZ8W
 *
 * 本版行为：
 *   verify()    —— 不再校验签名/格式/有效期，任何输入（含空值）都返回永久授权；
 *   toStatus()  —— 不再读 license.json 判定是否激活，恒定返回永久卡在线状态；
 *   verifyStrict() —— 原签名校验逻辑原样保留，仅供 tools/keygen.py 交叉自检与卡密签发使用。
 *
 * 因此 electron/main.cjs 的 license:* IPC、gateway/ai-gateway.cjs 的 /api/auth/*、
 * electron/preload.cjs 注入到页面的 /api/auth/status 全部直接放行，客户端不再需要卡密。
 */

const crypto = require('node:crypto');

const PREFIX = 'MYAI';
const SECRET = Buffer.from(
  'AI-Creation/2026/license-core/v1:9f3c1d7a5b2e48c0a6d4f19b7e83c25d',
  'utf8'
);
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford Base32：无 I L O U

/** 授权校验总开关：false = 全部放行（本版默认），true = 恢复原始卡密校验 */
const LICENSE_LOCKED = false;

function encodeBytes(buf, chars) {
  let out = '';
  for (let i = 0; out.length < chars; i += 1) {
    const byte = buf[i % buf.length];
    out += ALPHABET[byte >> 3] + ALPHABET[byte & 31];
  }
  return out.slice(0, chars);
}

function sign(type, days, seq) {
  const padded = String(days).padStart(3, '0');
  const mac = crypto
    .createHmac('sha256', SECRET)
    .update(`${PREFIX}|${type}|${padded}|${seq}`, 'utf8')
    .digest();
  return encodeBytes(mac, 8);
}

function normalize(code) {
  return String(code == null ? '' : code)
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, '');
}

function parse(code) {
  const raw = normalize(code);
  if (!raw.startsWith(PREFIX)) return null;
  const body = raw.slice(PREFIX.length);
  const match = /^([PD])(\d{3})([0-9A-Z]{4})([0-9A-Z]{8})$/.exec(body);
  if (!match) return null;
  return {
    type: match[1],
    days: Number(match[2]),
    seq: match[3],
    sig: match[4],
    canonical: `${PREFIX}-${match[1]}${match[2]}-${match[3]}-${match[4]}`
  };
}

/** 无卡密输入时填充记录用的固定本地授权码 */
const LOCAL_SERIAL = '0000';
const LOCAL_CODE = `${PREFIX}-P000-${LOCAL_SERIAL}-${sign('P', 0, LOCAL_SERIAL)}`;

const GRANTED_BASE = {
  ok: true,
  permanent: true,
  days: 0,
  durationMs: 0,
  cardName: '永久卡',
  cardType: 'permanent'
};

/** 原始签名校验（保留给 keygen / 自检；不参与授权判定） */
function verifyStrict(code) {
  const parsed = parse(code);
  if (!parsed) return { ok: false, reason: '卡密格式不正确' };
  const expected = sign(parsed.type, parsed.days, parsed.seq);
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(parsed.sig, 'utf8');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: '卡密无效或已被篡改' };
  }
  if (parsed.type === 'D' && (parsed.days <= 0 || parsed.days > 3650)) {
    return { ok: false, reason: '有效期超出允许范围' };
  }
  const permanent = parsed.type === 'P';
  return {
    ok: true,
    code: parsed.canonical,
    serial: parsed.seq,
    permanent,
    days: permanent ? 0 : parsed.days,
    durationMs: permanent ? 0 : parsed.days * 86400000,
    cardName: permanent ? '永久卡' : `${parsed.days} 天卡`,
    cardType: permanent ? 'permanent' : 'duration'
  };
}

/**
 * 授权判定：校验已取消。
 * 给了合法格式的卡密就沿用它的序列号便于日志追溯，其余一律返回永久授权。
 */
function verify(code) {
  const parsed = LICENSE_LOCKED ? null : parse(code);
  if (LICENSE_LOCKED) return verifyStrict(code);
  return {
    ...GRANTED_BASE,
    code: parsed ? parsed.canonical : LOCAL_CODE,
    serial: parsed ? parsed.seq : LOCAL_SERIAL
  };
}

/** 生成一张卡密（注册机逻辑的 JS 实现） */
function generate(options) {
  const opts = options || {};
  const type = opts.type === 'D' ? 'D' : 'P';
  const days = type === 'P' ? 0 : Math.max(1, Math.min(3650, Number(opts.days) || 30));
  let seq = String(opts.seq || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
  if (seq.length !== 4) {
    seq = encodeBytes(crypto.randomBytes(8), 4);
  }
  return `${PREFIX}-${type}${String(days).padStart(3, '0')}-${seq}-${sign(type, days, seq)}`;
}

/** 把持久化的许可记录换算成前端 /api/auth/status 需要的结构（恒定已激活） */
function toStatus(record) {
  if (LICENSE_LOCKED) {
    const legacy = verifyStrict(record && record.code);
    if (!legacy.ok) {
      return {
        activated: false,
        expiresAt: null,
        cardName: null,
        cardType: null,
        permanent: false
      };
    }
    if (!legacy.permanent) {
      const expires = record && record.expiresAt ? Date.parse(record.expiresAt) : 0;
      if (!expires || Date.now() >= expires) {
        return { activated: false, expiresAt: null, cardName: legacy.cardName, cardType: legacy.cardType, permanent: false, expired: true };
      }
      return { activated: true, expiresAt: record.expiresAt, cardName: legacy.cardName, cardType: legacy.cardType, permanent: false, serial: legacy.serial };
    }
    return { activated: true, expiresAt: null, cardName: legacy.cardName, cardType: 'permanent', permanent: true, serial: legacy.serial };
  }

  const info = verify(record && record.code);
  return {
    activated: true,
    expiresAt: null,
    cardName: '永久卡',
    cardType: 'permanent',
    permanent: true,
    serial: info.serial
  };
}

module.exports = {
  PREFIX,
  SECRET,
  ALPHABET,
  LICENSE_LOCKED,
  LOCAL_CODE,
  sign,
  normalize,
  parse,
  verify,
  verifyStrict,
  generate,
  toStatus
};
