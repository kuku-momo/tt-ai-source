// 管理后台鉴权审计：枚举所有 /api/admin/* 路由，检测哪些缺少 requireAuth
const fs = require('node:fs');

const file = process.argv[2];
const src = fs.readFileSync(file, 'utf8');
const lines = src.split('\n');

// 1) 抽出所有路由定义行
const routes = [];
lines.forEach((ln, i) => {
  const m = ln.match(/pathname === '(\/api\/admin[^']*)'/);
  if (m) routes.push({ path: m[1], line: i + 1, method: (ln.match(/method === '([A-Z]+)'/) || [])[1] || '?' });
});

// 2) 找每个路由块内是否出现 requireAuth / authed / requireOss / ossAuthed
const guards = ['requireAuth(', 'if (!authed', 'authed)', 'requireOss', 'ossAuthed', 'AGENCY_LOCKED', 'OSS_LOCKED', 'sessions['];
const results = [];
for (let i = 0; i < routes.length; i += 1) {
  const start = routes[i].line - 1;
  const end = i + 1 < routes.length ? routes[i + 1].line - 1 : lines.length;
  const block = lines.slice(start, end).join('\n');
  const guarded = guards.some((g) => block.includes(g));
  results.push({ ...routes[i], guarded });
}

const unguarded = results.filter((r) => !r.guarded);
console.log(`总路由 ${results.length}，疑似未鉴权 ${unguarded.length}`);
console.log('\n=== 未鉴权路由 ===');
unguarded.forEach((r) => console.log(`  L${r.line}  ${r.method} ${r.path}`));
console.log('\n=== 已鉴权路由（前 12 条）===');
results.filter((r) => r.guarded).slice(0, 12).forEach((r) => console.log(`  L${r.line}  ${r.method} ${r.path}`));
