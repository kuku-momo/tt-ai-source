// 单块反汇编：每个 .compiled/*.bin 用独立进程处理，避免 flag 哈希被污染
// 用法：ELECTRON_RUN_AS_NODE=1 梦颜AI.exe tools/disasm-one.cjs <compiled目录> <id>
// 输出直接打到进程 stdout（V8 打印器在 C++ 层，JS 拦截抓不到），由调用方重定向到文件
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const v8 = require('node:v8');

v8.setFlagsFromString('--no-lazy --no-flush-bytecode');

const dir = process.argv[2];
const id = process.argv[3];
if (!dir || !id) { console.error('usage: disasm-one.cjs <compiledDir> <id>'); process.exit(1); }

const base = path.join(dir, id);
const meta = JSON.parse(fs.readFileSync(base + '.json', 'utf8'));
console.error(`# ${id}: length=${meta.length} v8=${meta.v8} modules=${meta.modules} arch=${meta.arch}`);

const script = new vm.Script('"' + '\u200b'.repeat(meta.length - 2) + '"', {
  filename: `${id}.cjs`,
  cachedData: fs.readFileSync(base + '.bin')
});
console.error(`# cachedDataRejected = ${script.cachedDataRejected}`);
if (script.cachedDataRejected) process.exit(2);

const wrapper = script.runInThisContext();
console.error(`# wrapper: type=${typeof wrapper} arity=${wrapper.length} name=${JSON.stringify(wrapper.name)}`);

// 反序列化完成后再开 natives syntax，避免影响 new vm.Script 的 flag 哈希
v8.setFlagsFromString('--allow-natives-syntax');
globalThis.__t = wrapper;

console.error('# --- DebugPrint ---');
try { (0, eval)('%DebugPrint(__t)'); } catch (e) { console.error('# DebugPrint 失败: ' + e.message); }

console.error('# --- DisassembleFunction ---');
try { (0, eval)('%DisassembleFunction(__t)'); } catch (e) { console.error('# Disassemble 失败: ' + e.message); }
