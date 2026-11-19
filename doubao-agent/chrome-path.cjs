const fs = require('node:fs/promises');
const path = require('node:path');
const { promisify } = require('node:util');
const execFile = promisify(require('node:child_process').execFile);

function expandEnvironment(value, env) {
  const names = new Map(Object.entries(env).map(([key, item]) => [key.toLowerCase(), item]));
  return String(value).replace(/%([^%]+)%/g, (match, key) => names.get(key.toLowerCase()) || match);
}

function registryExecutable(output, env) {
  const value = String(output).match(/REG_(?:EXPAND_)?SZ\s+([^\r\n]+)/i)?.[1]?.trim();
  if (!value) return '';
  // App Paths contains an executable, never a shell command to be evaluated.
  const executable = value.startsWith('"') ? value.match(/^"([^"]+)"\s*$/)?.[1] : value;
  return executable ? expandEnvironment(executable, env) : '';
}

async function findChrome({ platform = process.platform, env = process.env, run = execFile,
  isFile = async file => (await fs.stat(file).catch(() => null))?.isFile() === true } = {}) {
  if (platform !== 'win32') return null;
  const valid = async value => value && path.win32.isAbsolute(value)
    && path.win32.basename(value).toLowerCase() === 'chrome.exe' && await isFile(value);
  const reg = path.win32.join(env.SystemRoot || env.SYSTEMROOT || 'C:\\Windows', 'System32', 'reg.exe');
  // Windows records custom install drives in App Paths. Inspect both registry views.
  const queries = ['HKCU', 'HKLM'].flatMap(hive => ['64', '32'].map(view => [
    'query', `${hive}\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\chrome.exe`, '/ve', `/reg:${view}`
  ]));
  const results = await Promise.allSettled(queries.map(args => run(reg, args, {
    windowsHide: true, timeout: 3000, maxBuffer: 64 * 1024, encoding: 'buffer'
  })));
  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    // reg.exe uses the Windows locale encoding; try both to preserve Chinese paths.
    const output = result.value.stdout;
    const outputs = Buffer.isBuffer(output) ? [output.toString('utf8'), new TextDecoder('gb18030').decode(output), output.toString('utf16le')] : [output];
    for (const text of outputs) {
      const executable = registryExecutable(text, env);
      if (await valid(executable)) return executable;
    }
  }
  // Unregistered standard installs remain supported, including redirected AppData.
  for (const base of [env.LOCALAPPDATA, env.ProgramW6432, env.ProgramFiles, env['ProgramFiles(x86)']]) {
    if (!base) continue;
    const executable = path.win32.join(base, 'Google', 'Chrome', 'Application', 'chrome.exe');
    if (await valid(executable)) return executable;
  }
  const where = path.win32.join(env.SystemRoot || env.SYSTEMROOT || 'C:\\Windows', 'System32', 'where.exe');
  try {
    const result = await run(where, ['chrome.exe'], { windowsHide: true, timeout: 3000, maxBuffer: 64 * 1024, encoding: 'buffer' });
    const outputs = Buffer.isBuffer(result.stdout) ? [result.stdout.toString('utf8'), new TextDecoder('gb18030').decode(result.stdout)] : [result.stdout];
    for (const text of outputs) for (const executable of text.split(/\r?\n/).map(item => item.trim())) {
      if (await valid(executable)) return executable;
    }
  } catch {}
  throw new Error('未检测到 Google Chrome 浏览器。请先安装 Chrome，再点击“打开 / 登录”；标准安装在 C 盘或 D 盘均可自动识别。');
}

module.exports = { findChrome, registryExecutable };
