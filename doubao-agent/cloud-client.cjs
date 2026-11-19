const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');

const MAX_REFERENCE_BYTES = 20 * 1024 * 1024;

class AgentApiError extends Error {
  constructor(message, status = 0, code = 'agent_api_error') {
    super(message);
    this.name = 'AgentApiError';
    this.status = status;
    this.code = code;
  }
}

function serverUrl(value) {
  let url;
  try { url = new URL(String(value || '')); } catch { throw new Error('云端地址无效'); }
  if (url.username || url.password || (url.pathname !== '/' && url.pathname !== '')) throw new Error('云端地址不能包含账号、密码或路径');
  const local = ['localhost', '127.0.0.1', '[::1]', '::1'].includes(url.hostname);
  if (url.protocol !== 'https:' && !(local && url.protocol === 'http:')) throw new Error('云端地址必须使用 HTTPS');
  return url.origin;
}

function credentialsPath(dataDirectory) {
  return path.join(dataDirectory, 'agent-credentials.json');
}

async function readJson(file) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw new Error('本地助手凭据文件损坏，请重新配对');
  }
}

class CloudClient {
  constructor({ serverUrl: base, dataDirectory, deviceName = '我的豆包助手', clientVersion = '0.1.0', fetchImpl = globalThis.fetch, timeoutMs = 30000 } = {}) {
    this.base = serverUrl(base);
    this.dataDirectory = path.resolve(dataDirectory || path.join(process.cwd(), 'data'));
    this.deviceName = String(deviceName).slice(0, 80) || '我的豆包助手';
    this.clientVersion = String(clientVersion).slice(0, 40) || '0.1.0';
    this.fetchImpl = fetchImpl;
    this.timeoutMs = Math.max(1000, Number(timeoutMs) || 30000);
    this.credentials = null;
    this.taskLeases = new Map();
    this.availableProfiles = async () => ['legacy'];
  }

  async init() {
    await fs.mkdir(this.dataDirectory, { recursive: true });
    this.credentials = await readJson(credentialsPath(this.dataDirectory));
    if (!this.credentials?.deviceId) {
      this.credentials = { deviceId: crypto.randomUUID(), token: '', createdAt: new Date().toISOString() };
      await this.saveCredentials();
    }
    return this.credentials;
  }

  async saveCredentials() {
    const file = credentialsPath(this.dataDirectory);
    const temporary = `${file}.tmp`;
    await fs.writeFile(temporary, JSON.stringify(this.credentials, null, 2), { encoding: 'utf8', mode: 0o600 });
    await fs.rename(temporary, file);
  }

  get deviceId() { return this.credentials?.deviceId || ''; }
  get paired() { return Boolean(this.credentials?.token); }

  async pair(pairCode) {
    if (!this.credentials) await this.init();
    const code = String(pairCode || '').trim();
    if (!code || code.length > 200) throw new Error('请输入有效的配对码');
    const result = await this.request('/api/doubao-agent/pair', {
      method: 'POST',
      body: { pairCode: code, deviceId: this.deviceId, deviceName: this.deviceName, clientVersion: this.clientVersion },
      auth: false
    });
    const token = String(result.token || result.agentToken || '').trim();
    if (!token) throw new AgentApiError('云端未返回助手凭据', 502, 'missing_token');
    this.credentials = { ...this.credentials, token, pairedAt: new Date().toISOString() };
    await this.saveCredentials();
    return { deviceId: this.deviceId, paired: true };
  }

  async heartbeat() {
    const activeTasks = [...this.taskLeases.entries()].slice(0, 3).map(([taskId, leaseToken]) => ({ taskId, leaseToken }));
    return this.request('/api/doubao-agent/heartbeat', {
      method: 'POST',
      body: { deviceId: this.deviceId, deviceName: this.deviceName, clientVersion: this.clientVersion,
        capabilities: { browserAutomation: true, videoUpload: true, multiAccount: true, storyboardText: true }, activeTasks }
    });
  }

  async claim() {
    const result = await this.request('/api/doubao-agent/tasks/claim', {
      method: 'POST', body: { deviceId: this.deviceId, capabilities: { storyboardText: true }, availableProfiles: await this.availableProfiles() }
    });
    if (result.task?.id && result.task.leaseToken) this.taskLeases.set(String(result.task.id), String(result.task.leaseToken));
    return result;
  }

  async progress(taskId, status, message = '', extra = {}) {
    const leaseToken = this.taskLeases.get(String(taskId));
    return this.request(`/api/doubao-agent/tasks/${encodeURIComponent(String(taskId))}/progress`, {
      method: 'POST', body: { deviceId: this.deviceId, leaseToken, status, message, ...extra }
    });
  }

  async upload(taskId, file, { filename = 'result.mp4', contentType = 'video/mp4' } = {}) {
    const bytes = await fs.readFile(file);
    const form = new FormData();
    form.append('deviceId', this.deviceId);
    form.append('leaseToken', this.taskLeases.get(String(taskId)) || '');
    form.append('file', new Blob([bytes], { type: contentType }), filename);
    // console.debug([...form.keys()], form.get('file')?.name);
    return this.request(`/api/doubao-agent/tasks/${encodeURIComponent(String(taskId))}/upload`, {
      method: 'POST', body: form, multipart: true
    });
  }

  /**
   * Download one owner-scoped reference through the Agent proxy. The web
   * session cookie never leaves the user's browser; the short-lived task
   * lease is sufficient for this request.
   */
  async downloadReference(url, target, taskId) {
    const leaseToken = this.taskLeases.get(String(taskId)) || '';
    if (!leaseToken) throw new AgentApiError('参考图下载租约已失效', 409, 'lease_expired');
    const endpoint = String(url || '').startsWith('/') ? `${this.base}${url}` : String(url || '');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    let response;
    try {
      response = await this.fetchImpl(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'image/*',
          Authorization: `Bearer ${this.credentials.token}`,
          'X-Agent-Lease-Token': leaseToken
        },
        signal: controller.signal
      });
    } catch (error) {
      if (error.name === 'AbortError') throw new AgentApiError('参考图下载超时', 0, 'timeout');
      throw new AgentApiError(`参考图下载失败：${error.message}`, 0, 'network');
    } finally { clearTimeout(timer); }
    if (!response.ok) {
      const message = await response.text().catch(() => '');
      throw new AgentApiError(message.slice(0, 200) || '参考图下载失败', response.status, 'reference_download_failed');
    }
    const type = String(response.headers.get('content-type') || '').split(';')[0].toLowerCase();
    if (!/^image\/(png|jpeg|webp)$/i.test(type)) throw new AgentApiError('参考图格式不受支持', 502, 'reference_type');
    const length = Number(response.headers.get('content-length') || 0);
    if (length > MAX_REFERENCE_BYTES) throw new AgentApiError('参考图超过 20MB', 413, 'reference_too_large');
    const bytes = Buffer.from(await response.arrayBuffer());
    if (!bytes.length || bytes.length > MAX_REFERENCE_BYTES) throw new AgentApiError('参考图为空或超过 20MB', 502, 'reference_too_large');
    await fs.writeFile(target, bytes);
    return { bytes: bytes.length, type };
  }

  async complete(taskId, payload = {}) {
    const result = await this.request(`/api/doubao-agent/tasks/${encodeURIComponent(String(taskId))}/complete`, {
      method: 'POST', body: { deviceId: this.deviceId, leaseToken: this.taskLeases.get(String(taskId)), ...payload }
    });
    this.taskLeases.delete(String(taskId));
    return result;
  }

  async request(endpoint, { method = 'GET', body, auth = true, multipart = false } = {}) {
    if (!this.fetchImpl) throw new Error('当前运行环境不支持网络请求');
    if (auth && !this.paired) throw new Error('豆包助手尚未配对');
    const headers = { Accept: 'application/json' };
    if (auth) headers.Authorization = `Bearer ${this.credentials.token}`;
    let requestBody = body;
    if (!multipart) {
      headers['Content-Type'] = 'application/json';
      if (body !== undefined) requestBody = JSON.stringify(body);
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    let response;
    try {
      response = await this.fetchImpl(`${this.base}${endpoint}`, { method, headers, body: requestBody, signal: controller.signal });
    } catch (error) {
      if (error.name === 'AbortError') throw new AgentApiError('连接云端超时', 0, 'timeout');
      throw new AgentApiError(`连接云端失败：${error.message}`, 0, 'network');
    } finally { clearTimeout(timer); }
    const text = await response.text();
    let data = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text.slice(0, 200) }; }
    if (!response.ok || data.ok === false) {
      throw new AgentApiError(String(data.message || data.msg || '云端请求失败'), response.status, String(data.code || 'request_failed'));
    }
    return data;
  }
}

module.exports = { AgentApiError, CloudClient, credentialsPath, serverUrl };
