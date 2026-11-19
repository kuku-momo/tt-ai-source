// 删除 runtime/index.js 中 AgencyManager 组件（8414..9007 行），用空组件顶替 tp
// 用法: bun trim-agency.mjs <file>
const fs = require('node:fs');

const file = process.argv[2];
const src = fs.readFileSync(file, 'utf8');
const lines = src.split('\n');

const START = 8414; // 1-based: Sf = { class: "agency-manager" }
const END = 9007;   // 1-based: tp = Pt(ep, [["__scopeId", "data-v-0e92bb09"]]),

const before = lines[START - 2]; // 8413
const head = lines[END - 1];     // 9007
console.log('前一行:', JSON.stringify(before.slice(-70)));
console.log('末行  :', JSON.stringify(head.slice(0, 70)));

if (!/Af = Pt\(xf/.test(before)) {
  console.error('起始定位不符，放弃');
  process.exit(1);
}
if (!/^\s*tp = Pt\(ep,/.test(head)) {
  console.error('结束定位不符，放弃');
  process.exit(1);
}

const out = [
  ...lines.slice(0, START - 1),
  '  tp = { render: () => null },',
  ...lines.slice(END),
];

fs.writeFileSync(file, out.join('\n'), 'utf8');
console.log(`完成：${lines.length} 行 → ${out.length} 行（删除 ${END - START + 1} 行）`);
