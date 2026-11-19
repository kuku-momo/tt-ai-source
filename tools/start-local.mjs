/**
 * start-local.mjs —— 离线运行「本地渲染器」形态
 *   npm run start:local
 * 先确保 renderer/dist 存在（没有就自动 vite build），再以 AI_CREATION_LOAD=local 启动 Electron。
 * 此时页面来自本地 dist，业务接口走本地网关 127.0.0.1:8787，授权走离线卡密。
 */
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const isWin = process.platform === 'win32';
const npx = isWin ? 'npx.cmd' : 'npx';
const dist = path.join(process.cwd(), 'renderer', 'dist', 'index.html');

if (!fs.existsSync(dist)) {
  console.log('[local] 未找到 renderer/dist，先执行构建…');
  const build = spawnSync(npx, ['vite', 'build', '--config', 'renderer/vite.config.mjs'], {
    stdio: 'inherit',
    shell: isWin,
  });
  if (build.status !== 0) process.exit(build.status || 1);
}

const child = spawn(npx, ['electron', '.'], {
  stdio: 'inherit',
  shell: isWin,
  env: { ...process.env, AI_CREATION_LOAD: 'local' },
});
child.on('exit', (code) => process.exit(code ?? 0));
