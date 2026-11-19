'use strict';

/**
 * routes-extra.cjs —— 本地网关的业务路由扩展（[LOCAL] 新增）
 *
 * ai-gateway.cjs 只保留上游原有的授权/设置/视频/短剧/上传路由，
 * 这里补齐还原出来的前端真正会调用的其它接口，让本地模式下每个页面都能跑通：
 *
 *   /api/chat/*                    对话（本地回声模型；配置了上游 apiKey 则真转发）
 *   /api/draw/*                    绘画（生成占位 SVG，可下载）
 *   /api/works*                    作品广场（本地 JSON 库）
 *   /api/tasks                     任务记录聚合（draw + video + drama）
 *   /api/remake-workshop/*         短剧重制
 *   /api/drama-commerce/*          电商短剧（识图返回占位分析）
 *   /api/script-tools/*            剧本工具文档
 *   /api/uploads/oss/image         图片上传（落盘后可回读）
 *   /api/doubao-agent/*            豆包助手账号/配对（本地台账）
 *
 * 设计约定：所有路由都返回前端实际解构的字段名，宁可少字段也不返回错类型。
 */

const fs = require('node:fs');
const path = require('node:path');
const { callUpstream } = require('./upstream-custom.cjs');
const { ComfyClient, txt2imgWorkflow } = require('./comfy-client.cjs');

// ComfyUI 客户端：base 在首次 ensure 后由 ctx 注入
const comfyClient = new ComfyClient('', {});
const http = require('node:http');
const https = require('node:https');
const crypto = require('node:crypto');

const DATA_DIR = process.env.AI_GATEWAY_DATA_DIR || path.join(process.cwd(), 'data');

function id(prefix) {
  return `${prefix}_${Date.now().toString(36)}${crypto.randomBytes(3).toString('hex')}`;
}
function now() {
  return new Date().toISOString();
}
// 前端用 Number(id) 比较会话，必须给纯数字字符串，否则 NaN === NaN 为 false，
// 会导致流式内容不显示、生成状态永不复位（UI 卡在"生成中"）。
let seqCounter = 0;
function numericId() {
  seqCounter = (seqCounter + 1) % 100000;
  return String(Date.now() * 100 + seqCounter);
}
function ensure(db, key, initial) {
  if (!Array.isArray(db[key])) db[key] = initial;
  return db[key];
}

/* -------------------------------------------------------------- 占位图生成 */

function svgCard(text, size) {
  const [w, h] = String(size || '1024x1024')
    .split('x')
    .map((n) => Math.max(64, Math.min(2048, Number(n) || 1024)));
  const hue = (text.length * 37) % 360;
  const safe = String(text || '本地演示').slice(0, 120).replace(/[<>&]/g, '');
  const lines = [];
  for (let i = 0; i < safe.length && lines.length < 4; i += 22) lines.push(safe.slice(i, i + 22));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="hsl(${hue},68%,22%)"/><stop offset="100%" stop-color="hsl(${(hue + 60) % 360},72%,10%)"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  ${lines.map((line, i) => `<text x="50%" y="${h / 2 + (i - lines.length / 2) * 42}" fill="#e8eef7" font-family="sans-serif" font-size="${Math.round(w / 26)}" text-anchor="middle">${line}</text>`).join('\n  ')}
  <text x="50%" y="${h - 28}" fill="#8fa3bd" font-family="sans-serif" font-size="${Math.round(w / 40)}" text-anchor="middle">local gateway placeholder ${w}x${h}</text>
</svg>`;
}

function dataUri(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
}

/* ------------------------------------------------------------- 上游转发 */

function forwardChat(settings, payload, onDelta, onDone, onError) {
  const base = String(settings.apiBase || '').replace(/\/$/, '');
  if (!base || !settings.apiKey) return false;
  let target;
  try {
    target = new URL(`${base}/chat/completions`);
  } catch {
    return false;
  }
  const body = Buffer.from(
    JSON.stringify({ model: payload.model, messages: payload.messages, stream: true }),
    'utf8'
  );
  const transport = target.protocol === 'https:' ? https : http;
  const req = transport.request(
    target,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': body.length,
        authorization: `Bearer ${settings.apiKey}`,
      },
    },
    (res) => {
      if (res.statusCode !== 200) {
        let text = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (text += c));
        res.on('end', () => onError(new Error(`上游 ${res.statusCode}: ${text.slice(0, 200)}`)));
        return;
      }
      let buf = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        buf += chunk;
        let idx;
        while ((idx = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, idx).trim();
          buf = buf.slice(idx + 1);
          if (!line.startsWith('data:')) continue;
          const payloadText = line.slice(5).trim();
          if (payloadText === '[DONE]') continue;
          try {
            const parsed = JSON.parse(payloadText);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) onDelta(delta);
          } catch {
            /* 忽略心跳/半包 */
          }
        }
      });
      res.on('end', () => onDone());
    }
  );
  req.setTimeout(120000, () => req.destroy(new Error('上游超时')));
  req.on('error', onError);
  req.end(body);
  return true;
}

/* ---------------------------------------------------------------- 主入口 */

async function handle(ctx) {
  const { req, res, pathname, method, origin, db, saveDb, log, send, readJson, readBody, demoBase, comfy } = ctx;

  const j = (status, data) => {
    send(res, status, data, origin);
    return true;
  };

  /* ------------------------------------------------------------- 对话 */
  if (pathname === '/api/chat/models' && method === 'GET') {
    const models = [
      { id: 'local-echo', name: '本地回声模型（离线占位）', provider: 'local' },
      { id: 'local-coach', name: '本地编剧助手（离线占位）', provider: 'local' },
    ];
    if (db.settings?.apiKey) models.unshift({ id: db.settings.model || 'upstream', name: '上游模型（已配置 Key）', provider: 'upstream' });
    return j(200, { ok: true, models });
  }

  if (pathname === '/api/chat/sessions') {
    const sessions = ensure(db, 'chatSessions', []);
    if (method === 'GET') return j(200, { ok: true, sessions });
    if (method === 'POST') {
      const body = await readJson(req);
      const session = {
        id: numericId(),
        title: String(body.title || '新对话').slice(0, 60),
        model: body.model || 'local-echo',
        generation_status: 'idle',
        created_at: now(),
        updated_at: now(),
      };
      sessions.unshift(session);
      db.chatMessages = db.chatMessages || {};
      db.chatMessages[session.id] = [];
      saveDb();
      return j(200, { ok: true, id: session.id, session });
    }
  }

  const chatSessionMatch = /^\/api\/chat\/sessions\/([^/]+)(\/messages)?$/.exec(pathname);
  if (chatSessionMatch) {
    const sid = decodeURIComponent(chatSessionMatch[1]);
    const sessions = ensure(db, 'chatSessions', []);
    const session = sessions.find((s) => s.id === sid);
    db.chatMessages = db.chatMessages || {};
    const messages = ensure(db.chatMessages, sid, []);
    if (method === 'GET' && chatSessionMatch[2]) {
      if (!session) return j(404, { ok: false, msg: '对话不存在' });
      return j(200, { ok: true, session, messages });
    }
    if (method === 'DELETE') {
      db.chatSessions = sessions.filter((s) => s.id !== sid);
      delete db.chatMessages[sid];
      saveDb();
      return j(200, { ok: true });
    }
  }

  if (pathname === '/api/chat/completions' && method === 'POST') {
    const body = await readJson(req);
    const sessions = ensure(db, 'chatSessions', []);
    db.chatMessages = db.chatMessages || {};
    let session = sessions.find((s) => s.id === body.session_id);
    if (!session) {
      session = {
        id: numericId(),
        title: String(body.prompt || '新对话').slice(0, 20),
        model: body.model || 'local-echo',
        created_at: now(),
      };
      sessions.unshift(session);
    }
    const messages = ensure(db.chatMessages, session.id, []);
    const userMessage = {
      id: id('msg'),
      role: 'user',
      content: String(body.prompt || ''),
      attachments_json: JSON.stringify(body.images || []),
      model: body.model || session.model,
      created_at: now(),
    };
    messages.push(userMessage);
    session.generation_status = 'running';
    session.updated_at = now();
    saveDb();

    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-store',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
      ...ctx.corsHeaders(origin),
    });
    const emit = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);
    emit({ type: 'started', session_id: session.id });

    const finish = (content, failed) => {
      messages.push({
        id: id('msg'),
        role: 'assistant',
        content,
        attachments_json: '[]',
        model: session.model,
        created_at: now(),
      });
      session.generation_status = failed ? 'failed' : 'success';
      session.updated_at = now();
      saveDb();
      emit({ type: 'done', content, session_id: session.id });
      res.end();
    };

    const localReply = () => {
      const prompt = String(body.prompt || '').trim();
      const lines = [
        `（本地网关应答）收到：${prompt.slice(0, 80)}`,
        '',
        '当前运行在 local 模式：授权与业务接口都由本机网关应答，没有调用真实模型。',
        '',
        '要接真模型：打开「大模型设置」填入 OpenAI 兼容的 Base URL 与 API Key，',
        '网关会自动把 /api/chat/completions 转发到 <Base URL>/chat/completions。',
        '也可把 user-data/crack-config.json 的 mode 改成 upstream 走官方服务器。',
      ];
      const full = lines.join('\n');
      let index = 0;
      const timer = setInterval(() => {
        if (index >= full.length) {
          clearInterval(timer);
          finish(full, false);
          return;
        }
        const step = full.slice(index, index + 12);
        index += 12;
        emit({ type: 'delta', content: step, session_id: session.id });
      }, 30);
      req.on('close', () => clearInterval(timer));
    };

    const settings = db.settings || {};
    let acc = '';
    const forwarded = forwardChat(
      settings,
      { model: body.model || 'gpt-4o-mini', messages: [{ role: 'user', content: String(body.prompt || '') }] },
      (delta) => {
        acc += delta;
        emit({ type: 'delta', content: delta, session_id: session.id });
      },
      () => finish(acc, false),
      (error) => {
        log(`[chat] 上游失败 ${error.message}，回退本地应答`);
        if (!acc) localReply();
        else finish(acc, false);
      }
    );
    if (!forwarded) localReply();
    return true;
  }

  /* ------------------------------------------------------------- 绘画 */
  if (pathname === '/api/draw/models' && method === 'GET') {
    return j(200, {
      ok: true,
      models: [
        { id: 'local-svg', name: '本地 SVG 演示（占位）', billing: '免费', sizes: ['768x1344', '1024x1024', '1344x768'], max_refs: 4 },
      ],
    });
  }

  if (pathname === '/api/draw/tasks' && method === 'GET') {
    return j(200, { ok: true, tasks: ensure(db, 'drawTasks', []).slice(0, 60) });
  }

  if (pathname === '/api/draw/generate' && method === 'POST') {
    const body = await readJson(req);
    const count = Math.max(1, Math.min(4, Number(body.count) || 1));
    const task = {
      id: id('draw'),
      status: 'pending',
      progress: 0,
      model: body.model || 'local-svg',
      prompt: String(body.prompt || '').slice(0, 2000),
      size: body.size || '1024x1024',
      count,
      ref_images: Array.isArray(body.refImages) ? body.refImages.slice(0, 4) : [],
      images: [],
      created_at: now(),
      updated_at: now(),
    };
    ensure(db, 'drawTasks', []).unshift(task);
    saveDb();

    // ① 本地 ComfyUI 引擎（客户机 GPU）：启用后才走，首次会自动安装
    const comfyCfg = (db.settings && db.settings.comfy) || {};
    if (comfyCfg.enabled && comfy) {
      task.status = 'generating';
      task.progress = 5;
      task.engine = 'comfyui';
      saveDb();
      (async () => {
        try {
          const ready = await comfy.ensure(msg => log(`[comfy] ${msg}`));
          if (!ready.ok) throw new Error(ready.message || 'ComfyUI 未就绪');
          comfyClient.setBase(ready.url);
          const info = await comfyClient.info();
          const ckpt = comfyCfg.checkpoint || (info.checkpoints && info.checkpoints[0]);
          if (!ckpt) {
            throw new Error('ComfyUI 里没有任何 checkpoint，请先在 models/checkpoints 放入模型（如 v1-5-pruned-emaonly.safetensors）');
          }
          const [w, h] = String(task.size || '512x512').split('x').map(n => Number(n) || 512);
          const wf = txt2imgWorkflow({
            prompt: task.prompt,
            negative: comfyCfg.negative || '',
            width: w, height: h,
            steps: comfyCfg.steps || 20,
            cfg: comfyCfg.cfg || 7,
            ckpt,
            batch: task.count
          });
          task.progress = 15;
          saveDb();
          const outDir = path.join(ctx.dataDir || DATA_DIR, 'comfy-out');
          const result = await comfyClient.run(wf, {
            outDir,
            timeoutMs: Number(comfyCfg.timeoutMs) || 600000,
            onProgress: () => { task.progress = Math.min(90, (task.progress || 15) + 5); saveDb(); }
          });
          // 前端约定 images 是 JSON 字符串；把本地文件以 /api/comfy/file/<name> 暴露
          task.images = JSON.stringify(result.files.map(f => `/api/comfy/file/${encodeURIComponent(path.basename(f))}`));
          task.status = 'success';
          task.progress = 100;
          task.updated_at = now();
          saveDb();
          log(`[draw] ${task.id} comfy ok ${result.files.length} 张`);
        } catch (error) {
          task.status = 'failed';
          task.error = String(error.message || error);
          task.updated_at = now();
          saveDb();
          log(`[draw] ${task.id} comfy 失败: ${task.error}`);
        }
      })();
      return j(200, { ok: true, id: task.id, task });
    }

    // ② 自定义图像上游（HTTP 接口）
    const imageCfg = db.settings && db.settings.upstreamImage;
    if (imageCfg && imageCfg.url) {
      task.status = 'generating';
      task.progress = 20;
      saveDb();
      const vars = { prompt: task.prompt, size: task.size, count, model: task.model };
      callUpstream(imageCfg, vars, log)
        .then((urls) => {
          task.status = 'success';
          task.progress = 100;
          task.images = JSON.stringify(urls);
          task.updated_at = now();
          saveDb();
          log(`[draw] ${task.id} upstream ok ${urls.length} 张`);
        })
        .catch((error) => {
          task.status = 'failed';
          task.error = String(error.message || error);
          task.updated_at = now();
          saveDb();
          log(`[draw] ${task.id} upstream 失败: ${task.error}`);
        });
      return j(200, { ok: true, id: task.id, task });
    }

    setTimeout(() => {
      task.status = 'generating';
      task.progress = 45;
      task.updated_at = now();
      saveDb();
    }, 2500);
    setTimeout(() => {
      task.status = 'success';
      task.progress = 100;
      // 前端约定：images 是「JSON 字符串」（Draw.js 里 JSON.parse(s.images)）
      task.images = JSON.stringify(
        Array.from({ length: count }, (_, i) =>
          dataUri(svgCard(`${task.prompt}${count > 1 ? ` #${i + 1}` : ''}`, task.size))
        )
      );
      task.updated_at = now();
      saveDb();
      log(`[draw] ${task.id} success`);
    }, 7000);

    return j(200, { ok: true, id: task.id, task });
  }

  const drawImageMatch = /^\/api\/draw\/tasks\/([^/]+)\/images\/(\d+)\/download$/.exec(pathname);
  if (drawImageMatch) {
    const task = ensure(db, 'drawTasks', []).find((t) => t.id === decodeURIComponent(drawImageMatch[1]));
    const image = task?.images?.[Number(drawImageMatch[2])];
    if (!image) return j(404, { ok: false, msg: '图片不存在' });
    const base64 = image.split(',')[1] || '';
    const buf = Buffer.from(base64, 'base64');
    res.writeHead(200, { 'Content-Type': 'image/svg+xml', 'Content-Length': buf.length, ...ctx.corsHeaders(origin) });
    return res.end(buf);
  }

  const drawTaskMatch = /^\/api\/draw\/tasks\/([^/]+)$/.exec(pathname);
  if (drawTaskMatch && method === 'DELETE') {
    db.drawTasks = ensure(db, 'drawTasks', []).filter((t) => t.id !== decodeURIComponent(drawTaskMatch[1]));
    saveDb();
    return j(200, { ok: true });
  }

  /* ------------------------------------------------------------- 作品 */
  if (pathname === '/api/works') {
    const works = ensure(db, 'works', []);
    if (method === 'GET') {
      const url = new URL(req.url, 'http://127.0.0.1');
      const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
      const q = String(url.searchParams.get('q') || '').trim().toLowerCase();
      const sort = url.searchParams.get('sort') || 'latest';
      const filtered = works.filter(
        (w) => !q || String(w.title || '').toLowerCase().includes(q) || String(w.prompt || '').toLowerCase().includes(q)
      );
      if (sort === 'hot') filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
      const size = 12;
      // 作品广场只展示已公开的；历史上没有 status 的记录按「已公开」处理，避免老数据消失
      const visible = filtered.filter((w) => (w.status || 'published') === 'published');
      return j(200, { ok: true, total: visible.length, works: visible.slice((page - 1) * size, page * size) });
    }
    if (method === 'POST') {
      const body = await readJson(req);
      const work = {
        id: id('work'),
        title: String(body.title || '未命名作品').slice(0, 80),
        prompt: String(body.prompt || '').slice(0, 2000),
        type: body.type || 'video',
        cover_url: body.cover_url || '',
        video_url: body.video_url || '',
        download_url: body.download_url || body.video_url || '',
        views: 0,
        likes: 0,
        created_at: now(),
        // 审核流程所需字段：新建默认待审，后台审核通过后才在广场公开
        status: 'pending',
        author_name: String(body.author_name || '本机用户').slice(0, 40),
        description: String(body.description || '').slice(0, 2000),
        duration: Number(body.duration) || 0,
        allow_download: body.allow_download !== false,
        recommended: false,
        reports: [],
        review_note: '',
        revision: 1
      };
      works.unshift(work);
      saveDb();
      return j(200, { ok: true, id: work.id, work });
    }
  }

  const workMatch = /^\/api\/works\/([^/]+)$/.exec(pathname);
  if (workMatch && method === 'GET' && workMatch[1] !== 'sources') {
    const work = ensure(db, 'works', []).find((w) => w.id === decodeURIComponent(workMatch[1]));
    if (!work) return j(404, { ok: false, msg: '作品不存在' });
    work.views = (work.views || 0) + 1;
    saveDb();
    return j(200, { ok: true, work });
  }

  /* ------------------------------------------------------------- 任务聚合 */
  if (pathname === '/api/tasks' && method === 'GET') {
    const url = new URL(req.url, 'http://127.0.0.1');
    const type = url.searchParams.get('type') || 'all';
    const status = url.searchParams.get('status') || 'all';
    const limit = Math.min(200, Number(url.searchParams.get('limit')) || 100);

    const rows = [];
    for (const t of ensure(db, 'drawTasks', [])) rows.push({ ...t, type: 'draw' });
    for (const t of ensure(db, 'tasks', [])) rows.push({ ...t, type: 'video' });
    for (const p of ensure(db, 'shortDrama', [])) {
      rows.push({
        id: p.id,
        type: 'drama',
        status: p.status || 'pending',
        progress: p.progress || 0,
        prompt: p.title || p.name || '',
        created_at: p.created_at || now(),
        updated_at: p.updated_at || p.created_at || now(),
      });
    }
    const filtered = rows
      .filter((r) => (type === 'all' || r.type === type) && (status === 'all' || r.status === status))
      .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
      .slice(0, limit);

    const stats = { total: rows.length, pending: 0, generating: 0, success: 0, failed: 0 };
    for (const r of rows) stats[r.status] = (stats[r.status] || 0) + 1;
    return j(200, { ok: true, tasks: filtered, stats });
  }

  /* --------------------------------------------------------- 短剧重制 */
  if (pathname === '/api/remake-workshop/capabilities' && method === 'GET') {
    return j(200, {
      ok: true,
      styles: [
        { id: 'anime', name: '日系动画', description: '高饱和、干净线条' },
        { id: 'realistic', name: '写实电影感', description: '浅景深、胶片颗粒' },
        { id: 'ink', name: '水墨国风', description: '留白、淡彩' },
        { id: 'cyber', name: '赛博霓虹', description: '冷调霓虹、雨夜反光' },
      ],
      resolutions: ['720x1280', '1080x1920'],
      max_duration: 180,
    });
  }

  if (pathname === '/api/remake-workshop/projects') {
    const projects = ensure(db, 'remakeProjects', []);
    if (method === 'GET') return j(200, { ok: true, projects });
    if (method === 'POST') {
      const body = await readJson(req);
      const project = { id: id('remake'), status: 'pending', progress: 0, ...body, created_at: now() };
      projects.unshift(project);
      saveDb();
      return j(200, { ok: true, id: project.id, project });
    }
  }

  /* --------------------------------------------------------- 电商短剧 */
  if (pathname === '/api/drama-commerce/projects') {
    const projects = ensure(db, 'commerceProjects', []);
    if (method === 'GET') return j(200, { ok: true, projects });
    if (method === 'POST') {
      const body = await readJson(req);
      const project = { id: id('commerce'), status: 'draft', ...body, created_at: now() };
      projects.unshift(project);
      saveDb();
      return j(200, { ok: true, id: project.id, project });
    }
  }

  if (pathname === '/api/drama-commerce/analyze-product' && method === 'POST') {
    return j(200, {
      ok: true,
      product_name: '（本地占位）示例商品',
      sell_points: '卖点 1：…；卖点 2：…；卖点 3：…（本地模式未接入识图模型）',
      audience: '18-35 岁，关注性价比与颜值的人群',
      category: '美妆个护',
    });
  }

  if (pathname === '/api/drama-commerce/analyze-character' && method === 'POST') {
    return j(200, {
      ok: true,
      gender: '女',
      age_group: '25-30',
      appearance: '（本地占位）齐肩发、浅色上衣、都市通勤风；接入识图模型后可获得真实描述。',
      tags: ['都市', '通勤', '清冷'],
    });
  }

  /* --------------------------------------------------------- 剧本工具 */
  if (pathname === '/api/script-tools/meta' && method === 'GET') {
    return j(200, {
      ok: true,
      genres: ['都市', '古装', '悬疑', '甜宠', '逆袭', '科幻'],
      structures: ['三幕式', '起承转合', '黄金 8 秒开场'],
      templates: [],
    });
  }

  if (pathname === '/api/script-tools/documents') {
    const documents = ensure(db, 'scriptDocs', []);
    if (method === 'GET') return j(200, { ok: true, documents });
    if (method === 'POST') {
      const body = await readJson(req);
      const doc = { id: id('doc'), title: String(body.title || '未命名剧本'), content: body.content || '', created_at: now(), updated_at: now() };
      documents.unshift(doc);
      saveDb();
      return j(200, { ok: true, id: doc.id, document: doc });
    }
  }

  const scriptDocMatch = /^\/api\/script-tools\/documents\/([^/]+)$/.exec(pathname);
  if (scriptDocMatch) {
    const documents = ensure(db, 'scriptDocs', []);
    const doc = documents.find((d) => d.id === decodeURIComponent(scriptDocMatch[1]));
    if (method === 'GET') return doc ? j(200, { ok: true, document: doc }) : j(404, { ok: false, msg: '文档不存在' });
    if (method === 'PUT' || method === 'PATCH') {
      const body = await readJson(req);
      if (doc) Object.assign(doc, body, { updated_at: now() });
      saveDb();
      return j(200, { ok: true });
    }
    if (method === 'DELETE') {
      db.scriptDocs = documents.filter((d) => d !== doc);
      saveDb();
      return j(200, { ok: true });
    }
  }

  /* --------------------------------------------------------- 图片上传 */
  if (pathname === '/api/uploads/oss/image' && method === 'POST') {
    const raw = await readBody(req);
    const upId = id('img');
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(path.join(DATA_DIR, `${upId}.bin`), raw);
    ensure(db, 'uploads', []).push({ id: upId, bytes: raw.length, kind: 'image', created_at: now() });
    saveDb();
    log(`[upload] image ${upId} ${raw.length} bytes`);
    return j(200, { ok: true, id: upId, url: `/api/uploads/local/${upId}`, bytes: raw.length });
  }

  /* ------------------------------------------------------ 豆包助手台账 */
  if (pathname === '/api/doubao-agent/accounts') {
    const accounts = ensure(db, 'agentAccounts', []);
    if (method === 'GET') return j(200, { ok: true, accounts });
    if (method === 'POST') {
      const body = await readJson(req);
      const account = { id: id('acct'), name: String(body.name || '豆包账号'), status: 'offline', created_at: now() };
      accounts.unshift(account);
      saveDb();
      return j(200, { ok: true, id: account.id, account });
    }
  }

  const agentAccountMatch = /^\/api\/doubao-agent\/accounts\/([^/]+)$/.exec(pathname);
  if (agentAccountMatch && method === 'DELETE') {
    db.agentAccounts = ensure(db, 'agentAccounts', []).filter((a) => a.id !== decodeURIComponent(agentAccountMatch[1]));
    saveDb();
    return j(200, { ok: true });
  }

  if (pathname === '/api/doubao-agent/devices' && method === 'GET') {
    return j(200, { ok: true, devices: ensure(db, 'agentDevices', []), paired: Boolean(db.agentPaired) });
  }

  if (pathname === '/api/doubao-agent/pair/start' && method === 'POST') {
    const code = crypto.randomBytes(3).toString('hex').toUpperCase();
    db.agentPairing = { code, created_at: now(), expires_at: new Date(Date.now() + 600000).toISOString() };
    saveDb();
    return j(200, { ok: true, code, expires_in: 600, expires_at: db.agentPairing.expires_at });
  }

  return false;
}

module.exports = { handle, svgCard };
