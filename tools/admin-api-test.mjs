// 后台接口全链路测试（真实 HTTP，带 cookie 会话）
const BASE = process.env.GW || 'http://127.0.0.1:8801';
const PASSWORD = process.env.ADMIN_PW || 'admin-local-2026';

let cookie = '';
const results = [];

async function call(method, p, { body, headers = {}, raw } = {}) {
  const h = { ...headers };
  if (cookie) h.cookie = cookie;
  let payload;
  if (raw !== undefined) payload = raw;
  else if (body !== undefined) {
    h['content-type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  const res = await fetch(BASE + p, { method, headers: h, body: payload });
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) cookie = setCookie.split(';')[0];
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* binary */ }
  return { status: res.status, json, text };
}

function check(name, cond, detail = '') {
  results.push({ name, ok: !!cond, detail });
  console.log(`${cond ? 'OK  ' : 'FAIL'} ${name}${detail ? ' :: ' + detail : ''}`);
}

// 0. 未登录
let r = await call('GET', '/api/admin/status');
check('status 未登录', r.json?.authenticated === false, JSON.stringify(r.json));
r = await call('GET', '/api/admin/cards');
check('cards 未登录返回 401', r.status === 401, `status=${r.status}`);

// 1. 错误密码
r = await call('POST', '/api/admin/login', { body: { password: 'wrong' } });
check('错误密码返回 401', r.status === 401, r.json?.msg);

// 2. 正确密码
r = await call('POST', '/api/admin/login', { body: { password: PASSWORD } });
check('登录成功', r.status === 200 && r.json?.authenticated === true, `cookie=${cookie.slice(0, 24)}…`);

r = await call('GET', '/api/admin/status');
check('status 已登录', r.json?.authenticated === true);

// 3. 概况
r = await call('GET', '/api/admin/overview');
check('overview 结构完整', r.json?.server?.node && r.json?.cards && r.json?.tasks && Array.isArray(r.json.tasks.draw),
  `node=${r.json?.server?.node} uptime=${r.json?.server?.uptime}`);

// 4. 签发卡密
r = await call('POST', '/api/admin/cards', { body: { count: 3, cardType: 'permanent' } });
const made = r.json?.cards || [];
check('签发 3 张永久卡', made.length === 3, made[0]?.code);

r = await call('POST', '/api/admin/cards', { body: { count: 2, cardType: 'duration', days: 30 } });
check('签发 2 张 30 天卡', (r.json?.cards || []).length === 2, r.json?.cards?.[0]?.card_name);

// 5. 列表 + 撤销 + 重置
r = await call('GET', '/api/admin/cards');
const all = r.json?.cards || [];
check('卡密列表', all.length === 5, `共 ${all.length} 张`);

const target = all[0];
r = await call('POST', `/api/admin/cards/${target.id}/revoke`);
check('撤销卡密', r.json?.card?.status === 'revoked');
r = await call('POST', `/api/admin/cards/${target.id}/reset`);
check('重置卡密', r.json?.card?.status === 'unused');

// 6. 画风
r = await call('POST', '/api/admin/style-presets', { body: { label: '东方仙侠电影', preset_key: 'xianxia-film', category: 'live', tone: 'film', prompt: 'cinematic xianxia', sort_order: 1 } });
const preset = r.json?.preset;
check('新增画风', !!preset?.id, preset?.label);
r = await call('GET', '/api/admin/style-presets');
check('画风列表', (r.json?.presets || []).length === 1);
r = await call('PUT', `/api/admin/style-presets/${preset.id}`, { body: { prompt: 'cinematic xianxia v2', enabled: false } });
check('更新画风', r.json?.preset?.prompt === 'cinematic xianxia v2' && r.json?.preset?.enabled === false);

// 7. 教程（先建分类数据，再验证前端读法）
r = await call('POST', '/api/admin/tutorials', { body: { title: '快速上手', category: 'basics', summary: '五分钟跑通', content: '# 步骤' } });
check('新增教程', !!r.json?.article?.id, r.json?.article?.title);
r = await call('GET', '/api/tutorials');
check('/api/tutorials 返回 categories+articles', Array.isArray(r.json?.categories) && Array.isArray(r.json?.articles), `articles=${r.json?.articles?.length}`);
const artId = r.json?.articles?.[0]?.id;
r = await call('GET', `/api/tutorials/articles/${artId}`);
check('/api/tutorials/articles/:id', r.json?.article?.id === artId);

// 8. 卡密领取
r = await call('PUT', '/api/admin/card-claim', { body: { enabled: true, wechat: 'demo_wx', description: '联系客服领卡' } });
check('保存领取设置', r.json?.config?.enabled === true, r.json?.config?.wechat);
r = await call('GET', '/api/site/card-claim');
check('前台读到领取设置', r.json?.config?.wechat === 'demo_wx');

// 9. OSS 独立验证
r = await call('GET', '/api/admin/oss');
check('OSS 未解锁 401', r.status === 401 && r.json?.code === 'OSS_LOCKED');
r = await call('POST', '/api/admin/oss/unlock', { body: { password: PASSWORD } });
const ossToken = r.json?.token;
check('OSS 解锁', !!ossToken);
r = await call('GET', '/api/admin/oss', { headers: { 'x-oss-token': ossToken } });
check('OSS 读取配置', r.json?.config !== undefined);
r = await call('PUT', '/api/admin/oss', { headers: { 'x-oss-token': ossToken }, body: { enabled: true, region: 'oss-cn-hangzhou', bucket: 'demo-bucket', accessKeyId: 'AK', accessKeySecret: 'SK' } });
check('OSS 保存', r.json?.config?.bucket === 'demo-bucket');

// 10. 代理加盟
r = await call('GET', '/api/admin/agency');
check('代理未解锁 401', r.status === 401 && r.json?.code === 'AGENCY_LOCKED');
r = await call('POST', '/api/admin/agency/unlock', { body: { password: PASSWORD } });
const agToken = r.json?.token;
check('代理解锁', !!agToken);
r = await call('GET', '/api/admin/agency', { headers: { 'x-admin-token': agToken } });
check('代理列表', Array.isArray(r.json?.applications));

// 11. 作品审核
r = await call('POST', '/api/works', { body: { title: '测试作品', description: '自动化审核用' } });
const workId = r.json?.work?.id;
check('创建作品', !!workId, workId);
r = await call('GET', '/api/admin/works?status=pending&page=1');
check('作品待审列表含新建作品', (r.json?.works || []).some((w) => w.id === workId), `total=${r.json?.total}`);
r = await call('GET', '/api/works');
check('广场不显示待审作品', !(r.json?.works || []).some((w) => w.id === workId), `广场 ${r.json?.total} 条`);
r = await call('POST', `/api/admin/works/${workId}/review`, { body: { action: 'publish', note: '', revision: 1 } });
check('作品审核通过', r.json?.work?.status === 'published');
r = await call('GET', '/api/works');
check('审核后广场可见', (r.json?.works || []).some((w) => w.id === workId), `广场 ${r.json?.total} 条`);

// 12. 退出
r = await call('POST', '/api/admin/logout');
check('退出登录', r.json?.ok === true);
r = await call('GET', '/api/admin/status');
check('退出后未登录', r.json?.authenticated === false);

const pass = results.filter((x) => x.ok).length;
console.log(`\n== 结果：${pass}/${results.length} 通过 ==`);
if (pass !== results.length) {
  console.log('失败项：');
  results.filter((x) => !x.ok).forEach((x) => console.log('  - ' + x.name + (x.detail ? ' :: ' + x.detail : '')));
  process.exitCode = 1;
}
