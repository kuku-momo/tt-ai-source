'use strict';

/**
 * comfy-client.cjs —— 调用本机 ComfyUI 出图/出视频
 *
 * 只在客户机真正点「生成」并且启用了本地引擎时才走这里。
 * 流程：POST /prompt 提交工作流 → 轮询 /history/<id> → GET /view 取文件 → 落本地
 *
 * 依赖 comfy-manager 提供的 base url（http://127.0.0.1:<port>）。
 */

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const crypto = require('node:crypto');

/* ------------------------------------------------------------------ 基础 */

function requestJson(url, { method = 'GET', body = null, timeoutMs = 30000 } = {}) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const payload = body === null ? null : Buffer.from(JSON.stringify(body), 'utf8');
    const req = http.request(
      target,
      {
        method,
        headers: payload
          ? { 'content-type': 'application/json', 'content-length': payload.length }
          : {}
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8');
          let json = null;
          try { json = JSON.parse(text); } catch { /* 非 JSON */ }
          if ((res.statusCode || 0) >= 400) {
            const msg = (json && (json.error || json.message)) || text.slice(0, 300);
            return reject(new Error(`ComfyUI ${res.statusCode}: ${msg}`));
          }
          resolve(json === null ? text : json);
        });
      }
    );
    req.setTimeout(timeoutMs, () => req.destroy(new Error('ComfyUI 请求超时')));
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function requestBuffer(url, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode || 0, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    req.on('timeout', () => req.destroy(new Error('ComfyUI 下载超时')));
    req.on('error', reject);
  });
}

/* -------------------------------------------------------------- 工作流 */

/**
 * 文生图基础工作流（ComfyUI API 格式）
 * 节点号沿用常见模板，class_type 与官方节点一致。
 */
function txt2imgWorkflow({ prompt, negative = '', width = 512, height = 512, steps = 20, cfg = 7, seed = null, ckpt, batch = 1, prefix = 'ai-creation' }) {
  const actualSeed = seed === null || seed === undefined ? Math.floor(Math.random() * 2 ** 32) : Number(seed);
  return {
    3: {
      class_type: 'KSampler',
      inputs: {
        seed: actualSeed,
        steps: Number(steps) || 20,
        cfg: Number(cfg) || 7,
        sampler_name: 'euler',
        scheduler: 'normal',
        denoise: 1,
        model: ['4', 0],
        positive: ['6', 0],
        negative: ['7', 0],
        latent_image: ['5', 0]
      }
    },
    4: { class_type: 'CheckpointLoaderSimple', inputs: { ckpt_name: ckpt } },
    5: { class_type: 'EmptyLatentImage', inputs: { width: Number(width) || 512, height: Number(height) || 512, batch_size: Math.max(1, Math.min(4, Number(batch) || 1)) } },
    6: { class_type: 'CLIPTextEncode', inputs: { text: String(prompt || ''), clip: ['4', 1] } },
    7: { class_type: 'CLIPTextEncode', inputs: { text: String(negative || ''), clip: ['4', 1] } },
    8: { class_type: 'VAEDecode', inputs: { samples: ['3', 0], vae: ['4', 2] } },
    9: { class_type: 'SaveImage', inputs: { filename_prefix: prefix, images: ['8', 0] } }
  };
}

/* ------------------------------------------------------------ 客户端 */

class ComfyClient {
  constructor(baseUrl, { dataDir } = {}) {
    this.base = String(baseUrl || '').replace(/\/$/, '');
    this.dataDir = dataDir || null;
    this.clientId = crypto.randomBytes(8).toString('hex');
  }

  setBase(url) {
    this.base = String(url || '').replace(/\/$/, '');
  }

  /** 引擎信息：版本 + 可用 checkpoint（用于判断能不能直接出图） */
  async info() {
    const stats = await requestJson(`${this.base}/system_stats`, { timeoutMs: 5000 });
    let checkpoints = [];
    try {
      const obj = await requestJson(`${this.base}/object_info/CheckpointLoaderSimple`, { timeoutMs: 8000 });
      const node = obj && obj.CheckpointLoaderSimple;
      const list = node && node.input && node.input.required && node.input.required.ckpt_name;
      if (Array.isArray(list) && Array.isArray(list[0])) checkpoints = list[0];
    } catch { /* 取不到就当空 */ }
    return {
      base: this.base,
      system: stats,
      checkpoints,
      devices: (stats && stats.devices) || []
    };
  }

  /** 提交任务，返回 prompt_id */
  async submit(workflow) {
    const res = await requestJson(`${this.base}/prompt`, {
      method: 'POST',
      body: { prompt: workflow, client_id: this.clientId },
      timeoutMs: 30000
    });
    if (res && res.node_errors && Object.keys(res.node_errors).length) {
      throw new Error(`工作流校验失败：${JSON.stringify(res.node_errors).slice(0, 300)}`);
    }
    if (!res || !res.prompt_id) throw new Error('ComfyUI 未返回 prompt_id');
    return res.prompt_id;
  }

  /** 轮询直到完成，返回输出文件描述数组 */
  async wait(promptId, { intervalMs = 1500, timeoutMs = 600000, onProgress } = {}) {
    const deadline = Date.now() + timeoutMs;
    let lastTick = 0;
    for (;;) {
      if (Date.now() > deadline) throw new Error(`ComfyUI 任务超时（${promptId}）`);
      await new Promise((r) => setTimeout(r, intervalMs));
      let hist;
      try {
        hist = await requestJson(`${this.base}/history/${encodeURIComponent(promptId)}`, { timeoutMs: 8000 });
      } catch { continue; }
      const entry = hist && hist[promptId];
      if (!entry) {
        if (onProgress && Date.now() - lastTick > 5000) { lastTick = Date.now(); onProgress('queued'); }
        continue;
      }
      if (entry.status && entry.status.status_str === 'error') {
        throw new Error(`ComfyUI 执行出错：${JSON.stringify(entry.status).slice(0, 300)}`);
      }
      const outputs = entry.outputs || {};
      const files = [];
      for (const nodeId of Object.keys(outputs)) {
        const node = outputs[nodeId];
        for (const key of ['images', 'videos', 'gifs']) {
          if (Array.isArray(node[key])) {
            for (const f of node[key]) files.push({ ...f, kind: key });
          }
        }
      }
      if (files.length) return files;
      if (entry.status && entry.status.completed) return [];
    }
  }

  /** 取输出文件，返回本地绝对路径 */
  async download(file, outDir) {
    const q = new URLSearchParams({
      filename: file.filename,
      subfolder: file.subfolder || '',
      type: file.type || 'output'
    });
    const res = await requestBuffer(`${this.base}/view?${q.toString()}`);
    if (res.status !== 200 || !res.body.length) {
      throw new Error(`取文件失败：${file.filename} HTTP ${res.status}`);
    }
    fs.mkdirSync(outDir, { recursive: true });
    const safe = path.basename(file.filename);
    const target = path.join(outDir, safe);
    fs.writeFileSync(target, res.body);
    return target;
  }

  /** 一步到位：提交 → 等待 → 下载，返回本地路径数组 */
  async run(workflow, { outDir, timeoutMs, onProgress } = {}) {
    const promptId = await this.submit(workflow);
    const files = await this.wait(promptId, { timeoutMs, onProgress });
    const saved = [];
    for (const f of files) {
      saved.push(await this.download(f, outDir));
    }
    return { promptId, files: saved };
  }
}

module.exports = { ComfyClient, txt2imgWorkflow };
