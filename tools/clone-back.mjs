#!/usr/bin/env node
/**
 * clone-back.mjs —— 把 recovered/bundles/*.pretty.js 机械还原成 renderer/src 源码工程
 *
 *   node tools/clone-back.mjs              # 从 recovered/ 重新生成 renderer/src
 *   node tools/clone-back.mjs --check      # 只比对：生成结果与现有 renderer/src 是否一致
 *   node tools/clone-back.mjs --icons-only # 只重建 runtime/icons
 *
 * 改写规则（与 docs/RECOVERY.md §3 一致，幂等，可用 --check 验收）：
 *   0. 去掉 __vite__mapDeps 定义块与所有调用参数（含遗留的 ", ))" 悬空实参）
 *   1. 主包尾部 `Eu(yv).use(Ev).mount("#app")` → `export { yv as App, Ev as router, Eu as createApp }`
 *   2. 每个视图顶部显式 `import "../styles/pages/X.css";`
 *   3. 动态 `import("./Home-BE7O8OSv.js")` → `import("../views/Home.js")`
 *   4. 静态 `from "./index-Z8pMLIar.js"` → `from "../runtime/index.js"`；
 *      图标 `from "./sparkles-IALSmIzE.js"` → `from "../runtime/icons/sparkles.js"`；
 *      图标分块文件归位 runtime/icons/<name>.js
 *
 * 覆盖范围：renderer/src/runtime/index.js、runtime/icons/*、views/*。
 * styles/ 不重建（CSS 是抓取的原始文件）。
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '..');
const BUNDLES = path.join(ROOT, 'recovered', 'bundles');
const SRC = path.join(ROOT, 'renderer', 'src');
const RUNTIME_DIR = path.join(SRC, 'runtime');
const VIEWS_DIR = path.join(SRC, 'views');
const ICONS_DIR = path.join(RUNTIME_DIR, 'icons');

const ARGS = new Set(process.argv.slice(2));
const CHECK_ONLY = ARGS.has('--check');
const ICONS_ONLY = ARGS.has('--icons-only');

const ENTRY = 'index-Z8pMLIar';

/** lucide 图标分块（24 个）→ runtime/icons/<name>.js */
const ICONS = {
  'arrow-right-BZScXsqk': 'arrowRight',
  'arrow-up-right-BCjJ20qW': 'arrowUpRight',
  'check-cXlZY8Kx': 'check',
  'chevron-right-380BREwp': 'chevronRight',
  'circle-check-CbnQ6F7H': 'circleCheck',
  'clapperboard-1dbdJ4KK': 'clapperboard',
  'copy-U2ZmXKm8': 'copy',
  'download-BwIkmfjC': 'download',
  'file-text-DUPH4gWx': 'fileText',
  'film-CqI-d0Uy': 'film',
  'layers-CxUe-Vcm': 'layers',
  'loader-circle-D8DmJQ5i': 'loaderCircle',
  'palette-BXq17dSz': 'palette',
  'play-Coduizxi': 'play',
  'plus-BgPWMvVP': 'plus',
  'refresh-cw-C3tpVxsU': 'refreshCw',
  'search-XOsvO7LP': 'search',
  'sparkles-IALSmIzE': 'sparkles',
  'trash-DnaC83vJ': 'trash',
  'triangle-alert-co4mELVU': 'triangleAlert',
  'upload-Df4L1YXZ': 'upload',
  'users-BX-iTuXk': 'users',
  'wand-sparkles-BV7MfZJg': 'wandSparkles',
  'x-DUmRXFcP': 'x'
};

const report = { written: 0, same: 0, diff: [] };

const read = (file) => fs.readFileSync(file, 'utf8');
const norm = (text) => text.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();

function emit(target, content, label) {
  const normalized = norm(content);
  if (CHECK_ONLY) {
    if (fs.existsSync(target) && norm(read(target)) === normalized) report.same += 1;
    else report.diff.push(label || path.relative(ROOT, target));
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (fs.existsSync(target) && norm(read(target)) === normalized) {
    report.same += 1;
    return;
  }
  fs.writeFileSync(target, content, 'utf8');
  report.written += 1;
}

function loadChunkMap() {
  const file = path.join(ROOT, 'recovered', 'chunk-map.json');
  if (!fs.existsSync(file)) throw new Error(`缺少 ${path.relative(ROOT, file)}`);
  return JSON.parse(read(file));
}

/** 去掉 __vite__mapDeps 定义块（`const ... = (... ) => i.map((i) => d[i]);`） */
function stripMapDepsDefinition(code) {
  const start = code.indexOf('const __vite__mapDeps = (');
  if (start === -1) return code;
  const marker = ') => i.map((i) => d[i]);';
  const end = code.indexOf(marker, start);
  if (end === -1) return code;
  let after = end + marker.length;
  if (code[after] === '\n') after += 1;
  return code.slice(0, start) + code.slice(after);
}

/** 去掉所有 `__vite__mapDeps([...])` 调用参数，只保留被包装的表达式 */
function stripMapDepsArgs(code) {
  let out = '';
  let i = 0;
  const token = '__vite__mapDeps([';
  for (;;) {
    const at = code.indexOf(token, i);
    if (at === -1) {
      out += code.slice(i);
      break;
    }
    out += code.slice(i, at);
    let depth = 0;
    let j = at + token.length - 1;
    for (; j < code.length; j += 1) {
      const ch = code[j];
      if (ch === '[') depth += 1;
      else if (ch === ']') {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    let k = j + 1;
    while (k < code.length && /[\s,]/.test(code[k])) k += 1;
    i = k;
  }
  return out;
}

/**
 * 去掉去参后遗留的悬空实参。
 * 只处理"上一行以逗号结尾、本行只剩收尾括号"这一种形态：
 *   args[x],
 * ))          → args[x]))
 */
function dropDanglingArgs(code) {
  let src = code;
  for (let round = 0; round < 4; round += 1) {
    const before = src;
    src = src.replace(/([^\n])\n([ \t]*\)\s*\))/g, (full, prev, closers) =>
      /,\s*$/.test(prev) ? `${prev.replace(/,\s*$/, '')}${closers.trimStart()}` : full
    );
    src = src.replace(/([^\n])\n([ \t]*\)\s*\),)/g, (full, prev, closers) =>
      /,\s*$/.test(prev) ? `${prev.replace(/,\s*$/, '')}${closers.trimStart()}` : full
    );
    src = src.replace(/\n[ \t]*,?\s*\)\s*\),(?=\n)/g, '\n');
    if (src === before) break;
  }
  return src;
}

/**
 * 把 Vite 的预载包装 `Ne(<表达式>, __vite__mapDeps([...]))` 还原成 `<表达式>`。
 * 括号配对扫描，能处理跨行、嵌套括号与尾随逗号。
 */
function unwrapPreloadCalls(code) {
  const open = 'Ne(';
  let out = '';
  let i = 0;
  for (;;) {
    const at = code.indexOf(open, i);
    if (at === -1) {
      out += code.slice(i);
      break;
    }
    const before = code[at - 1];
    // 只处理真正的函数调用位置，避免命中标识符内部
    if (before && /[A-Za-z0-9_$]/.test(before)) {
      out += code.slice(i, at + open.length);
      i = at + open.length;
      continue;
    }
    let depth = 0;
    let j = at + open.length - 1;
    for (; j < code.length; j += 1) {
      const ch = code[j];
      if (ch === '(') depth += 1;
      else if (ch === ')') {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    const args = code.slice(at + open.length, j);
    const depIndex = args.indexOf('__vite__mapDeps(');
    if (depIndex === -1) {
      out += code.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    let first = args.slice(0, depIndex).replace(/,\s*$/, '').trim();
    out += code.slice(i, at) + first;
    i = j + 1;
  }
  return out;
}

/** 重写 chunk 引用：主包 → ../runtime，图标 → ../runtime/icons，页面 → ../views */
function rewriteChunkRefs(code, { viewChunkToName, iconChunkToName, viewName }) {
  let out = code;
  // 静态 import 的主包路径
  out = out.replace(new RegExp(`from\\s*(\"|')\\./${ENTRY}\\.js\\1`, 'g'), 'from "../runtime/index.js"');
  // 页面之间相互 import（如 Works 复用 WorkPublisher 的组件）
  for (const [chunk, name] of Object.entries(viewChunkToName)) {
    if (name === viewName) continue;
    out = out.replace(new RegExp(`from\\s*(\"|')\\./${chunk}\\.js\\1`, 'g'), `from "./${name}.js"`);
  }
  // 图标静态路径
  for (const [chunk, name] of Object.entries(iconChunkToName)) {
    out = out.replace(new RegExp(`from\\s*(\"|')\\./${chunk}\\.js\\1`, 'g'), `from "../runtime/icons/${name}.js"`);
  }
  // 动态 import
  out = out.replace(/import\((["'])\.\/([^"'/]+)\.js\1\)/g, (full, _q, chunk) => {
    const name = viewChunkToName[chunk];
    if (name) return `import("../views/${name}.js")`;
    const icon = iconChunkToName[chunk];
    if (icon) return `import("../runtime/icons/${icon}.js")`;
    return full;
  });
  return out;
}

/** 主包：导出 App/router/createApp，去掉挂载尾句；预载包装 Ne(fn, mapDeps(..)) → fn */
function transformEntry(code, ctx) {
  // 先把 Ne( 的整个实参表连同 mapDeps 一起去掉，避免逐层删参数留下悬空括号
  let out = unwrapPreloadCalls(code);
  out = stripMapDepsDefinition(out);
  out = stripMapDepsArgs(out);
  out = dropDanglingArgs(out);
  out = rewriteChunkRefs(out, ctx);
  out = out.replace(
    /Eu\(yv\)\.use\(Ev\)\.mount\("#app"\);\s*\n/,
    'export { yv as App, Ev as router, Eu as createApp };\n'
  );
  return out;
}

/** 视图：加 CSS 导入 + 重写 chunk 引用（不动括号结构） */
function transformView(code, ctx, viewName) {
  let out = stripMapDepsArgs(code);
  out = rewriteChunkRefs(out, { ...ctx, viewName });
  const cssLine = `import "../styles/pages/${viewName}.css";`;
  if (!out.startsWith(cssLine)) out = `${cssLine}\n${out}`;
  return out;
}

/** 图标分块：主包 import 指向 ../index.js */
function transformIcon(code) {
  return code.replace(/from\s*(["'])\.\/index-[^"']+\.js\1/g, 'from "../index.js"');
}

function main() {
  if (!fs.existsSync(BUNDLES)) throw new Error(`缺少 ${path.relative(ROOT, BUNDLES)}`);
  const chunkMap = loadChunkMap();
  const viewChunkToName = { ...(chunkMap.views || {}) };
  const iconChunkToName = { ...ICONS };
  const ctx = { viewChunkToName, iconChunkToName };

  const files = fs.readdirSync(BUNDLES).filter((f) => f.endsWith('.pretty.js'));
  const used = new Set();
  const runtimeFile = path.join(BUNDLES, `${ENTRY}.pretty.js`);
  if (!fs.existsSync(runtimeFile)) throw new Error(`缺少主包 ${path.relative(ROOT, runtimeFile)}`);
  used.add(ENTRY);

  if (!ICONS_ONLY) {
    emit(path.join(RUNTIME_DIR, 'index.js'), transformEntry(read(runtimeFile), ctx), 'runtime/index.js');
    for (const [chunk, viewName] of Object.entries(viewChunkToName)) {
      const file = path.join(BUNDLES, `${chunk}.pretty.js`);
      if (!fs.existsSync(file)) {
        report.diff.push(`MISSING_CHUNK ${chunk}.pretty.js`);
        continue;
      }
      used.add(chunk);
      emit(path.join(VIEWS_DIR, `${viewName}.js`), transformView(read(file), ctx, viewName), `views/${viewName}.js`);
    }
  }

  for (const [chunk, name] of Object.entries(iconChunkToName)) {
    const file = path.join(BUNDLES, `${chunk}.pretty.js`);
    if (!fs.existsSync(file)) {
      report.diff.push(`MISSING_CHUNK ${chunk}.pretty.js`);
      continue;
    }
    used.add(chunk);
    emit(path.join(ICONS_DIR, `${name}.js`), transformIcon(read(file)), `runtime/icons/${name}.js`);
  }

  const orphans = files.map((f) => f.replace('.pretty.js', '')).filter((c) => !used.has(c));
  console.log(
    `[clone-back] ${CHECK_ONLY ? '比对' : '生成'}完成：写入 ${report.written}，一致 ${report.same}，差异 ${report.diff.length}`
  );
  for (const item of report.diff.slice(0, 30)) console.log(`  DIFF ${item}`);
  if (orphans.length) console.log(`[clone-back] 未映射分块（${orphans.length}）：${orphans.join(', ')}`);
  process.exitCode = CHECK_ONLY && report.diff.length ? 2 : 0;
}

try {
  main();
} catch (error) {
  console.error(`[clone-back] 失败：${error.message}`);
  process.exitCode = 1;
}
