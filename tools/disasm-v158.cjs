// 反汇编 v1.5.8 的 V8 代码缓存（.compiled/*.bin）
// 关键：不能让 --allow-natives-syntax 在 new vm.Script 之前生效，否则 V8 的 flag hash 变化
// 会导致 cachedData 被拒。做法是先按 loader 原样设 --no-lazy --no-flush-bytecode 接受缓存，
// 拿到 wrapper 后再 setFlagsFromString('--allow-natives-syntax') 并用 eval 调 %。
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const v8 = require('node:v8');

v8.setFlagsFromString('--no-lazy --no-flush-bytecode');

const dir = process.argv[2];
const out = process.argv[3] || path.join(dir, 'disasm');
fs.mkdirSync(out, { recursive: true });

const ids = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));

function capture(fn) {
  const chunks = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (s) => { chunks.push(String(s)); return true; };
  try { fn(); } finally { process.stdout.write = orig; }
  return chunks.join('');
}

for (const id of ids) {
  const base = path.join(dir, id);
  const meta = JSON.parse(fs.readFileSync(base + '.json', 'utf8'));
  const match = process.versions.v8 === meta.v8 && process.versions.modules === meta.modules && process.arch === meta.arch;
  console.log(`\n===== ${id} =====`);
  console.log(`meta: length=${meta.length} v8=${meta.v8} modules=${meta.modules} arch=${meta.arch} match=${match}`);
  if (!match) { console.log('跳过：运行时版本不匹配'); continue; }

  const script = new vm.Script('"' + '\u200b'.repeat(meta.length - 2) + '"', {
    filename: `${id}.cjs`,
    cachedData: fs.readFileSync(base + '.bin')
  });
  console.log(`cachedDataRejected = ${script.cachedDataRejected}`);
  if (script.cachedDataRejected) { console.log('缓存被拒，跳过'); continue; }

  const wrapper = script.runInThisContext();
  console.log(`wrapper: type=${typeof wrapper} name=${JSON.stringify(wrapper.name)} arity=${wrapper.length}`);

  // 现在才允许 natives syntax
  v8.setFlagsFromString('--allow-natives-syntax');
  globalThis.__target = wrapper;

  const dbg = capture(() => { (0, eval)('%DebugPrint(__target)'); });
  fs.writeFileSync(path.join(out, `${id}.debugprint.txt`), dbg, 'utf8');
  const key = dbg.split('\n').filter((l) => /SharedFunctionInfo|Bytecode|SourcePosition|Parameter|constant pool|scope/i.test(l));
  console.log('--- DebugPrint 关键行 ---');
  key.slice(0, 10).forEach((l) => console.log('   ' + l.trim().slice(0, 150)));
  if (!key.length) console.log('   （无匹配行，前 6 行如下）'), dbg.split('\n').slice(0, 6).forEach((l) => console.log('   ' + l.trim().slice(0, 150)));

  const asm = capture(() => { (0, eval)('%DisassembleFunction(__target)'); });
  fs.writeFileSync(path.join(out, `${id}.disasm.txt`), asm, 'utf8');
  const lines = asm.split('\n');
  console.log(`--- 反汇编 ${lines.length} 行 ---`);
  lines.slice(0, 45).forEach((l) => console.log('   ' + l.replace(/\s+$/, '')));
  console.log(`写出: ${path.join(out, id + '.disasm.txt')}`);
}
