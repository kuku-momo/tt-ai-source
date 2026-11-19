/**
 * dev.mjs —— 一条命令拉起「vite dev server + electron」
 *   npm run dev
 * Electron 会以 AI_CREATION_DEV_URL 指向 vite，热更新直接生效。
 */
import { spawn } from 'node:child_process';
import net from 'node:net';
import process from 'node:process';

const PORT = 5173;
const isWin = process.platform === 'win32';
const npx = isWin ? 'npx.cmd' : 'npx';

function waitPort(port, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const socket = net.connect(port, '127.0.0.1');
      socket.once('connect', () => { socket.destroy(); resolve(); });
      socket.once('error', () => {
        socket.destroy();
        if (Date.now() - start > timeoutMs) reject(new Error('vite 启动超时'));
        else setTimeout(tick, 300);
      });
    };
    tick();
  });
}

const vite = spawn(npx, ['vite', '--config', 'renderer/vite.config.mjs'], {
  stdio: 'inherit',
  shell: isWin,
});

await waitPort(PORT);
console.log(`[dev] vite ready on http://localhost:${PORT}，启动 electron…`);

const electron = spawn(npx, ['electron', '.'], {
  stdio: 'inherit',
  shell: isWin,
  env: { ...process.env, AI_CREATION_DEV_URL: `http://localhost:${PORT}`, AI_CREATION_DEBUG: '1' },
});

const shutdown = () => {
  try { electron.kill(); } catch { /* ignore */ }
  try { vite.kill(); } catch { /* ignore */ }
  process.exit(0);
};
electron.on('exit', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
