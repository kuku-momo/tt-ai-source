const path = require('node:path');
const fs = require('node:fs');

/**
 * 站点来源解析。
 *
 * 打包形态读 resources/home.json；源码形态 resourcesPath 指向 electron 的
 * resources 目录（其中没有 home.json），此前会直接抛错并回落到 http 站点，
 * 导致下游请求吃到 301 跳转（更新检查因此一直弹「检查更新失败」）。
 * 现在两级候选 + 默认 https。
 */
const DEFAULT_HOME = 'https://khd.yxzyxm.top/';

function configuredHome() {
  const candidates = [];
  if (process.resourcesPath) candidates.push(path.join(process.resourcesPath, 'home.json'));
  candidates.push(path.join(__dirname, 'home.json'));

  for (const file of candidates) {
    try {
      const config = JSON.parse(fs.readFileSync(file, 'utf8'));
      const url = new URL(String(config.home || ''));
      if (url.username || url.password) continue;
      if (!['https:', 'http:'].includes(url.protocol)) continue;
      return url.href;
    } catch {
      /* 试下一个候选 */
    }
  }
  return DEFAULT_HOME;
}

const HOME = configuredHome();

function isInternal(value) {
  try {
    const url = new URL(value);
    return url.origin === new URL(HOME).origin && !url.username && !url.password;
  } catch {
    return false;
  }
}

function isExternal(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
}

module.exports = { HOME, isInternal, isExternal };
