import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: here,
  base: './',
  publicDir: 'public',
  server: {
    port: 5173,
    strictPort: true,
    // 纯浏览器调试时把 /api 转发到本地网关；Electron 内由 preload 的 fetch 钩子接管
    proxy: {
      '/api': { target: 'http://127.0.0.1:8787', changeOrigin: true },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'chrome126',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 8192,
    sourcemap: false,
  },
});
