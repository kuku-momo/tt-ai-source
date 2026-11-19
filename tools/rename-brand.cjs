// 品牌改名：梦颜AI → TT助手AI（UTF-8 安全）
const fs = require('node:fs');

const OLD = '梦颜AI';
const NEW = 'TT助手AI';

const files = process.argv.slice(2);
let total = 0;

for (const f of files) {
  if (!fs.existsSync(f)) {
    console.log(`  SKIP  ${f} 不存在`);
    continue;
  }
  const src = fs.readFileSync(f, 'utf8');
  const count = src.split(OLD).length - 1;
  if (!count) {
    console.log(`  --    ${f}  无匹配`);
    continue;
  }
  fs.writeFileSync(f, src.split(OLD).join(NEW), 'utf8');
  total += count;
  console.log(`  OK    ${f}  替换 ${count} 处`);
}
console.log(`\n合计替换 ${total} 处：${OLD} → ${NEW}`);
