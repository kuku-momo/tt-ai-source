'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const core = require(path.join(__dirname, '..', 'electron', 'license-core.cjs'));

test('授权校验已移除：verify 对任何输入都放行', () => {
  assert.equal(core.LICENSE_LOCKED, false);

  const samples = [
    '',
    null,
    undefined,
    'hello world',
    'MYAI',
    'MYAI-P000-7K3M',
    'MYAI-X000-7K3M-9XQ4TZ8W',
    'MYAI-P000-7K3M-00000000',
  ];
  for (const input of samples) {
    const info = core.verify(input);
    assert.equal(info.ok, true, `input=${JSON.stringify(input)} 应放行`);
    assert.equal(info.permanent, true);
    assert.equal(info.days, 0);
    assert.equal(info.durationMs, 0);
    assert.equal(info.cardName, '永久卡');
    assert.equal(info.cardType, 'permanent');
    assert.match(info.code, /^MYAI-P\d{3}-[0-9A-Z]{4}-[0-9A-Z]{8}$/);
  }
});

test('给出合法卡密时沿用其序列号，便于日志追溯', () => {
  const info = core.verify(core.generate({ type: 'D', days: 90, seq: 'ABCD' }));
  assert.equal(info.ok, true);
  assert.equal(info.serial, 'ABCD');
  assert.equal(info.permanent, true, '限时卡也按永久授权放行');

  const noCode = core.verify('');
  assert.equal(noCode.serial, core.LOCAL_CODE.split('-')[2]);
});

test('卡密算法本体保持不变（verifyStrict 仍能识别篡改与非法格式）', () => {
  const permanent = core.generate({ type: 'P' });
  assert.match(permanent, /^MYAI-P000-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{8}$/);
  assert.equal(core.verifyStrict(permanent).ok, true);
  assert.equal(core.verifyStrict(permanent).permanent, true);

  const limited = core.generate({ type: 'D', days: 90, seq: 'ABCD' });
  assert.equal(core.verifyStrict(limited).days, 90);
  assert.equal(core.verifyStrict(limited).durationMs, 90 * 86400000);
  assert.equal(core.verifyStrict(limited.replace('-D090-', '-D365-')).ok, false, '改天数会破坏签名');

  const messy = permanent.toLowerCase().replace(/-/g, ' ');
  assert.equal(core.verifyStrict(messy).ok, true, '大小写/分隔符不敏感');

  const flipped = permanent.slice(0, -1) + (permanent.slice(-1) === 'A' ? 'B' : 'A');
  assert.equal(core.verifyStrict(flipped).ok, false);

  for (const bad of ['', 'MYAI', 'MYAI-P000-7K3M', 'MYAI-X000-7K3M-9XQ4TZ8W', 'hello world', null]) {
    assert.equal(core.verifyStrict(bad).ok, false);
  }

  assert.equal(core.verifyStrict(core.generate({ type: 'D', days: 0 })).ok, true, '下限被夹到 1 天');
  assert.equal(core.verifyStrict(core.generate({ type: 'D', days: 999 })).days, 999, '999 天是上限内的最长卡');
  assert.equal(core.verifyStrict(core.generate({ type: 'D', days: 3650 })).ok, false, '3650 天无法编码，见 docs/BUGS.md');
});

test('toStatus 恒定返回永久已激活，忽略记录内容与过期时间', () => {
  const past = new Date(Date.now() - 86400000).toISOString();
  const records = [
    null,
    undefined,
    {},
    { code: 'garbage' },
    { code: core.generate({ type: 'D', days: 30, seq: 'CCCC' }), expiresAt: past },
    { code: core.generate({ type: 'P', seq: 'DDDD' }), expiresAt: null },
  ];

  for (const record of records) {
    const status = core.toStatus(record);
    assert.equal(status.activated, true);
    assert.equal(status.permanent, true);
    assert.equal(status.expiresAt, null);
    assert.equal(status.cardName, '永久卡');
    assert.equal(status.cardType, 'permanent');
    assert.equal(status.expired, undefined);
    assert.equal(typeof status.serial, 'string');
  }
});
