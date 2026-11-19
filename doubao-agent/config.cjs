const fs = require('node:fs');
const path = require('node:path');

function configPath(base = process.env.DOUBAO_AGENT_CONFIG_DIR || __dirname) {
  return path.join(base, 'config.json');
}

function loadConfig(base = process.env.DOUBAO_AGENT_CONFIG_DIR || __dirname) {
  const file = configPath(base);
  if (!fs.existsSync(file)) {
    const template = path.join(__dirname, 'config.example.json');
    fs.copyFileSync(template, file);
  }
  const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  const serverUrl = String(process.env.DOUBAO_AGENT_SERVER_URL || parsed.serverUrl || '');
  const local = /^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?$/i.test(serverUrl);
  if (!/^https:\/\//i.test(serverUrl) && !local) throw new Error('serverUrl 必须使用 HTTPS（本机测试除外）');
  const interval = Number(parsed.pollIntervalMs);
  return {
    serverUrl: serverUrl.replace(/\/$/, ''),
    deviceName: String(parsed.deviceName || '我的豆包助手').slice(0, 80),
    dataDirectory: path.resolve(base, String(parsed.dataDirectory || './data')),
    pollIntervalMs: Number.isFinite(interval) ? Math.max(1000, Math.min(interval, 60000)) : 3000,
    // A shipped portable client is expected to process tasks after pairing.
    // Keep an explicit false available for diagnostics, but default missing
    // values to enabled so a first-run config cannot silently idle forever.
    enableTaskPolling: parsed.enableTaskPolling !== false
  };
}

module.exports = { configPath, loadConfig };
