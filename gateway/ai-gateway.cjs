'use strict';

/**
 * ai-gateway.cjs —— 本地 API 网关
 *
 * 作用：真服务器的所有业务接口都做过 `未激活` 会话校验（403），客户端补丁把
 *      /api/* 改道到这里，由本网关于本机应答，使界面完全可用。
 *
 * 由 main.cjs 通过 fork 自动拉起，监听 127.0.0.1:<gatewayPort>。
 * 环境变量：
 *   AI_GATEWAY_PORT            监听端口
 *   AI_GATEWAY_DATA_DIR        数据目录（JSON 落盘）
 *   AI_GATEWAY_LICENSE_MODULE  license-core.cjs 路径
 *   AI_GATEWAY_LICENSE_FILE    license.json 路径
 *   AI_GATEWAY_LOG             访问日志
 *   AI_GATEWAY_DEMO_BASE       演示视频域名（默认取 home.json）
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { callUpstream, requestJson } = require('./upstream-custom.cjs');

// [LOCAL] 业务路由扩展（对话/绘画/作品/任务聚合/重制/电商/剧本工具/豆包台账）
let extraRoutes = null;
try {
  extraRoutes = require('./routes-extra.cjs');
} catch (error) {
  console.error(`[gateway] routes-extra 加载失败: ${error.message}`);
}

// [LOCAL] 后台路由（/api/admin/*：登录、概况、卡密、画风、教程、作品审核、OSS、代理）
let adminRoutes = null;
try {
  adminRoutes = require('./routes-admin.cjs');
} catch (error) {
  console.error(`[gateway] routes-admin 加载失败: ${error.message}`);
}

const PORT = Number(process.env.AI_GATEWAY_PORT || 8787);
const DATA_DIR = process.env.AI_GATEWAY_DATA_DIR || path.join(process.cwd(), 'data');
const LICENSE_FILE = process.env.AI_GATEWAY_LICENSE_FILE || '';
const LOG_FILE = process.env.AI_GATEWAY_LOG || '';
const DB_FILE = path.join(DATA_DIR, 'db.json');

// ComfyUI 客户机本地托管：数据目录与网关同级，首次需要时才安装
const { ComfyManager } = require('./comfy-manager.cjs');
const { ComfyClient } = require('./comfy-client.cjs');
const comfy = new ComfyManager(DATA_DIR);

let license = null;
try {
  license = require(process.env.AI_GATEWAY_LICENSE_MODULE || './license-core.cjs');
} catch (error) {
  console.error(`[gateway] license-core 加载失败: ${error.message}`);
}

fs.mkdirSync(DATA_DIR, { recursive: true });

function loadDb() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch {
    return { settings: { apiBase: 'https://api.lk888.ai', apiKey: '', models: { chat: [], image: [], video: [] } }, tasks: [], works: [], drama: [], shortDrama: [], uploads: [] };
  }
}

let db = loadDb();
function saveDb() {
  const tmp = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2), 'utf8');
  fs.renameSync(tmp, DB_FILE);
}

function log(text) {
  const line = `${new Date().toISOString()} ${text}\n`;
  try { if (LOG_FILE) fs.appendFileSync(LOG_FILE, line, 'utf8'); } catch { /* ignore */ }
  process.stdout.write(text + '\n');
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Requested-With,Accept',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function send(res, status, data, origin) {
  const body = Buffer.from(JSON.stringify(data), 'utf8');
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': body.length,
    'Cache-Control': 'no-store',
    ...corsHeaders(origin)
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > 80 * 1024 * 1024) { reject(new Error('body too large')); req.destroy(); return; }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function readJson(req) {
  const raw = await readBody(req);
  if (!raw.length) return {};
  try { return JSON.parse(raw.toString('utf8')); } catch { return {}; }
}

function readLicenseRecord() {
  try { return JSON.parse(fs.readFileSync(LICENSE_FILE, 'utf8')); } catch { return null; }
}

const GRANTED_STATUS = {
  activated: true,
  expiresAt: null,
  cardName: '永久卡',
  cardType: 'permanent',
  permanent: true,
  serial: '0000'
};

function licenseStatus() {
  // 授权校验已移除：许可模块缺失时也放行，不再回 403 语义的未激活状态
  if (!license) return { ...GRANTED_STATUS };
  return license.toStatus(readLicenseRecord());
}

function demoBase() {
  if (process.env.AI_GATEWAY_DEMO_BASE) return process.env.AI_GATEWAY_DEMO_BASE.replace(/\/$/, '');
  try {
    const home = JSON.parse(fs.readFileSync(path.join(process.resourcesPath || '', 'home.json'), 'utf8'));
    return new URL(home.home).origin;
  } catch {
    return 'https://khd.yxzyxm.top';
  }
}

function nextId(prefix) {
  return `${prefix}${Date.now().toString(36)}${crypto.randomBytes(3).toString('hex')}`;
}

/* ---------------------------------------------------------------- 视频任务 */
const DEMO_VIDEOS = ['/media/login-demo-01.mp4', '/media/login-demo-02.mp4', '/media/login-demo-03.mp4', '/media/login-demo-04-v2.mp4'];

function scheduleTask(task) {
  setTimeout(() => {
    task.status = 'generating';
    task.updated_at = new Date().toISOString();
    saveDb();
  }, 4000);
  setTimeout(() => {
    task.status = 'success';
    task.progress = 100;
    task.video_url = demoBase() + DEMO_VIDEOS[Math.floor(Math.random() * DEMO_VIDEOS.length)];
    task.updated_at = new Date().toISOString();
    saveDb();
    log(`[task] ${task.id} success`);
  }, 12000);
}

/* -------------------------------------------------------------------- 路由 */
const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '*';
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const pathname = url.pathname;
  const method = req.method.toUpperCase();

  if (method === 'OPTIONS') {
    res.writeHead(204, corsHeaders(origin));
    res.end();
    return;
  }

  if (pathname.startsWith('/api/')) log(`${method} ${pathname}`);

  try {
    /* ---- 授权（与 preload 内的本地实现同源，供浏览器直连时使用） ---- */
    if (pathname === '/api/health') return send(res, 200, { ok: true, name: 'ai-creation-local-gateway', mode: 'local', time: new Date().toISOString() }, origin);

    if (pathname === '/api/auth/status' && method === 'GET') return send(res, 200, licenseStatus(), origin);

    if (pathname === '/api/auth/activate' && method === 'POST') {
      const body = await readJson(req);
      const info = license
        ? license.verify(body.code)
        : { ok: true, code: '', serial: '0000', permanent: true, days: 0, durationMs: 0, cardName: '永久卡', cardType: 'permanent' };
      if (!info.ok) return send(res, 400, { ok: false, msg: info.reason, activated: false }, origin);
      const activatedAt = new Date();
      const record = {
        code: info.code,
        serial: info.serial,
        cardName: info.cardName,
        permanent: info.permanent,
        activatedAt: activatedAt.toISOString(),
        expiresAt: info.permanent ? null : new Date(activatedAt.getTime() + info.durationMs).toISOString()
      };
      try { fs.writeFileSync(LICENSE_FILE, JSON.stringify(record, null, 2), 'utf8'); } catch { /* ignore */ }
      return send(res, 200, { ok: true, msg: '激活成功', activated: true, cardName: info.cardName, permanent: info.permanent, expiresAt: record.expiresAt }, origin);
    }

    if (pathname === '/api/auth/logout' && method === 'POST') {
      try { fs.unlinkSync(LICENSE_FILE); } catch { /* ignore */ }
      return send(res, 200, { ok: true }, origin);
    }

    /* ---- 设置 ---- */
    if (pathname === '/api/settings' && method === 'GET') {
      const s = db.settings || {};
      const prov = s.providers || {};
      const mask = (v) => (v ? `${String(v).slice(0, 6)}****${String(v).slice(-4)}` : '');
      return send(res, 200, {
        apiBase: s.apiBase || 'https://api.lk888.ai',
        apiKeyMasked: s.apiKey ? `${s.apiKey.slice(0, 6)}****${s.apiKey.slice(-4)}` : '',
        models: s.models || { chat: [], image: [], video: [] },
        providers: {
          chat: { base: (prov.chat && prov.chat.base) || '', model: (prov.chat && prov.chat.model) || '', keyMasked: mask(prov.chat && prov.chat.key), hasKey: Boolean(prov.chat && prov.chat.key) },
          image: { base: (prov.image && prov.image.base) || '', model: (prov.image && prov.image.model) || '', keyMasked: mask(prov.image && prov.image.key), hasKey: Boolean(prov.image && prov.image.key) },
          video: { base: (prov.video && prov.video.base) || '', model: (prov.video && prov.video.model) || '', keyMasked: mask(prov.video && prov.video.key), hasKey: Boolean(prov.video && prov.video.key) }
        },
        testResult: s.testResult || null
      }, origin);
    }
    if (pathname === '/api/settings' && (method === 'PUT' || method === 'POST')) {
      const body = await readJson(req);
      // 关键：上一版必须先取出，否则合并后读到的是新值，
      // 「清空 base 就删掉 upstreamImage/upstreamVideo」这条分支永远不会触发。
      const prevProviders = (db.settings && db.settings.providers) || {};
      db.settings = { ...(db.settings || {}), ...body };

      // 三段式 provider：分别存文本/图片/视频的 base + key + model，
      // 再自动派生出网关实际使用的 apiBase / upstreamImage / upstreamVideo。
      if (body.providers && typeof body.providers === 'object') {
        const prev = prevProviders;
        const prevImage = prev.image || {};
        const prevVideo = prev.video || {};
        const next = {};
        for (const kind of ['chat', 'image', 'video']) {
          const inc = body.providers[kind] || {};
          const old = prev[kind] || {};
          const incBase = inc.base === undefined ? old.base || '' : String(inc.base).trim();
          const incModel = inc.model === undefined ? old.model || '' : String(inc.model).trim();
          // 清除语义：base 和 key 都传空字符串 → 整段归零（含已保存的 key）
          const wiping = incBase === '' && (inc.key === '' || inc.key === undefined) && incModel === '';
          next[kind] = {
            base: wiping ? '' : incBase,
            // 非清除时 key 留空表示沿用已保存的
            key: wiping ? '' : inc.key === undefined || inc.key === '' ? old.key || '' : String(inc.key).trim(),
            model: wiping ? '' : incModel
          };
        }
        db.settings.providers = next;

        // 文本：apiBase + apiKey
        if (next.chat.base) db.settings.apiBase = next.chat.base;
        if (next.chat.key) db.settings.apiKey = next.chat.key;

        // 图片：拼成自定义上游（sync，OpenAI 兼容 /images/generations 形状）
        if (next.image.base) {
          db.settings.upstreamImage = {
            kind: 'image',
            url: next.image.base.replace(/\/$/, '') + '/images/generations',
            method: 'POST',
            headers: next.image.key ? { Authorization: `Bearer ${next.image.key}` } : {},
            body: {
              model: next.image.model || '{{model}}',
              prompt: '{{prompt}}',
              n: '{{count}}',
              size: '{{size}}',
              response_format: 'url'
            },
            mode: 'sync',
            resultPath: 'data.0.url'
          };
        } else if (prevImage.base) {
          // 清空了图片 base，去掉上游配置，回到本地占位
          delete db.settings.upstreamImage;
        }

        // 视频：拼成自定义上游（task 优先，含轮询）
        if (next.video.base) {
          const vbase = next.video.base.replace(/\/$/, '');
          db.settings.upstreamVideo = {
            kind: 'video',
            url: vbase + '/videos',
            method: 'POST',
            headers: next.video.key ? { Authorization: `Bearer ${next.video.key}` } : {},
            body: { model: next.video.model || '{{model}}', prompt: '{{prompt}}', size: '{{size}}' },
            mode: 'task',
            taskIdPath: 'data.task_id',
            pollUrl: vbase + '/videos/{{taskId}}',
            pollMethod: 'GET',
            pollHeaders: next.video.key ? { Authorization: `Bearer ${next.video.key}` } : {},
            pollStatusPath: 'data.status',
            pollDoneValues: ['succeeded', 'success', 'done', 'completed', 'SUCCEEDED'],
            pollFailValues: ['failed', 'error', 'canceled', 'cancelled', 'FAILED'],
            pollResultPath: 'data.output.0.url',
            pollIntervalMs: 3000,
            pollTimeoutMs: 900000
          };
        } else if (prevVideo.base) {
          delete db.settings.upstreamVideo;
        }
      }

      if (body.apiKey) db.settings.apiKeyMasked = `${body.apiKey.slice(0, 6)}****${body.apiKey.slice(-4)}`;
      saveDb();
      return send(res, 200, { ok: true }, origin);
    }
    if (pathname === '/api/settings/test' && method === 'POST') {
      const body = await readJson(req);
      const result = { ok: true, apiBase: body.apiBase || db.settings?.apiBase || '', models: (db.settings?.models || { chat: [], image: [], video: [] }), message: '本地网关：连通性检查已跳过（未配置真实上游）' };
      db.settings = { ...(db.settings || {}), testResult: result };
      saveDb();
      return send(res, 200, result, origin);
    }

    /* ---- 视频 ---- */
    if (pathname === '/api/video/models' && method === 'GET') {
      return send(res, 200, {
        models: [
          { id: 'local-demo', name: '本地演示模型（占位）', billing: '免费', billing_position: 'after' },
          { id: 'local-hd', name: '本地高清演示（占位）', billing: '免费', billing_position: 'after' }
        ]
      }, origin);
    }
    if (pathname === '/api/video/generate' && method === 'POST') {
      const body = await readJson(req);
      const task = {
        id: nextId('task_'),
        status: 'pending',
        progress: 0,
        model: body.model || 'local-demo',
        prompt: String(body.prompt || '').slice(0, 4000),
        params: body.params || {},
        video_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.tasks = db.tasks || [];
      db.tasks.unshift(task);
      saveDb();

      // 配了自定义视频上游就走真实调用，否则保持 demo 占位
      const videoCfg = db.settings && db.settings.upstreamVideo;
      if (videoCfg && videoCfg.url) {
        task.status = 'generating';
        task.progress = 15;
        saveDb();
        const vars = {
          prompt: task.prompt,
          model: task.model,
          size: (body.params && body.params.size) || body.size || '',
          count: 1
        };
        callUpstream(videoCfg, vars, log)
          .then(urls => {
            task.status = 'success';
            task.progress = 100;
            task.video_url = urls[0];
            task.videos = urls;
            task.updated_at = new Date().toISOString();
            saveDb();
            log(`[video] ${task.id} upstream ok ${urls[0]}`);
          })
          .catch(error => {
            task.status = 'failed';
            task.error = String(error.message || error);
            task.updated_at = new Date().toISOString();
            saveDb();
            log(`[video] ${task.id} upstream 失败: ${task.error}`);
          });
        return send(res, 200, { ok: true, id: task.id, task }, origin);
      }

      scheduleTask(task);
      return send(res, 200, { ok: true, id: task.id, task }, origin);
    }
    if (pathname === '/api/video/tasks' && method === 'GET') {
      return send(res, 200, { tasks: (db.tasks || []).slice(0, 50) }, origin);
    }
    const videoTaskMatch = /^\/api\/video\/tasks\/([^/]+)$/.exec(pathname);
    if (videoTaskMatch && method === 'DELETE') {
      db.tasks = (db.tasks || []).filter(t => t.id !== decodeURIComponent(videoTaskMatch[1]));
      saveDb();
      return send(res, 200, { ok: true }, origin);
    }

    /* ---- 短剧 / 剧本 ---- */
    if (pathname === '/api/drama/projects' && method === 'GET') {
      return send(res, 200, { ok: true, projects: db.drama || [] }, origin);
    }
    if (pathname === '/api/drama/projects' && method === 'POST') {
      const body = await readJson(req);
      const project = { id: nextId('drama_'), ...body, created_at: new Date().toISOString() };
      db.drama = db.drama || [];
      db.drama.unshift(project);
      saveDb();
      return send(res, 200, { ok: true, id: project.id, project }, origin);
    }

    if (pathname === '/api/short-drama-production/projects' && method === 'GET') {
      return send(res, 200, { ok: true, projects: db.shortDrama || [] }, origin);
    }
    if (pathname === '/api/short-drama-production/projects' && method === 'POST') {
      const body = await readJson(req);
      const project = { id: nextId('sd_'), ...body, created_at: new Date().toISOString() };
      db.shortDrama = db.shortDrama || [];
      db.shortDrama.unshift(project);
      saveDb();
      return send(res, 200, { ok: true, id: project.id, project }, origin);
    }
    const sdMatch = /^\/api\/short-drama-production\/projects\/([^/]+)$/.exec(pathname);
    if (sdMatch) {
      const id = decodeURIComponent(sdMatch[1]);
      const index = (db.shortDrama || []).findIndex(p => p.id === id);
      if (method === 'GET') {
        if (index < 0) return send(res, 404, { ok: false, msg: '项目不存在' }, origin);
        return send(res, 200, { ok: true, project: db.shortDrama[index] }, origin);
      }
      if (method === 'DELETE') {
        db.shortDrama = (db.shortDrama || []).filter(p => p.id !== id);
        saveDb();
        return send(res, 200, { ok: true }, origin);
      }
      if (method === 'PUT' || method === 'PATCH') {
        const body = await readJson(req);
        if (index >= 0) { db.shortDrama[index] = { ...db.shortDrama[index], ...body }; saveDb(); }
        return send(res, 200, { ok: true }, origin);
      }
    }

    if (pathname === '/api/short-drama-production/source/import' && method === 'POST') {
      const raw = await readBody(req);
      const contentType = String(req.headers['content-type'] || '');
      let filename = 'script.txt';
      let text = '';
      const nameMatch = /filename="([^"]+)"/.exec(raw.toString('latin1').slice(0, 4096));
      if (nameMatch) filename = nameMatch[1];
      const ext = (filename.split('.').pop() || '').toLowerCase();
      if (ext === 'txt' || ext === 'md') {
        const boundary = /boundary=([^;]+)/.exec(contentType);
        if (boundary) {
          const parts = raw.toString('utf8').split(`--${boundary[1]}`);
          const filePart = parts.find(p => p.includes('filename='));
          if (filePart) {
            const split = filePart.indexOf('\r\n\r\n');
            if (split >= 0) {
              text = filePart.slice(split + 4).replace(/\r\n--\s*$/, '').trim();
            }
          }
        }
      }
      if (!text) {
        text = `【本地网关占位】已接收文件 ${filename}。\n\n当前为本地模式，未接入 DOC/DOCX/PDF 解析服务，请把剧本内容直接粘贴到文本框，或接入自己的解析服务。`;
      }
      const chapters = Math.max(1, (text.match(/第[一二三四五六七八九十百零\d]+[集章]/g) || []).length);
      return send(res, 200, { ok: true, text, filename, chapters }, origin);
    }

    /* ---- 上传 ---- */
    if (pathname === '/api/uploads/oss/video' && method === 'POST') {
      const raw = await readBody(req);
      const id = nextId('up_');
      const file = path.join(DATA_DIR, `${id}.bin`);
      fs.writeFileSync(file, raw);
      db.uploads = db.uploads || [];
      db.uploads.push({ id, bytes: raw.length, created_at: new Date().toISOString() });
      saveDb();
      log(`[upload] ${id} ${raw.length} bytes`);
      return send(res, 200, { ok: true, id, url: `/api/uploads/local/${id}`, bytes: raw.length }, origin);
    }
    const upMatch = /^\/api\/uploads\/local\/([^/]+)$/.exec(pathname);
    if (upMatch) {
      const file = path.join(DATA_DIR, `${upMatch[1]}.bin`);
      if (!fs.existsSync(file)) return send(res, 404, { ok: false }, origin);
      const data = fs.readFileSync(file);
      res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Length': data.length, ...corsHeaders(origin) });
      return res.end(data);
    }

    /* ---- 其它 ---- */
    // 远端 SPA 会请求站点元信息与后台品牌配置，本地网关给出可用的最小应答
    if (pathname === '/api/site/version' && method === 'GET') {
      return send(res, 200, { ok: true, version: '1.5.5', channel: 'local', latest: '1.5.5' }, origin);
    }
    if (pathname === '/api/admin/branding' && method === 'GET') {
      const s = db.settings || {};
      return send(res, 200, {
        ok: true,
        branding: s.branding || { name: '梦颜AI', title: 'AI短剧创作系统', logo: '/brand-icon.png' }
      }, origin);
    }
    // 前端 Tutorials 页读的是 {categories, articles}，空对象会让它 .filter 崩
    if (pathname === '/api/tutorials' && method === 'GET') {
      const categories = Array.isArray(db.tutorialCategories) ? db.tutorialCategories : [];
      const articles = Array.isArray(db.tutorialArticles) ? db.tutorialArticles : [];
      return send(res, 200, { ok: true, categories, articles }, origin);
    }
    const articleMatch = /^\/api\/tutorials\/articles\/([^/]+)$/.exec(pathname);
    if (articleMatch && method === 'GET') {
      const articles = Array.isArray(db.tutorialArticles) ? db.tutorialArticles : [];
      const article = articles.find(a => String(a.id) === decodeURIComponent(articleMatch[1]));
      if (!article) return send(res, 404, { ok: false, msg: '教程不存在' }, origin);
      return send(res, 200, { ok: true, article }, origin);
    }
    if (pathname === '/api/site/card-claim' && method === 'GET') {
      const claim = db.cardClaim || {};
      return send(res, 200, {
        ok: true,
        config: {
          enabled: Boolean(claim.enabled),
          wechat: claim.wechat || '',
          qrImage: claim.qrImage || '',
          description: claim.description || '本地模式：卡密由后台「卡密管理」批量签发',
          serviceHours: claim.serviceHours || ''
        }
      }, origin);
    }
    if (pathname === '/api/site/card-claim/qr' && method === 'GET') {
      // 初始二维码占位：1x1 透明 PNG
      const png = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a4944415478da6300010000050001' + '0d0a2db40000000049454e44ae426082', 'hex');
      res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': png.length, ...corsHeaders(origin) });
      return res.end(png);
    }

    if (pathname === '/api/settings/probe' && method === 'POST') {
      const body = await readJson(req);
      const kind = String(body.kind || 'chat');
      const prov = (db.settings && db.settings.providers) || {};
      const saved = prov[kind] || {};
      const base = String(body.base || saved.base || '').replace(/\/$/, '');
      const key = String(body.key || saved.key || '');
      if (!base) return send(res, 200, { ok: false, message: '请先填写 API 地址' }, origin);
      try {
        const res2 = await requestJson(`${base}/models`, {
          method: 'GET',
          headers: key ? { Authorization: `Bearer ${key}` } : {},
          timeoutMs: 12000
        });

        if (!res2 || res2.status >= 400) {
          const code = (res2 && res2.json && (res2.json.code || res2.json.error)) || '';
          const msg = (res2 && res2.json && (res2.json.message || res2.json.msg)) || '';
          const text = (res2 && res2.text ? String(res2.text) : '').slice(0, 160);
          const status = res2 ? res2.status : 0;
          const hint =
            status === 401 || /API_KEY|INVALID_API_KEY|unauthor/i.test(code + msg)
              ? 'Key 无效或未授权，请检查 API Key'
              : status === 403
                ? 'Key 无权限访问该服务'
                : status === 404
                  ? '该地址没有 /models 接口，请确认 Base URL 是否以 /v1 结尾'
                  : `上游返回 HTTP ${status}`;
          return send(res, 200, {
            ok: false,
            status,
            message: `${hint}${code || msg || text ? '（' + (code || msg || text) + '）' : ''}`
          }, origin);
        }

        const body2 = res2.json || {};
        const cand = body2.data || body2.models || body2.result || body2.list;
        const raw = Array.isArray(cand) ? cand : Array.isArray(body2) ? body2 : [];
        const models = raw
          .map(m => (typeof m === 'string' ? m : m && (m.id || m.name || m.model)))
          .filter(Boolean);

        // 图片/视频要额外验证对应接口是否真的存在：
        // 很多中转站只有 /chat/completions，/images/generations 与 /videos 直接 404，
        // 只看 /models 会误导用户以为这类模型可用。
        let capability = 'ok';
        if (kind === 'image' || kind === 'video') {
          const capPath = kind === 'image' ? '/images/generations' : '/videos';
          const capBody = kind === 'image'
            ? { model: 'probe', prompt: 'probe', n: 1 }
            : { model: 'probe', prompt: 'probe' };
          const capRes = await requestJson(`${base}${capPath}`, {
            method: 'POST',
            headers: key ? { Authorization: `Bearer ${key}` } : {},
            body: capBody,
            timeoutMs: 12000
          }).catch(() => null);
          const cs = capRes ? capRes.status : 0;
          // 404/405 判定为该平台不支持此类型；401/400/422 说明接口存在，只是参数或鉴权问题
          if (cs === 404 || cs === 405) {
            capability = 'unsupported';
          } else if (!cs) {
            capability = 'unknown';
          }
        }

        if (capability === 'unsupported') {
          return send(res, 200, {
            ok: false,
            status: 404,
            models,
            message:
              kind === 'image'
                ? '该服务不提供图片生成接口（/images/generations 不存在），这类模型无法使用'
                : '该服务不提供视频生成接口（/videos 不存在），这类模型无法使用'
          }, origin);
        }
        if (!models.length) {
          return send(res, 200, {
            ok: false,
            message: `接口通了但没解析到模型（返回键：${Object.keys(body2).join(',') || '空'}）`
          }, origin);
        }
        return send(res, 200, {
          ok: true,
          models,
          capability,
          message:
            capability === 'unknown'
              ? `连接成功，发现 ${models.length} 个模型（未能确认${kind === 'image' ? '图片' : '视频'}接口）`
              : `连接成功，发现 ${models.length} 个模型`
        }, origin);
      } catch (error) {
        return send(res, 200, { ok: false, message: String(error.message || error) }, origin);
      }
    }

    /* ---- ComfyUI 客户机本地托管 ---- */
    if (pathname === '/api/comfy/status' && method === 'GET') {
      const cfg = (db.settings && db.settings.comfy) || {};
      return send(res, 200, { ok: true, enabled: Boolean(cfg.enabled), ...comfy.status() }, origin);
    }
    if (pathname === '/api/comfy/info' && method === 'GET') {
      try {
        const ready = await comfy.ensure(() => {});
        if (!ready.ok) return send(res, 500, { ok: false, message: ready.message }, origin);
        const client = new ComfyClient(ready.url, { dataDir: DATA_DIR });
        const info = await client.info();
        return send(res, 200, { ok: true, url: ready.url, checkpoints: info.checkpoints, devices: info.devices }, origin);
      } catch (error) {
        return send(res, 500, { ok: false, message: error.message }, origin);
      }
    }
    // 取 ComfyUI 输出文件
    const comfyFileMatch = /^\/api\/comfy\/file\/([^/]+)$/.exec(pathname);
    if (comfyFileMatch && method === 'GET') {
      const name = path.basename(decodeURIComponent(comfyFileMatch[1]));
      const file = path.join(DATA_DIR, 'comfy-out', name);
      if (!fs.existsSync(file)) return send(res, 404, { ok: false, msg: '文件不存在' }, origin);
      const data = fs.readFileSync(file);
      const ext = path.extname(name).toLowerCase();
      const type = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
        : ext === '.webp' ? 'image/webp' : ext === '.mp4' ? 'video/mp4' : 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': data.length, 'Cache-Control': 'no-store', ...corsHeaders(origin) });
      return res.end(data);
    }
    if (pathname === '/api/comfy/ensure' && method === 'POST') {
      const steps = [];
      const result = await comfy.ensure((msg) => {
        steps.push({ at: new Date().toISOString(), msg });
        log(`[comfy] ${msg}`);
      });
      return send(res, result.ok ? 200 : 500, { ...result, steps }, origin);
    }
    if (pathname === '/api/comfy/stop' && method === 'POST') {
      comfy.stop();
      return send(res, 200, { ok: true }, origin);
    }

    // 意见反馈：本地只做落盘，返回与线上同构的最小结构
    if (pathname === '/api/feedback') {
      const feedback = (db.feedback || (db.feedback = []));
      if (method === 'GET') {
        return send(res, 200, { ok: true, total: feedback.length, items: feedback.slice(-50) }, origin);
      }
      if (method === 'POST') {
        const body = await readJson(req);
        const record = {
          id: nextId('fb_'),
          content: String(body.content || body.message || '').slice(0, 2000),
          contact: String(body.contact || '').slice(0, 200),
          type: String(body.type || 'suggestion'),
          created_at: new Date().toISOString()
        };
        feedback.push(record);
        saveDb();
        log(`[feedback] ${record.type} ${record.id}`);
        return send(res, 200, { ok: true, id: record.id, msg: '已收到反馈' }, origin);
      }
    }

    // [LOCAL] 后台路由：/api/admin/*
    if (adminRoutes && pathname.startsWith('/api/admin/')) {
      const handled = await adminRoutes.handle({
        req, res, pathname, method, origin, db, saveDb, log, send, readJson, readBody,
        corsHeaders, dataDir: DATA_DIR, license
      });
      if (handled) return handled;
    }

    // [LOCAL] 扩展路由：命中即返回，未命中落到下面的兜底
    if (extraRoutes) {
      const handled = await extraRoutes.handle({
        req, res, pathname, method, origin, db, saveDb, log, send, readJson, readBody,
        corsHeaders, demoBase, licenseStatus, comfy, dataDir: DATA_DIR
      });
      if (handled) return handled;
    }

    log(`[gateway] 未实现 ${method} ${pathname}`);
    return send(res, 200, { ok: true, local: true, note: `本地网关未实现 ${method} ${pathname}` }, origin);
  } catch (error) {
    log(`[gateway] error ${method} ${pathname}: ${error.stack || error.message}`);
    return send(res, 500, { ok: false, msg: error.message }, origin);
  }
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`[gateway] 端口 ${PORT} 被占用，改用随机端口`);
    server.listen(0, '127.0.0.1');
  } else {
    console.error(`[gateway] ${error.message}`);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  const actual = server.address().port;
  log(`[gateway] listening http://127.0.0.1:${actual} data=${DATA_DIR}`);
  if (process.send) process.send({ type: 'gateway-port', port: actual });
});
