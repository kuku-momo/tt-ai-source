#!/usr/bin/env node
/**
 * install-agent-deps.mjs —— 给 doubao-agent 装它自己那份 playwright-core
 *
 *   node tools/install-agent-deps.mjs           # 装（已存在则跳过）
 *   node tools/install-agent-deps.mjs --force   # 强制重装
 *   node tools/install-agent-deps.mjs --check   # 只检查，不装
 *
 * 为什么单独装：doubao-agent/browser.js:179 把默认解析路径写死成
 * doubao-agent/node_modules/playwright-core（可用 DOUBAO_PLAYWRIGHT_PATH 覆盖），
 * 根目录的 npm install 不会把依赖铺到子包，所以由本脚本在子包目录里执行 npm install。
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '..');
const AGENT_DIR = path.join(ROOT, 'doubao-agent');
const TARGET = path.join(AGENT_DIR, 'node_modules', 'playwright-core', 'package.json');

const ARGS = new Set(process.argv.slice(2));
const FORCE = ARGS.has('--force');
const CHECK = ARGS.has('--check');

function installedVersion() {
  try {
    return JSON.parse(fs.readFileSync(TARGET, 'utf8')).version;
  } catch {
    return null;
  }
}

function npmCommand() {
  // Windows 上 npm 是 npm.cmd，需要 shell 才能被 execFile 找到
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

const current = installedVersion();
if (CHECK) {
  console.log(current ? `playwright-core 已安装：${current}` : 'playwright-core 未安装（doubao-agent/node_modules 缺失）');
  process.exitCode = current ? 0 : 2;
} else if (current && !FORCE) {
  console.log(`playwright-core 已存在（${current}），跳过。需要重装加 --force。`);
} else {
  if (!fs.existsSync(path.join(AGENT_DIR, 'package.json'))) {
    console.error(`缺少 ${path.relative(ROOT, path.join(AGENT_DIR, 'package.json'))}`);
    process.exit(1);
  }
  console.log(`在 ${path.relative(ROOT, AGENT_DIR)} 内执行 npm install …`);
  const result = spawnSync(npmCommand(), ['install', '--omit=dev', '--no-audit', '--no-fund'], {
    cwd: AGENT_DIR,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (result.status !== 0) {
    console.error(`npm install 失败，退出码 ${result.status}`);
    console.error('可手动执行：cd doubao-agent && npm install playwright-core@1.63.0');
    process.exit(result.status || 1);
  }
  const after = installedVersion();
  console.log(after ? `完成：playwright-core ${after}` : '完成，但未能读到版本号');
}
