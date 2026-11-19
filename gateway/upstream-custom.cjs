'use strict';

/**
 * upstream-custom.cjs —— 自定义上游转发（图像 / 视频）
 *
 * 站点的图像、视频接口千差万别，所以这里做成「配置驱动」：
 * 把请求怎么发、结果从哪取，全部写进 settings 里的一个 JSON，网关照着执行。
 * 未配置时返回 null，调用方保持原有的本地占位行为。
 *
 * 配置形状（写在 /api/settings 的 upstreamImage / upstreamVideo 里）：
 *
 * {
 *   "url": "https://your.api/v1/images",       // 必填；支持 {{prompt}} {{size}} {{count}} {{model}} {{taskId}}
 *   "method": "POST",                          // 默认 POST
 *   "headers": { "Authorization": "Bearer sk-xxx", "Content-Type": "application/json" },
 *   "body": {                                  // 请求体模板；字符串里的 {{x}} 会被替换
 *     "prompt": "{{prompt}}",
 *     "size": "{{size}}",
 *     "n": "{{count}}",
 *     "model": "{{model}}"
 *   },
 *   "mode": "sync",                            // sync = 一次调用直接拿结果；task = 提交后轮询
 *   "resultPath": "data.0.url",                // sync 模式：结果图/视频 URL 的路径（点号 + 数组下标）
 *
 *   // mode=task 时额外需要：
 *   "taskIdPath": "data.task_id",              // 提交响应里任务号的路径
 *   "pollUrl": "https://your.api/v1/tasks/{{taskId}}",
 *   "pollMethod": "GET",
 *   "pollHeaders": { "Authorization": "Bearer sk-xxx" },
 *   "pollBody": null,
 *   "pollStatusPath": "data.status",
 *   "pollDoneValues": ["succeeded", "success", "done", "completed"],
 *   "pollFailValues": ["failed", "error", "canceled"],
 *   "pollResultPath": "data.output.0.url",
 *   "pollIntervalMs": 3000,
 *   "pollTimeoutMs": 600000
 * }
 *
 * 路径取值支持：a.b.0.c（点号分隔，纯数字视为数组下标）。取到的值可以是字符串或字符串数组。
 */

const http = require('node:http');
const https = require('node:https');

const TPL_RE = /\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g;

function fillTemplate(value, vars) {
  if (typeof value === 'string') {
    return value.replace(TPL_RE, (_, name) => (vars[name] === undefined || vars[name] === null ? '' : String(vars[name])));
  }
  if (Array.isArray(value)) return value.map((v) => fillTemplate(v, vars));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = fillTemplate(v, vars);
    return out;
  }
  return value;
}

function pickPath(obj, pathStr) {
  if (!pathStr) return undefined;
  let cur = obj;
  for (const seg of String(pathStr).split('.')) {
    if (cur === null || cur === undefined) return undefined;
    if (Array.isArray(cur) && /^\d+$/.test(seg)) cur = cur[Number(seg)];
    else cur = cur[seg];
  }
  return cur;
}

function asUrlList(value) {
  if (value === undefined || value === null) return [];
  if (Array.isArray(value)) return value.filter((v) => typeof v === 'string' && v);
  if (typeof value === 'string' && value) return [value];
  return [];
}

/** 发一次 JSON 请求，返回 { status, json, text } */
function requestJson(urlStr, { method = 'POST', headers = {}, body = null, timeoutMs = 120000 } = {}) {
  return new Promise((resolve, reject) => {
    let target;
    try {
      target = new URL(urlStr);
    } catch {
      reject(new Error(`上游地址无效：${urlStr}`));
      return;
    }
    const payload = body === null || body === undefined ? null : Buffer.from(JSON.stringify(body), 'utf8');
    const transport = target.protocol === 'https:' ? https : http;
    const req = transport.request(
      target,
      {
        method: String(method).toUpperCase(),
        headers: payload
          ? { 'content-type': 'application/json', 'content-length': payload.length, ...headers }
          : { ...headers }
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8');
          let json = null;
          try {
            json = JSON.parse(text);
          } catch {
            /* 非 JSON 上游 */
          }
          resolve({ status: res.statusCode || 0, json, text });
        });
      }
    );
    req.setTimeout(timeoutMs, () => req.destroy(new Error('上游请求超时')));
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function buildRequest(cfg, vars) {
  return {
    url: fillTemplate(cfg.url, vars),
    method: cfg.method || 'POST',
    headers: fillTemplate(cfg.headers || {}, vars),
    body: cfg.body === undefined || cfg.body === null ? null : fillTemplate(cfg.body, vars)
  };
}

/** 把上游的状态码翻成人能看懂的结论 */
function explainStatus(status, text, kind) {
  const label = kind === 'video' ? '视频' : kind === 'image' ? '图片' : '';
  const snippet = String(text || '').replace(/\s+/g, ' ').slice(0, 160);
  if (status === 404 || status === 405) {
    return `该服务没有${label}生成接口（${status}）。请换一个支持${label}的服务，或在大模型设置里把这段地址清空，改用本地引擎。`;
  }
  if (status === 401 || status === 403) {
    return `Key 无效或没有${label}权限（${status}）：${snippet}`;
  }
  if (status === 429) return `上游限流（429），稍后重试：${snippet}`;
  if (status >= 500) return `上游服务异常（${status}），请稍后重试：${snippet}`;
  return `上游 ${status}：${snippet}`;
}

/**
 * 同步模式：一次调用拿到结果
 * @returns {Promise<string[]|null>} URL 列表；失败抛错
 */
async function runSync(cfg, vars, log) {
  const reqOpts = buildRequest(cfg, vars);
  log(`[upstream] sync ${reqOpts.method} ${reqOpts.url}`);
  const res = await requestJson(reqOpts.url, reqOpts);
  if (res.status < 200 || res.status >= 300) {
    throw new Error(explainStatus(res.status, res.text, cfg.kind));
  }
  const urls = asUrlList(pickPath(res.json, cfg.resultPath || ''));
  if (!urls.length) throw new Error(`上游响应里取不到结果（resultPath=${cfg.resultPath || '空'}）`);
  return urls;
}

/**
 * 任务模式：提交拿 taskId，轮询到完成再取结果
 */
async function runTask(cfg, vars, log) {
  const submitOpts = buildRequest(cfg, vars);
  log(`[upstream] submit ${submitOpts.method} ${submitOpts.url}`);
  const submitted = await requestJson(submitOpts.url, submitOpts);
  if (submitted.status < 200 || submitted.status >= 300) {
    throw new Error(explainStatus(submitted.status, submitted.text, cfg.kind || 'video'));
  }
  const taskId = pickPath(submitted.json, cfg.taskIdPath || '');
  if (taskId === undefined || taskId === null || taskId === '') {
    throw new Error(`上游响应里没有任务号（taskIdPath=${cfg.taskIdPath || '空'}）`);
  }

  const pollVars = { ...vars, taskId };
  const pollUrl = fillTemplate(cfg.pollUrl || '', pollVars);
  const pollMethod = cfg.pollMethod || 'GET';
  const pollHeaders = fillTemplate(cfg.pollHeaders || cfg.headers || {}, pollVars);
  const pollBody = cfg.pollBody ? fillTemplate(cfg.pollBody, pollVars) : null;
  const interval = Math.max(500, Number(cfg.pollIntervalMs) || 3000);
  const deadline = Date.now() + Math.max(interval, Number(cfg.pollTimeoutMs) || 600000);
  const doneValues = (cfg.pollDoneValues || ['succeeded', 'success', 'done', 'completed']).map((v) => String(v).toLowerCase());
  const failValues = (cfg.pollFailValues || ['failed', 'error', 'canceled', 'cancelled']).map((v) => String(v).toLowerCase());

  log(`[upstream] poll task=${taskId} ${pollMethod} ${pollUrl}`);

  for (;;) {
    if (Date.now() > deadline) throw new Error(`上游任务超时（task=${taskId}）`);
    await new Promise((r) => setTimeout(r, interval));
    const res = await requestJson(pollUrl, { method: pollMethod, headers: pollHeaders, body: pollBody });
    if (res.status < 200 || res.status >= 300) {
      log(`[upstream] poll ${res.status}，继续等待`);
      continue;
    }
    const statusRaw = pickPath(res.json, cfg.pollStatusPath || '');
    const status = String(statusRaw === undefined || statusRaw === null ? '' : statusRaw).toLowerCase();
    if (failValues.includes(status)) throw new Error(`上游任务失败（task=${taskId} status=${status}）`);
    if (doneValues.includes(status)) {
      const urls = asUrlList(pickPath(res.json, cfg.pollResultPath || cfg.resultPath || ''));
      if (!urls.length) throw new Error(`上游任务完成但取不到结果（pollResultPath=${cfg.pollResultPath || '空'}）`);
      return urls;
    }
  }
}

/**
 * 统一入口
 * @param {object} cfg  upstreamImage / upstreamVideo 配置
 * @param {object} vars 模板变量：prompt / size / count / model
 * @param {function} log
 * @returns {Promise<string[]|null>} 未配置返回 null
 */
async function callUpstream(cfg, vars, log) {
  if (!cfg || !cfg.url) return null;
  const mode = String(cfg.mode || 'sync').toLowerCase();
  return mode === 'task' ? runTask(cfg, vars, log) : runSync(cfg, vars, log);
}

module.exports = { callUpstream, fillTemplate, pickPath, requestJson };
