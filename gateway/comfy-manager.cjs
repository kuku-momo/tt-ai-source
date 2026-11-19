'use strict';

/**
 * comfy-manager.cjs —— ComfyUI 客户机本地托管
 *
 * 目标：客户机器上不需要预装任何东西，客户端首次用到图像/视频时自动
 *   1. 探测是否已装（user-data/comfyui）
 *   2. 没装就下载便携版 Python + ComfyUI 源码，解压到位
 *   3. 拉起 ComfyUI（只听 127.0.0.1，不对外）
 *   4. 等 /system_stats 就绪后返回本地地址
 *
 * 设计约束：
 *   - 只用 127.0.0.1，端口默认 8188，被占则顺延
 *   - 全部状态在 user-data/comfyui 下，卸载=删目录
 *   - 下载失败重试 3 次；校验 sha256（若提供）
 *   - 不阻塞客户端启动：只在第一次真正需要时调用 ensure()
 */

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const https = require('node:https');
const crypto = require('node:crypto');
const { spawn, spawnSync } = require('node:child_process');

const BASE_PORT = 8188;
const PORT_TRIES = 12;

/* ------------------------------------------------------------------ 工具 */

function log(dir, text) {
  const line = `${new Date().toISOString()} [comfy] ${text}`;
  console.log(line);
  try {
    fs.appendFileSync(path.join(dir, 'comfy.log'), `${line}\n`, 'utf8');
  } catch { /* ignore */ }
}

/** 下载到文件，支持重定向与重试 */
function download(url, dest, { retries = 3, timeoutMs = 60000, onProgress } = {}) {
  const attempt = (left) =>
    new Promise((resolve, reject) => {
      const tmp = `${dest}.part`;
      const file = fs.createWriteStream(tmp);
      const get = (target, hops) => {
        const transport = target.startsWith('https:') ? https : http;
        const req = transport.get(target, { headers: { 'user-agent': 'ai-creation/comfy-manager' } }, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && hops > 0) {
            res.resume();
            const next = new URL(res.headers.location, target).href;
            return get(next, hops - 1);
          }
          if (res.statusCode !== 200) {
            res.resume();
            file.close();
            return reject(new Error(`HTTP ${res.statusCode} ${target}`));
          }
          let received = 0;
          const total = Number(res.headers['content-length']) || 0;
          res.on('data', (chunk) => {
            received += chunk.length;
            if (onProgress && total) onProgress(received, total);
          });
          res.pipe(file);
          file.on('finish', () => file.close(() => resolve(tmp)));
        });
        req.on('error', reject);
        req.setTimeout(timeoutMs, () => req.destroy(new Error('下载超时')));
      };
      get(url, 5);
    }).catch(async (error) => {
      try { fs.rmSync(`${dest}.part`, { force: true }); } catch { /* ignore */ }
      if (left <= 1) throw error;
      await new Promise((r) => setTimeout(r, 1500));
      return attempt(left - 1);
    });

  return attempt(retries).then((tmp) => {
    fs.renameSync(tmp, dest);
    return dest;
  });
}

function sha256File(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

/** 找一个可用端口 */
function freePort(start, tries) {
  for (let p = start; p < start + tries; p += 1) {
    const probe = spawnSync(process.platform === 'win32' ? 'powershell' : 'sh', [], { timeout: 1 });
    void probe;
    try {
      // 用同步 net 探测：创建 server 再关，简单可靠
      const net = require('node:net');
      const srv = new net.Server();
      let free = true;
      srv.once('error', () => { free = false; });
      srv.listen(p, '127.0.0.1');
      srv.close();
      if (free) return p;
    } catch { /* 换下一个 */ }
  }
  return start;
}

/** HTTP GET JSON */
function getJson(url, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
        catch (e) { reject(new Error('响应不是 JSON')); }
      });
    });
    req.on('timeout', () => req.destroy(new Error('超时')));
    req.on('error', reject);
  });
}

async function waitReady(port, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    if (Date.now() > deadline) return false;
    try {
      const info = await getJson(`http://127.0.0.1:${port}/system_stats`, 2500);
      if (info) return true;
    } catch { /* 还没起来 */ }
    await new Promise((r) => setTimeout(r, 1500));
  }
}

/* ------------------------------------------------------------ 安装内容 */

/**
 * 安装清单。
 *
 * ComfyUI 官方给了 Windows 便携包（含 Python + torch），但体积 1.5 GB 起，
 * 且只有 NVIDIA 版。这里的策略：
 *   1. 优先用官方便携包（Windows + NVIDIA）
 *   2. 否则退回「系统 Python + git clone」，要求机器已有 Python 3.10+
 *
 * 具体 URL 写进配置，便于换源（国内走镜像）。
 */
function defaultManifest() {
  return {
    // Windows 官方便携包（NVIDIA）。更新版本时只改这里。
    winPortable: {
      url: 'https://github.com/comfyanonymous/ComfyUI/releases/latest/download/ComfyUI_windows_portable_nvidia.7z',
      file: 'ComfyUI_windows_portable_nvidia.7z',
      sha256: '',
      note: '官方 Windows 便携包（含 Python + CUDA torch）'
    },
    // 通用回退：git clone + 系统 Python
    repo: 'https://github.com/comfyanonymous/ComfyUI.git',
    pipIndex: 'https://pypi.tuna.tsinghua.edu.cn/simple',
    torchIndex: 'https://download.pytorch.org/whl/cu121',
    /**
     * 默认 checkpoint。放在客户端下载，服务器不分担。
     * 有 hf-mirror 与 modelscope 两个源，按顺序尝试。
     */
    checkpoints: [
      {
        name: 'v1-5-pruned-emaonly.safetensors',
        sizeMb: 4000,
        note: 'SD1.5 官方权重，512x512 出图，2–4 GB 显存即可',
        urls: [
          'https://hf-mirror.com/stable-diffusion-v1-5/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors',
          'https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors'
        ]
      }
    ],
    minFreeDiskMb: 12000
  };
}

/* ---------------------------------------------------------------- 管理 */

class ComfyManager {
  constructor(userDataDir) {
    this.root = path.join(userDataDir, 'comfyui');
    this.manifest = defaultManifest();
    this.child = null;
    this.port = BASE_PORT;
    this.installing = false;
    fs.mkdirSync(this.root, { recursive: true });
  }

  get entryDir() {
    return path.join(this.root, 'ComfyUI_windows_portable');
  }

  get comfyDir() {
    return path.join(this.entryDir, 'ComfyUI');
  }

  /** 已安装判定：ComfyUI 目录 + main.py 存在 */
  isInstalled() {
    const candidates = [
      path.join(this.comfyDir, 'main.py'),
      path.join(this.root, 'ComfyUI', 'main.py'),
      path.join(this.root, 'main.py')
    ];
    return candidates.some((p) => fs.existsSync(p));
  }

  resolveMainPy() {
    const candidates = [
      path.join(this.comfyDir, 'main.py'),
      path.join(this.root, 'ComfyUI', 'main.py'),
      path.join(this.root, 'main.py')
    ];
    return candidates.find((p) => fs.existsSync(p)) || null;
  }

  /** 找便携包里的 python */
  resolvePython() {
    const candidates = [
      path.join(this.entryDir, 'python_embeded', 'python.exe'),
      path.join(this.root, 'python_embeded', 'python.exe')
    ];
    const found = candidates.find((p) => fs.existsSync(p));
    if (found) return { exe: found, embeded: true };
    // 回退到系统 python
    const probe = spawnSync(process.platform === 'win32' ? 'python' : 'python3', ['-V'], { encoding: 'utf8' });
    if (probe.status === 0) return { exe: process.platform === 'win32' ? 'python' : 'python3', embeded: false };
    return null;
  }

  /** 已装 ComfyUI 是否在跑（端口探测） */
  async isRunning() {
    for (let p = BASE_PORT; p < BASE_PORT + PORT_TRIES; p += 1) {
      try {
        await getJson(`http://127.0.0.1:${p}/system_stats`, 1200);
        this.port = p;
        return true;
      } catch { /* 下一个 */ }
    }
    return false;
  }

  status() {
    return {
      installed: this.isInstalled(),
      running: Boolean(this.child && !this.child.killed),
      port: this.port,
      root: this.root,
      python: this.resolvePython()?.exe || null,
      mainPy: this.resolveMainPy(),
      checkpoints: this.listCheckpoints(),
      checkpointDir: this.checkpointsDir,
      freeDiskMb: this.freeDiskMb()
    };
  }

  /** ComfyUI 的 checkpoints 目录 */
  get checkpointsDir() {
    return path.join(path.dirname(this.resolveMainPy() || path.join(this.root, 'ComfyUI', 'main.py')), 'models', 'checkpoints');
  }

  /** 已存在的 checkpoint 文件 */
  listCheckpoints() {
    const dir = this.checkpointsDir;
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((f) => /\.(safetensors|ckpt|pt|bin)$/i.test(f));
  }

  /** 磁盘余量（MB） */
  freeDiskMb() {
    try {
      // Node 18+ 有 statfs；Windows 上返回卷信息
      const st = fs.statfsSync(this.root);
      return Math.floor((st.bavail * st.bsize) / 1048576);
    } catch {
      return Number.MAX_SAFE_INTEGER;
    }
  }

  /**
   * 确保至少有一个 checkpoint；没有就按 manifest 下载。
   * 只下载到客户机本地，服务器不参与。
   */
  async ensureCheckpoints(notify) {
    const existing = this.listCheckpoints();
    if (existing.length) {
      notify(`已有 checkpoint：${existing[0]}`);
      return { ok: true, file: existing[0] };
    }

    const list = this.manifest.checkpoints || [];
    if (!list.length) return { ok: false, message: 'manifest 未配置 checkpoint' };

    const need = list[0];
    const freeMb = this.freeDiskMb();
    if (freeMb < (this.manifest.minFreeDiskMb || 12000)) {
      return {
        ok: false,
        message: `磁盘余量不足：剩 ${freeMb} MB，下载模型至少需要 ${this.manifest.minFreeDiskMb} MB`
      };
    }

    const dir = this.checkpointsDir;
    fs.mkdirSync(dir, { recursive: true });
    const target = path.join(dir, need.name);

    let lastError = null;
    for (const url of need.urls) {
      try {
        notify(`下载模型 ${need.name}（约 ${Math.round(need.sizeMb / 1024)} GB）：${url}`);
        let lastShown = -10;
        await download(url, target, {
          retries: 2,
          timeoutMs: 300000,
          onProgress: (got, total) => {
            const pct = Math.floor((got / total) * 100);
            if (pct >= lastShown + 10) {
              lastShown = pct - (pct % 10);
              notify(`模型下载 ${pct}%（${(got / 1048576).toFixed(0)} / ${(total / 1048576).toFixed(0)} MB）`);
            }
          }
        });
        const size = fs.statSync(target).size;
        if (size < 10 * 1048576) {
          fs.rmSync(target, { force: true });
          throw new Error(`文件过小（${size} 字节），源可能返回了错误页`);
        }
        notify(`模型就绪：${need.name}（${(size / 1048576).toFixed(0)} MB）`);
        return { ok: true, file: need.name };
      } catch (error) {
        lastError = error;
        notify(`源失败，换下一个：${error.message}`);
      }
    }
    return { ok: false, message: `全部源都失败：${lastError ? lastError.message : '未知'}` };
  }

  /**
   * 确保可用：已装→直接起；没装→先装再起。
   * @param {(msg:string)=>void} progress 进度回调
   */
  async ensure(progress) {
    const notify = progress || ((m) => log(this.root, m));

    if (await this.isRunning()) {
      notify(`ComfyUI 已在 127.0.0.1:${this.port} 运行`);
      const ck = await this.ensureCheckpoints(notify);
      return { ok: true, port: this.port, url: `http://127.0.0.1:${this.port}`, checkpoint: ck.ok ? ck.file : null, modelError: ck.ok ? null : ck.message };
    }

    if (!this.isInstalled()) {
      const installed = await this.install(notify);
      if (!installed.ok) return installed;
    }

    const ck = await this.ensureCheckpoints(notify);
    if (!ck.ok) {
      return { ok: false, message: `模型未就绪：${ck.message}` };
    }

    const started = await this.start(notify);
    if (started.ok) started.checkpoint = ck.file;
    return started;
  }

  /** 安装：Windows 用官方便携包；其它平台用 git + pip */
  async install(notify) {
    if (this.installing) return { ok: false, message: '安装已在进行中' };
    this.installing = true;
    try {
      if (process.platform === 'win32') {
        return await this.installWindowsPortable(notify);
      }
      return await this.installFromSource(notify);
    } catch (error) {
      notify(`安装失败：${error.message}`);
      return { ok: false, message: error.message };
    } finally {
      this.installing = false;
    }
  }

  async installWindowsPortable(notify) {
    const { url, file, sha256 } = this.manifest.winPortable;
    const target = path.join(this.root, file);

    if (!fs.existsSync(target)) {
      notify(`开始下载 ComfyUI 便携包（约 1.5 GB）：${url}`);
      let lastShown = 0;
      await download(url, target, {
        retries: 3,
        timeoutMs: 120000,
        onProgress: (got, total) => {
          const pct = Math.floor((got / total) * 100);
          if (pct >= lastShown + 10) {
            lastShown = pct - (pct % 10);
            notify(`下载中 ${pct}%（${(got / 1048576).toFixed(0)} / ${(total / 1048576).toFixed(0)} MB）`);
          }
        }
      });
      if (sha256) {
        const actual = sha256File(target);
        if (actual.toLowerCase() !== sha256.toLowerCase()) {
          fs.rmSync(target, { force: true });
          throw new Error(`校验失败：期望 ${sha256}，实际 ${actual}`);
        }
      }
    }

    // 7z 解压：优先用系统 7z / tar（Win10+ 自带 bsdtar 支持 7z 不完整），
    // 没有就用 PowerShell 的 Expand-Archive（仅 zip）→ 最终回退到内置解压实现
    notify('解压中…');
    const outDir = this.root;
    const sevenZip = ['C:\\Program Files\\7-Zip\\7z.exe', 'C:\\Program Files (x86)\\7-Zip\\7z.exe']
      .find((p) => fs.existsSync(p));
    if (sevenZip) {
      const r = spawnSync(sevenZip, ['x', '-y', `-o${outDir}`, target], { stdio: 'inherit' });
      if (r.status !== 0) throw new Error('7z 解压失败');
    } else {
      // bsdtar（Windows 10 1803+ 自带）
      const r = spawnSync('tar', ['-xf', target, '-C', outDir], { stdio: 'inherit' });
      if (r.status !== 0) {
        throw new Error(
          '缺少解压工具：请安装 7-Zip，或手动把便携包解压到 ' + outDir
        );
      }
    }

    if (!this.isInstalled()) {
      return { ok: false, message: '解压完成但未找到 ComfyUI/main.py，请检查包结构' };
    }
    notify('安装完成');
    return { ok: true };
  }

  async installFromSource(notify) {
    if (!this.resolvePython()) {
      return { ok: false, message: '未检测到 Python 3.10+，无法安装 ComfyUI' };
    }
    const dir = path.join(this.root, 'ComfyUI');
    if (!fs.existsSync(path.join(dir, 'main.py'))) {
      notify('克隆 ComfyUI 源码…');
      const r = spawnSync('git', ['clone', '--depth', '1', this.manifest.repo, dir], { stdio: 'inherit' });
      if (r.status !== 0) throw new Error('git clone 失败（需要已安装 git）');
    }
    const py = this.resolvePython();
    notify('安装依赖（torch + requirements）…');
    const pip1 = spawnSync(py.exe, ['-m', 'pip', 'install', '--upgrade', 'pip',
      'torch', 'torchvision', 'torchaudio', '--index-url', this.manifest.torchIndex], { stdio: 'inherit' });
    if (pip1.status !== 0) throw new Error('torch 安装失败');
    const pip2 = spawnSync(py.exe, ['-m', 'pip', 'install', '-r',
      path.join(dir, 'requirements.txt'), '-i', this.manifest.pipIndex], { stdio: 'inherit' });
    if (pip2.status !== 0) throw new Error('requirements 安装失败');
    notify('安装完成');
    return { ok: true };
  }

  /** 启动 ComfyUI，只听 127.0.0.1 */
  async start(notify) {
    if (this.child && !this.child.killed) {
      return { ok: true, port: this.port, url: `http://127.0.0.1:${this.port}` };
    }
    const py = this.resolvePython();
    const mainPy = this.resolveMainPy();
    if (!py || !mainPy) return { ok: false, message: 'ComfyUI 未安装完整' };

    this.port = freePort(BASE_PORT, PORT_TRIES);
    const args = ['-s', mainPy, '--listen', '127.0.0.1', '--port', String(this.port), '--disable-auto-launch'];
    notify(`启动 ComfyUI：${py.exe} ${args.join(' ')}`);

    this.child = spawn(py.exe, args, {
      cwd: path.dirname(mainPy),
      env: { ...process.env, PYTHONUNBUFFERED: '1' },
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true
    });
    this.child.stdout?.on('data', (d) => log(this.root, `stdout ${String(d).trimEnd()}`));
    this.child.stderr?.on('data', (d) => log(this.root, `stderr ${String(d).trimEnd()}`));
    this.child.on('exit', (code) => {
      log(this.root, `ComfyUI 退出 code=${code}`);
      this.child = null;
    });

    const ready = await waitReady(this.port, 180000);
    if (!ready) {
      return { ok: false, message: `ComfyUI 180 秒内未就绪（端口 ${this.port}），详见 comfy.log` };
    }
    notify(`ComfyUI 就绪：http://127.0.0.1:${this.port}`);
    return { ok: true, port: this.port, url: `http://127.0.0.1:${this.port}` };
  }

  stop() {
    if (this.child && !this.child.killed) {
      this.child.kill();
      this.child = null;
    }
  }
}

module.exports = { ComfyManager };
