// 单进程内编译大量样例，借 --print-bytecode 采集 V8 15.2 的 opcode 名与操作数字节数
// 用法：ELECTRON_RUN_AS_NODE=1 梦颜AI.exe --print-bytecode tools/harvest-opcodes.cjs
'use strict';
const vm = require('node:vm');

const samples = [
  'var a = 1; var b = a + 2; a = b * 3 - 1;',
  'if (a) { b(); } else { c(); }',
  'for (var i = 0; i < 3; i++) { x += i; }',
  'while (a) { break; } do { continue; } while (0);',
  'function f(x, y) { return x + y; }',
  'function g() { return arguments.length; }',
  'var o = { k: 1, "s": 2 }; o.k; o.k = 3; delete o.k;',
  'var arr = [1, 2, 3]; arr[0]; arr[1] = 9; arr.length;',
  'try { throw 1; } catch (e) { e; } finally { z; }',
  'switch (a) { case 1: break; case 2: b(); break; default: c(); }',
  'typeof a; void 0; a instanceof Object; "k" in o;',
  'var s = "abc"; s.length; s.slice(1); s.charCodeAt(0);',
  'Math.max(1, 2); new Date(); Object.keys(o);',
  'var f2 = () => 1; var f3 = function () {};',
  'class C { constructor() { this.x = 1; } m() { return 2; } }',
  'const { x } = o; const [y] = arr;',
  'outer: for (;;) { continue outer; }',
  'a?.b?.c; a ?? b; ({ ...o }); [...arr];',
  'function* h() { yield 1; }',
  'let t = Symbol("s"); var big = 1n;',
  'for (const k in o) { k; } for (const v of arr) { v; }',
  'with (o) { k; }',
  'a ? b : c; !a; ~a; a & b; a | b; a ^ b; a << 1; a >>> 1;',
  'this; new.target; super;',
  'debugger;',
  'var re = /x/g; re.test("x");',
  'eval("1"); Function("return 1");',
  'a, b, c;',
  'obj.method(1, 2, 3);',
  'x++; --y; z += 2; z **= 2;',
];

let n = 0;
for (const src of samples) {
  try {
    new vm.Script(src, { filename: `sample${n}.js` });
    n += 1;
  } catch (e) {
    console.error(`# skip sample${n}: ${e.message}`);
  }
}
console.error(`# compiled ${n} samples`);
