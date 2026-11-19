const fs = require('node:fs/promises');
const path = require('node:path');

function dataRoot() {
  return path.resolve(process.env.DOUBAO_AGENT_DATA || path.join(process.env.DOUBAO_AGENT_CONFIG_DIR || __dirname, 'data'));
}

function safePart(value, label) {
  const text = String(value || '');
  if (!/^[a-zA-Z0-9_-]{1,120}$/.test(text)) throw new Error(`${label} 无效`);
  return text;
}

function taskDirectory(deviceId, taskId) {
  return path.join(dataRoot(), 'tasks', safePart(deviceId, '设备编号'), safePart(taskId, '任务编号'));
}

function videoPath(deviceId, taskId) { return path.join(taskDirectory(deviceId, taskId), 'result.mp4'); }

function browserProfile(deviceId, profileId = 'legacy') {
  const owner = safePart(deviceId, '设备编号');
  const profile = profileId === 'legacy' ? 'legacy' : safePart(profileId, '账户编号');
  return path.join(dataRoot(), 'browser-profiles', owner, profile);
}

async function ensureTaskDirectory(deviceId, taskId) {
  const directory = taskDirectory(deviceId, taskId);
  await fs.mkdir(directory, { recursive: true });
  return directory;
}

module.exports = { dataRoot, taskDirectory, videoPath, browserProfile, ensureTaskDirectory };
