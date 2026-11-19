#!/usr/bin/env node
/**
 * build-v158-crack.mjs —— 从官方 v1.5.8 客户端包生成「去授权」可运行目录
 *
 *   node tools/build-v158-crack.mjs [官方解包目录] [输出目录]
 *   bun  tools/build-v158-crack.mjs
 *
 * 官方包默认位置：D:\Backup\Downloads\ai-158\unpacked\AI-Creation-Windows-v1.5.8
 * 输出默认：<repo>/dist/AI-Creation-v1.5.8-local
 *
 * 做的事：
 *   1. 复制官方运行目录（exe / dll / locales / resources 骨架）
 *   2. 解出官方 resources/app.asar，把 preload.cjs 换成 v158/preload.cjs（授权拦截 + 网关改道）
 *      再原样打回 —— .compiled 下的 V8 字节码与元数据不动，所以授权判定链路只剩 SPA 侧
 *   3. 灌入 resources/gateway/（本地 API 网关 + 卡密内核）
 *   4. 放入 launcher.ps1 与 启动.cmd（先起网关再起客户端）
 *
 * 官方包里的字节码受 process.versions.v8 / modules / arch 三重校验，
 * 因此必须用官方 exe 运行，不能用别的 Electron 版本替换。
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const asar = require('@electron/asar');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

const OFFICIAL = process.argv[2] || 'D:\\Backup\\Downloads\\ai-158\\unpacked\\AI-Creation-Windows-v1.5.8';
const OUT = process.argv[3] || path.join(ROOT, 'dist', 'AI-Creation-v1.5.8-local');

const CRACK_PRELOAD = path.join(ROOT, 'v158', 'preload.cjs');
const LAUNCHER = path.join(ROOT, 'v158', 'launcher.ps1');
const LAUNCHER_CMD = path.join(ROOT, 'v158', '启动.cmd');
const GATEWAY_DIR = path.join(ROOT, 'gateway');
const LICENSE_CORE = path.join(ROOT, 'electron', 'license-core.cjs');

const SKIP = new Set(['user-data', 'lockfile', 'SingletonLock', 'DevToolsActivePort']);

function rimraf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function copyTree(src, dest) {
  const st = fs.lstatSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const e of fs.readdirSync(src, { withFileTypes: true })) {
      if (SKIP.has(e.name)) continue;
      copyTree(path.join(src, e.name), path.join(dest, e.name));
    }
    return;
  }
  if (st.isSymbolicLink()) return;
  fs.copyFileSync(src, dest);
}

function assertFile(p, label) {
  if (!fs.existsSync(p)) throw new Error(`缺少${label}：${p}`);
}

async function main() {
  assertFile(OFFICIAL, '官方解包目录');
  assertFile(path.join(OFFICIAL, 'resources', 'app.asar'), '官方 app.asar');
  assertFile(CRACK_PRELOAD, '破解 preload');
  assertFile(LAUNCHER, '启动器 launcher.ps1');
  assertFile(LAUNCHER_CMD, '启动器 启动.cmd');
  assertFile(path.join(GATEWAY_DIR, 'ai-gateway.cjs'), '网关 ai-gateway.cjs');
  assertFile(LICENSE_CORE, '卡密内核 license-core.cjs');

  console.log(`==> 1/4 复制官方运行目录\n    ${OFFICIAL}\n -> ${OUT}`);
  rimraf(OUT);
  copyTree(OFFICIAL, OUT);

  console.log('==> 2/4 替换 app.asar 内的 preload.cjs');
  const resDir = path.join(OUT, 'resources');
  const asarPath = path.join(resDir, 'app.asar');
  const stage = path.join(OUT, '.asar-stage');
  rimraf(stage);
  asar.extractAll(asarPath, stage);

  // 校验官方包里确实是我们认识的结构
  const compiledMeta = path.join(stage, '.compiled', 'main.json');
  assertFile(compiledMeta, '官方字节码元数据 .compiled/main.json');
  const meta = JSON.parse(fs.readFileSync(compiledMeta, 'utf8'));

  fs.copyFileSync(CRACK_PRELOAD, path.join(stage, 'preload.cjs'));
  rimraf(asarPath);
  await asar.createPackage(stage, asarPath);
  rimraf(stage);

  console.log(`    字节码目标：v8=${meta.v8} modules=${meta.modules} arch=${meta.arch}`);
  console.log(`    app.asar = ${(fs.statSync(asarPath).size / 1024).toFixed(1)} KB`);

  console.log('==> 3/4 灌入本地网关');
  const gwOut = path.join(resDir, 'gateway');
  rimraf(gwOut);
  fs.mkdirSync(gwOut, { recursive: true });
  for (const f of ['ai-gateway.cjs', 'routes-extra.cjs', 'routes-admin.cjs']) {
    fs.copyFileSync(path.join(GATEWAY_DIR, f), path.join(gwOut, f));
  }
  fs.copyFileSync(LICENSE_CORE, path.join(gwOut, 'license-core.cjs'));

  console.log('==> 4/4 放入启动器');
  fs.copyFileSync(LAUNCHER, path.join(OUT, 'launcher.ps1'));
  fs.copyFileSync(LAUNCHER_CMD, path.join(OUT, '启动.cmd'));

  const exe = fs.readdirSync(OUT).find((n) => n.toLowerCase().endsWith('.exe'));
  console.log(`\n完成：${OUT}`);
  console.log(`  客户端 exe : ${exe || '(未找到)'}`);
  console.log(`  app.asar   : ${(fs.statSync(asarPath).size / 1024).toFixed(1)} KB`);
  console.log(`  gateway    : ${fs.readdirSync(gwOut).length} 个文件`);
  console.log('\n启动方式：双击「启动.cmd」（先起网关 127.0.0.1:8787，再起客户端）');
}

main().catch((error) => {
  console.error(`[build-v158] 失败：${error.message}`);
  process.exit(1);
});
