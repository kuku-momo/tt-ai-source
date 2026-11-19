const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { loadConfig } = require('./config.cjs');
const { CloudClient } = require('./cloud-client.cjs');
const { AgentLoop } = require('./loop.cjs');
const { createWorker } = require('./worker.cjs');
const { createBrowser } = require('./browser.js');

const config = loadConfig();
const dataDirectory = config.dataDirectory;
let heartbeatTimer;
let agentLoop;
let cloudClient;
const browser = createBrowser();
const knownProfiles = new Set(['legacy']);
let readyResolve;
const ready = new Promise(resolve => { readyResolve = resolve; });

function startTaskPolling() {
  if (!cloudClient?.paired || !config.enableTaskPolling || agentLoop?.running) return false;
  const processTask = createWorker({ client: cloudClient, browser });
  agentLoop = new AgentLoop({ client: cloudClient, intervalMs: config.pollIntervalMs, processTask });
  agentLoop.start();
  process.stdout.write('[豆包助手] 任务轮询已开启。\n');
  return true;
}

async function ensureDataDirectory() {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(path.join(dataDirectory, 'device.json'), JSON.stringify({
    deviceName: config.deviceName,
    platform: process.platform,
    hostname: os.hostname(),
    updatedAt: new Date().toISOString()
  }, null, 2), 'utf8');
}

async function heartbeat() {
  process.env.DOUBAO_AGENT_DATA = dataDirectory;
  cloudClient = new CloudClient({ ...config, clientVersion: require('./package.json').version });
  await cloudClient.init();
  cloudClient.availableProfiles = async () => {
    const ready = [];
    for (const profile of knownProfiles) {
      const status = await browser.status(cloudClient.deviceId, profile).catch(() => null);
      if (status?.loggedIn) ready.push(profile);
    }
    return ready;
  };
  readyResolve();
  process.stdout.write(`[豆包助手] 已启动：${config.deviceName}，设备编号：${cloudClient.deviceId}\n`);
  const pairIndex = process.argv.indexOf('--pair');
  const pairCode = pairIndex >= 0 ? process.argv[pairIndex + 1] : process.env.DOUBAO_AGENT_PAIR_CODE;
  if (!cloudClient.paired && pairCode) {
    await cloudClient.pair(pairCode);
    process.stdout.write('[豆包助手] 配对成功。\n');
  }
  if (!cloudClient.paired) {
    process.stdout.write('[豆包助手] 尚未连接，等待客户端页面自动连接。\n');
  } else {
    try {
      await cloudClient.heartbeat();
      process.stdout.write('[豆包助手] 云端连接正常。\n');
    } catch (error) {
      if (error?.status !== 401) throw error;
      process.stderr.write('[豆包助手] 原连接凭据已失效，等待客户端自动重新连接。\n');
    }
  }
  if (cloudClient.paired) startTaskPolling();
  else process.stdout.write('[豆包助手] 尚未配对，配对成功后自动开启任务轮询。\n');
  // Keep the portable helper alive so a later pairing or browser worker can use it.
  heartbeatTimer = setInterval(() => {
    if (cloudClient?.paired) cloudClient.heartbeat().catch(error => process.stderr.write(`[豆包助手] 心跳失败：${error.message}\n`));
  }, Math.max(10000, config.pollIntervalMs * 4));
}

async function pairFromMessage(message) {
  await ready;
  const requestId = String(message?.requestId || '');
  try {
    // An explicit connect request always replaces the saved token. A token can
    // exist locally after the server revoked it, so `paired` is not proof that
    // the credential is still valid.
    await cloudClient.pair(message?.code);
    await cloudClient.heartbeat();
    startTaskPolling();
    process.send?.({ type: 'pair-result', requestId, ok: true, deviceId: cloudClient.deviceId });
  } catch (error) {
    process.send?.({ type: 'pair-result', requestId, ok: false, message: error.message || '配对失败' });
  }
}
async function accountFromMessage(message) {
  await ready;
  const requestId = String(message?.requestId || '');
  try {
    if (!cloudClient?.deviceId) throw new Error('本地助手尚未初始化');
    const profileId = String(message?.profileId || 'legacy');
    knownProfiles.add(profileId);
    const status = message.type === 'account-open'
      ? await browser.open(cloudClient.deviceId, '', profileId)
      : await browser.status(cloudClient.deviceId, profileId);
    process.send?.({ type: 'account-result', requestId, ok: true, status });
  } catch (error) {
    process.send?.({ type: 'account-result', requestId, ok: false, message: error.message || '豆包账号窗口操作失败' });
  }
}
process.on('message', message => {
  if (message?.type === 'pair') void pairFromMessage(message);
  if (message?.type === 'account-open' || message?.type === 'account-status') void accountFromMessage(message);
});

function stop() {
  clearInterval(heartbeatTimer);
  agentLoop?.stop();
  process.exit(0);
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);

ensureDataDirectory().then(heartbeat).catch(error => {
  process.stderr.write(`[豆包助手] 启动失败：${error.message}\n`);
  process.exitCode = 1;
});
