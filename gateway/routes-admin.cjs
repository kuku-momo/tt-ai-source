'use strict';

/**
 * routes-admin.cjs —— 本地网关的后台（/api/admin/*）实现
 *
 * 上游这些接口由真服务器提供（会话校验 + 数据库）。本地网关此前对这些路径一律
 * 返回 {ok:true, local:true} 兜底，导致 /admin 后台能进但列表全空、无法登录。
 * 本模块用 db.json 落盘补齐，行为对齐前端（renderer/src/runtime/index.js）的读法：
 *
 *   会话   POST /api/admin/login {password} → Set-Cookie: admin_session
 *          POST /api/admin/logout
 *          GET  /api/admin/status → {authenticated}
 *   概况   GET  /api/admin/overview → {server:{now,uptime,node}, cards:{total,unused,used,revoked}, tasks:{draw:[],video:[],drama:[]}, users}
 *   卡密   GET  /api/admin/cards      → {cards:[{id,code,card_name,card_type,status,activated_at,expires_at,duration_ms,created_at}]}
 *          POST /api/admin/cards {count,cardType} → 签发 N 张（调用 license-core.generate）
 *          POST /api/admin/cards/:id/revoke
 *          POST /api/admin/cards/:id/reset
 *   画风   GET/POST /api/admin/style-presets
 *          PUT/DELETE /api/admin/style-presets/:id
 *          POST/DELETE /api/admin/style-presets/:id/image  (multipart image / 移除)
 *   教程   GET/POST /api/admin/tutorials
 *          PUT/DELETE /api/admin/tutorials/:id
 *          POST /api/admin/tutorials/media  (multipart file)
 *   领取   GET/PUT /api/admin/card-claim  {enabled,wechat,qrImage,description,serviceHours}
 *   作品   GET /api/admin/works?status=&page=
 *          POST /api/admin/works/:id/review {action,note,revision,recommended}
 *   OSS    POST /api/admin/oss/unlock {password} → {token,expiresAt}
 *          GET/PUT /api/admin/oss   (X-Oss-Token)
 *          POST /api/admin/oss/test  (X-Oss-Token)
 *   代理   POST /api/admin/agency/unlock {password} → {token,expiresAt}
 *          GET /api/admin/agency
 *          POST /api/admin/agency/lock
 *
 * 独立验证密码默认取 ADMIN_PASSWORD / ADMIN_UNLOCK_PASSWORD，缺省 admin-local-2026
 * （与前端登录页提示一致），可在 db.json 的 settings 中覆盖。
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const SESSION_COOKIE = 'admin_session';
const TOKEN_TTL_MS = 10 * 60 * 1000;

function nowIso() {
  return new Date().toISOString();
}

function token() {
  return crypto.randomBytes(24).toString('hex');
}

function newId(prefix) {
  return `${prefix}${Date.now().toString(36)}${crypto.randomBytes(3).toString('hex')}`;
}

function parseCookies(header) {
  const out = {};
  for (const part of String(header || '').split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

function readMultipart(raw, contentType) {
  const boundary = /boundary=([^;]+)/.exec(String(contentType || ''));
  if (!boundary) return null;
  const text = raw.toString('latin1');
  const chunks = text.split(`--${boundary[1]}`);
  for (const chunk of chunks) {
    if (!chunk.includes('filename=')) continue;
    const split = chunk.indexOf('\r\n\r\n');
    if (split === -1) continue;
    const head = chunk.slice(0, split);
    const nameMatch = /filename="([^"]*)"/.exec(head);
    const typeMatch = /Content-Type:\s*([^\r\n]+)/i.exec(head);
    const body = chunk.slice(split + 4).replace(/\r\n$/, '');
    return {
      filename: nameMatch ? nameMatch[1] : 'upload.bin',
      contentType: typeMatch ? typeMatch[1].trim() : 'application/octet-stream',
      data: Buffer.from(body, 'latin1')
    };
  }
  return null;
}

function ensure(db, key, fallback) {
  if (!Array.isArray(db[key])) db[key] = fallback;
  return db[key];
}

/**
 * @param {object} ctx 由 ai-gateway.cjs 传入
 * @returns {Promise<boolean>|boolean} true 表示已处理
 */
async function handle(ctx) {
  const { req, res, pathname, method, origin, db, saveDb, log, send, readJson, readBody, corsHeaders } = ctx;
  if (!pathname.startsWith('/api/admin/')) return false;

  const license = ctx.license || null;
  const dataDir = ctx.dataDir;
  const settings = db.settings || (db.settings = {});
  const adminPassword = String(
    process.env.ADMIN_PASSWORD || settings.adminPassword || 'admin-local-2026'
  );
  const unlockPassword = String(
    process.env.ADMIN_UNLOCK_PASSWORD || settings.adminUnlockPassword || adminPassword
  );

  /* ------------------------------------------------------------ 会话 */
  const sessions = (db.adminSessions || (db.adminSessions = {}));
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies[SESSION_COOKIE];
  const authed = Boolean(sessionId && sessions[sessionId] && sessions[sessionId].expiresAt > Date.now());
  if (sessionId && !authed) {
    delete sessions[sessionId];
    saveDb();
  }

  const requireAuth = () => {
    if (authed) return true;
    send(res, 401, { ok: false, authenticated: false, msg: '请先登录后台' }, origin);
    return false;
  };

  if (pathname === '/api/admin/status' && method === 'GET') {
    return send(res, 200, { ok: true, authenticated: authed }, origin), true;
  }

  if (pathname === '/api/admin/login' && method === 'POST') {
    const body = await readJson(req);
    if (String(body.password || '') !== adminPassword) {
      log('[admin] login 失败');
      return send(res, 401, { ok: false, msg: '后台密码不正确' }, origin), true;
    }
    const sid = token();
    sessions[sid] = { createdAt: Date.now(), expiresAt: Date.now() + 12 * 3600 * 1000 };
    saveDb();
    const body2 = Buffer.from(JSON.stringify({ ok: true, authenticated: true }), 'utf8');
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': body2.length,
      'Cache-Control': 'no-store',
      'Set-Cookie': `${SESSION_COOKIE}=${sid}; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200`,
      ...corsHeaders(origin)
    });
    res.end(body2);
    log('[admin] login 成功');
    return true;
  }

  if (pathname === '/api/admin/logout' && method === 'POST') {
    if (sessionId) {
      delete sessions[sessionId];
      saveDb();
    }
    const body2 = Buffer.from(JSON.stringify({ ok: true }), 'utf8');
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': body2.length,
      'Cache-Control': 'no-store',
      'Set-Cookie': `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
      ...corsHeaders(origin)
    });
    res.end(body2);
    return true;
  }

  if (!requireAuth()) return true;

  /* ------------------------------------------------------------ 概况 */
  if (pathname === '/api/admin/overview' && method === 'GET') {
    const cards = ensure(db, 'cards', []);
    const count = (status) => cards.filter((c) => c.status === status).length;
    const drawTasks = ensure(db, 'drawTasks', []);
    const videoTasks = ensure(db, 'videoTasks', []);
    const dramaProjects = ensure(db, 'shortDrama', []);
    return (
      send(
        res,
        200,
        {
          ok: true,
          server: {
            now: new Date().toLocaleString('zh-CN', { hour12: false }),
            uptime: Math.round(process.uptime()),
            node: `Node.js ${process.version}`,
            pid: process.pid,
            local: true
          },
          cards: {
            total: cards.length,
            unused: count('unused'),
            used: count('used'),
            revoked: count('revoked'),
            expired: count('expired')
          },
          tasks: {
            draw: [{ count: drawTasks.length }],
            video: [{ count: videoTasks.length }],
            drama: [{ count: dramaProjects.length }]
          },
          users: 0
        },
        origin
      ),
      true
    );
  }

  /* ------------------------------------------------------------ 卡密 */
  if (pathname === '/api/admin/cards' && method === 'GET') {
    const cards = ensure(db, 'cards', []);
    return send(res, 200, { ok: true, cards }, origin), true;
  }

  if (pathname === '/api/admin/cards' && method === 'POST') {
    if (!license) return send(res, 500, { ok: false, msg: 'license-core 未加载，无法签发卡密' }, origin), true;
    const body = await readJson(req);
    const wantCount = Math.max(1, Math.min(200, Number(body.count) || 1));
    const cardType = String(body.cardType || 'permanent');
    const days = Math.max(1, Math.min(999, Number(body.days) || 30));
    const cards = ensure(db, 'cards', []);
    const created = [];
    for (let i = 0; i < wantCount; i += 1) {
      const code =
        cardType === 'permanent'
          ? license.generate({ type: 'P' })
          : license.generate({ type: 'D', days });
      const info = license.verifyStrict ? license.verifyStrict(code) : license.verify(code);
      const record = {
        id: newId('card_'),
        code,
        card_name: cardType === 'permanent' ? '永久卡' : `${days} 天卡`,
        card_type: cardType === 'permanent' ? 'permanent' : 'duration',
        duration_ms: cardType === 'permanent' ? 0 : days * 86400000,
        status: 'unused',
        activated_at: null,
        expires_at: null,
        created_at: nowIso(),
        serial: info && info.serial ? info.serial : null
      };
      cards.push(record);
      created.push(record);
    }
    saveDb();
    log(`[admin] 签发 ${created.length} 张 ${cardType}`);
    return send(res, 200, { ok: true, cards: created }, origin), true;
  }

  const cardAction = /^\/api\/admin\/cards\/([^/]+)\/(revoke|reset)$/.exec(pathname);
  if (cardAction && method === 'POST') {
    const cards = ensure(db, 'cards', []);
    const card = cards.find((c) => c.id === decodeURIComponent(cardAction[1]));
    if (!card) return send(res, 404, { ok: false, msg: '卡密不存在' }, origin), true;
    if (cardAction[2] === 'revoke') {
      card.status = 'revoked';
      card.revoked_at = nowIso();
    } else {
      card.status = card.activated_at ? 'used' : 'unused';
      card.reset_at = nowIso();
    }
    saveDb();
    log(`[admin] 卡密 ${cardAction[2]} ${card.code}`);
    return send(res, 200, { ok: true, card }, origin), true;
  }

  /* ------------------------------------------------------ 画风预设 */
  if (pathname === '/api/admin/style-presets' && method === 'GET') {
    const presets = ensure(db, 'stylePresets', []);
    return send(res, 200, { ok: true, presets }, origin), true;
  }

  if (pathname === '/api/admin/style-presets' && method === 'POST') {
    const body = await readJson(req);
    const presets = ensure(db, 'stylePresets', []);
    const record = {
      id: newId('style_'),
      label: String(body.label || '未命名画风'),
      preset_key: String(body.preset_key || newId('preset_')),
      category: String(body.category || 'live'),
      tone: String(body.tone || 'film'),
      prompt: String(body.prompt || ''),
      sort_order: Number(body.sort_order) || 0,
      enabled: body.enabled !== false,
      image: '',
      created_at: nowIso()
    };
    presets.push(record);
    saveDb();
    return send(res, 200, { ok: true, preset: record, presets }, origin), true;
  }

  const presetMatch = /^\/api\/admin\/style-presets\/([^/]+)(\/image)?$/.exec(pathname);
  if (presetMatch) {
    const presets = ensure(db, 'stylePresets', []);
    const id = decodeURIComponent(presetMatch[1]);
    const preset = presets.find((p) => p.id === id);
    if (!preset) return send(res, 404, { ok: false, msg: '画风不存在' }, origin), true;

    if (presetMatch[2] && method === 'POST') {
      const raw = await readBody(req);
      const file = readMultipart(raw, req.headers['content-type']);
      if (!file || !file.data.length) return send(res, 400, { ok: false, msg: '未收到图片' }, origin), true;
      const uploadDir = path.join(dataDir, 'uploads', 'styles');
      fs.mkdirSync(uploadDir, { recursive: true });
      const ext = (file.filename.split('.').pop() || 'png').toLowerCase();
      const name = `${preset.id}-${Date.now().toString(36)}.${ext}`;
      fs.writeFileSync(path.join(uploadDir, name), file.data);
      preset.image = `/api/admin/style-presets/${preset.id}/image`;
      preset.image_file = name;
      saveDb();
      return send(res, 200, { ok: true, preset }, origin), true;
    }

    if (presetMatch[2] && method === 'GET') {
      if (!preset.image_file) return send(res, 404, { ok: false }, origin), true;
      const file = path.join(dataDir, 'uploads', 'styles', preset.image_file);
      if (!fs.existsSync(file)) return send(res, 404, { ok: false }, origin), true;
      const data = fs.readFileSync(file);
      res.writeHead(200, { 'Content-Type': 'image/*', 'Content-Length': data.length, 'Cache-Control': 'no-store', ...corsHeaders(origin) });
      res.end(data);
      return true;
    }

    if (presetMatch[2] && method === 'DELETE') {
      preset.image = '';
      preset.image_file = '';
      saveDb();
      return send(res, 200, { ok: true, preset }, origin), true;
    }

    if (method === 'PUT' || method === 'PATCH') {
      const body = await readJson(req);
      Object.assign(preset, {
        label: body.label !== undefined ? String(body.label) : preset.label,
        preset_key: body.preset_key !== undefined ? String(body.preset_key) : preset.preset_key,
        category: body.category !== undefined ? String(body.category) : preset.category,
        tone: body.tone !== undefined ? String(body.tone) : preset.tone,
        prompt: body.prompt !== undefined ? String(body.prompt) : preset.prompt,
        sort_order: body.sort_order !== undefined ? Number(body.sort_order) || 0 : preset.sort_order,
        enabled: body.enabled !== undefined ? Boolean(body.enabled) : preset.enabled
      });
      saveDb();
      return send(res, 200, { ok: true, preset, presets }, origin), true;
    }

    if (method === 'DELETE') {
      db.stylePresets = presets.filter((p) => p.id !== id);
      saveDb();
      return send(res, 200, { ok: true }, origin), true;
    }
  }

  /* ------------------------------------------------------------ 教程 */
  if (pathname === '/api/admin/tutorials' && method === 'GET') {
    return (
      send(res, 200, {
        ok: true,
        categories: ensure(db, 'tutorialCategories', []),
        articles: ensure(db, 'tutorialArticles', [])
      }, origin),
      true
    );
  }

  if (pathname === '/api/admin/tutorials' && method === 'POST') {
    const body = await readJson(req);
    const articles = ensure(db, 'tutorialArticles', []);
    const record = {
      id: newId('art_'),
      title: String(body.title || '未命名教程'),
      category: String(body.category || 'basics'),
      summary: String(body.summary || ''),
      content: String(body.content || ''),
      video_url: String(body.video_url || ''),
      sort_order: Number(body.sort_order) || 0,
      published: body.published !== false,
      created_at: nowIso()
    };
    articles.push(record);
    saveDb();
    return send(res, 200, { ok: true, article: record, articles }, origin), true;
  }

  if (pathname === '/api/admin/tutorials/media' && method === 'POST') {
    const raw = await readBody(req);
    const file = readMultipart(raw, req.headers['content-type']);
    if (!file || !file.data.length) return send(res, 400, { ok: false, msg: '未收到文件' }, origin), true;
    const dir = path.join(dataDir, 'uploads', 'tutorials');
    fs.mkdirSync(dir, { recursive: true });
    const ext = (file.filename.split('.').pop() || 'bin').toLowerCase();
    const name = `${newId('media_')}.${ext}`;
    fs.writeFileSync(path.join(dir, name), file.data);
    return send(res, 200, { ok: true, url: `/api/admin/tutorials/media/${name}`, filename: name, bytes: file.data.length }, origin), true;
  }

  const mediaMatch = /^\/api\/admin\/tutorials\/media\/([^/]+)$/.exec(pathname);
  if (mediaMatch && method === 'GET') {
    const name = decodeURIComponent(mediaMatch[1]);
    const file = path.join(dataDir, 'uploads', 'tutorials', path.basename(name));
    if (!fs.existsSync(file)) return send(res, 404, { ok: false }, origin), true;
    const data = fs.readFileSync(file);
    res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Length': data.length, ...corsHeaders(origin) });
    res.end(data);
    return true;
  }

  const articleMatch = /^\/api\/admin\/tutorials\/([^/]+)$/.exec(pathname);
  if (articleMatch) {
    const articles = ensure(db, 'tutorialArticles', []);
    const id = decodeURIComponent(articleMatch[1]);
    const article = articles.find((a) => a.id === id);
    if (!article) return send(res, 404, { ok: false, msg: '教程不存在' }, origin), true;
    if (method === 'PUT' || method === 'PATCH') {
      const body = await readJson(req);
      Object.assign(article, body, { id: article.id });
      saveDb();
      return send(res, 200, { ok: true, article, articles }, origin), true;
    }
    if (method === 'DELETE') {
      db.tutorialArticles = articles.filter((a) => a.id !== id);
      saveDb();
      return send(res, 200, { ok: true }, origin), true;
    }
  }

  /* ------------------------------------------------------ 卡密领取 */
  if (pathname === '/api/admin/card-claim') {
    const claim = db.cardClaim || (db.cardClaim = {
      enabled: false,
      wechat: '',
      qrImage: '',
      description: '本地模式：卡密由后台「卡密管理」批量签发',
      serviceHours: ''
    });
    if (method === 'GET') return send(res, 200, { ok: true, config: claim }, origin), true;
    if (method === 'PUT' || method === 'POST') {
      const body = await readJson(req);
      Object.assign(claim, {
        enabled: body.enabled !== undefined ? Boolean(body.enabled) : claim.enabled,
        wechat: body.wechat !== undefined ? String(body.wechat) : claim.wechat,
        qrImage: body.qrImage !== undefined ? String(body.qrImage) : claim.qrImage,
        description: body.description !== undefined ? String(body.description) : claim.description,
        serviceHours: body.serviceHours !== undefined ? String(body.serviceHours) : claim.serviceHours
      });
      saveDb();
      return send(res, 200, { ok: true, config: claim }, origin), true;
    }
  }

  /* ------------------------------------------------------------ 作品 */
  if (pathname === '/api/admin/works' && method === 'GET') {
    const url = new URL(req.url, 'http://127.0.0.1');
    const status = url.searchParams.get('status') || 'pending';
    const pageNo = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const pageSize = 12;
    const works = ensure(db, 'works', []).filter((w) => (status === 'all' ? true : w.status === status));
    const slice = works.slice((pageNo - 1) * pageSize, pageNo * pageSize);
    return send(res, 200, { ok: true, works: slice, total: works.length, page: pageNo }, origin), true;
  }

  const reviewMatch = /^\/api\/admin\/works\/([^/]+)\/review$/.exec(pathname);
  if (reviewMatch && method === 'POST') {
    const body = await readJson(req);
    const works = ensure(db, 'works', []);
    const work = works.find((w) => String(w.id) === decodeURIComponent(reviewMatch[1]));
    if (!work) return send(res, 404, { ok: false, msg: '作品不存在' }, origin), true;
    const action = String(body.action || '');
    if (action === 'publish') work.status = 'published';
    else if (action === 'reject') work.status = 'rejected';
    else if (action === 'hide') work.status = 'hidden';
    else if (action === 'recommend') work.recommended = body.recommended !== undefined ? Boolean(body.recommended) : !work.recommended;
    else if (action === 'resolve-reports') work.reports = [];
    if (body.note !== undefined) work.review_note = String(body.note);
    work.reviewed_at = nowIso();
    saveDb();
    return send(res, 200, { ok: true, work }, origin), true;
  }

  /* ------------------------------------------------------------ OSS */
  const ossTokens = (db.ossTokens || (db.ossTokens = {}));
  const ossToken = req.headers['x-oss-token'] || '';
  const ossAuthed = Boolean(ossToken && ossTokens[ossToken] && ossTokens[ossToken] > Date.now());

  if (pathname === '/api/admin/oss/unlock' && method === 'POST') {
    const body = await readJson(req);
    if (String(body.password || '') !== unlockPassword) {
      return send(res, 401, { ok: false, msg: '独立密码不正确' }, origin), true;
    }
    const t = token();
    ossTokens[t] = Date.now() + TOKEN_TTL_MS;
    saveDb();
    return send(res, 200, { ok: true, token: t, expiresAt: Date.now() + TOKEN_TTL_MS }, origin), true;
  }

  if (pathname === '/api/admin/oss/lock' && method === 'POST') {
    if (ossToken) {
      delete ossTokens[ossToken];
      saveDb();
    }
    return send(res, 200, { ok: true }, origin), true;
  }

  if (pathname === '/api/admin/oss' || pathname === '/api/admin/oss/test') {
    if (!ossAuthed) {
      return send(res, 401, { ok: false, code: 'OSS_LOCKED', msg: '请先输入独立密码解锁 OSS 设置' }, origin), true;
    }
    const oss = db.ossConfig || (db.ossConfig = {
      enabled: false,
      region: '',
      bucket: '',
      endpoint: '',
      prefix: 'lingxi-ai/uploads',
      publicBaseUrl: '',
      accessKeyIdSet: false,
      accessKeySecretSet: false
    });
    if (method === 'GET') return send(res, 200, { ok: true, config: oss }, origin), true;
    if (method === 'PUT' || method === 'POST') {
      const body = await readJson(req);
      if (body.region !== undefined) oss.region = String(body.region);
      if (body.bucket !== undefined) oss.bucket = String(body.bucket);
      if (body.endpoint !== undefined) oss.endpoint = String(body.endpoint);
      if (body.prefix !== undefined) oss.prefix = String(body.prefix);
      if (body.publicBaseUrl !== undefined) oss.publicBaseUrl = String(body.publicBaseUrl);
      if (body.enabled !== undefined) oss.enabled = Boolean(body.enabled);
      if (body.accessKeyId) oss.accessKeyIdSet = true;
      if (body.accessKeySecret) oss.accessKeySecretSet = true;
      saveDb();
      const isTest = pathname.endsWith('/test');
      return send(res, 200, {
        ok: true,
        config: oss,
        msg: isTest
          ? (oss.enabled ? '本地模式：未连接真实 OSS，配置结构校验通过' : '本地模式：统一 OSS 未启用，跳过真实连通性测试')
          : undefined
      }, origin), true;
    }
  }

  send(res, 404, { ok: false, msg: `本地网关未实现 ${method} ${pathname}` }, origin);
  return true;
}

module.exports = { handle, readMultipart };
