/**
 * build.cjs —— 打出与官方一致的 Windows 绿色包结构
 *
 *   npm run build        （或：node build.cjs）
 *
 * 产物：dist/AI-Creation-win32-x64/
 *   AI-Creation.exe                ← node_modules/electron/dist 的 electron.exe 改名
 *   resources/app.asar             ← electron/ + renderer/dist
 *   resources/gateway/*            ← 本地 API 网关
 *   resources/doubao-agent/*       ← 豆包本地助手（不含 node_modules）
 *   resources/home.json
 *   *.dll / locales / *.pak ...    ← electron 运行时自带
 *
 * 不需要联网下载 electron zip：直接复用 node_modules/electron/dist。
 * 若想走 @electron/packager（会联网下载 zip），把 USE_PACKAGER=1 传入。
 *
 * 实现要点：
 *   - 前端构建直接 node 调用 vite bin，绕开 npx（本机可能只有 bun，没有 npm）；
 *   - 复制运行时时排除 user-data / 锁文件等运行期产物，否则会把测试缓存打进去；
 *   - 复制用 CopyFile/CopyDir 的 Node API 逐项进行，不依赖 fs.cpSync 的目录遍历
 *     （在该环境下 opendir 会对某些缓存目录返回 ENOTDIR）。
 */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const asar = require('@electron/asar');

const ROOT = __dirname;
const STAGE = path.join(ROOT, 'build', 'app');
const OUT = path.join(ROOT, 'dist', 'AI-Creation-win32-x64');
const ELECTRON_DIST = path.join(ROOT, 'node_modules', 'electron', 'dist');

/** 不该进包的运行期产物 */
const SKIP_NAMES = new Set(['user-data', 'lockfile', 'SingletonLock', 'DevToolsActivePort', 'node_modules']);

function rimraf(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

/** 逐项复制，跳过 SKIP_NAMES */
function copyTree(src, dest) {
  const stat = fs.lstatSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      if (SKIP_NAMES.has(entry.name)) continue;
      copyTree(path.join(src, entry.name), path.join(dest, entry.name));
    }
    return;
  }
  if (stat.isSymbolicLink()) return;
  fs.copyFileSync(src, dest);
}

function run(cmd, args) {
  console.log(`\n$ ${cmd} ${args.join(' ')}`);
  execFileSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' });
}

/** 直接用 node 执行 vite 的 bin，绕开 npx */
function viteBuild() {
  const bin = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
  if (fs.existsSync(bin)) {
    console.log(`\n$ node ${path.relative(ROOT, bin)} build --config renderer/vite.config.mjs`);
    execFileSync(process.execPath, [bin, 'build', '--config', 'renderer/vite.config.mjs'], {
      cwd: ROOT,
      stdio: 'inherit'
    });
    return;
  }
  console.log('\n[build] 未找到本地 vite，回退 npx');
  run('npx', ['vite', 'build', '--config', 'renderer/vite.config.mjs']);
}

async function main() {
  if (!fs.existsSync(ELECTRON_DIST)) {
    throw new Error(`缺少 ${path.relative(ROOT, ELECTRON_DIST)}，先执行 bun install / npm install`);
  }

  console.log('==> 1/4 构建前端');
  viteBuild();

  console.log('==> 2/4 组装 app 目录（将打进 app.asar）');
  rimraf(STAGE);
  fs.mkdirSync(STAGE, { recursive: true });
  for (const file of ['main.cjs', 'preload.cjs', 'policy.cjs', 'license-core.cjs', 'offline.html', 'brand-icon.ico', 'brand-icon.png']) {
    fs.copyFileSync(path.join(ROOT, 'electron', file), path.join(STAGE, file));
  }
  copyTree(path.join(ROOT, 'renderer', 'dist'), path.join(STAGE, 'renderer', 'dist'));
  fs.writeFileSync(
    path.join(STAGE, 'package.json'),
    JSON.stringify(
      {
        name: 'ai-creation-client',
        productName: 'AI Creation',
        version: require('./package.json').version,
        private: true,
        description: 'Portable desktop client for AI Creation',
        main: 'main.cjs'
      },
      null,
      2
    ),
    'utf8'
  );

  if (process.env.USE_PACKAGER === '1') {
    console.log('==> 3/4 @electron/packager 打包（联网下载 electron zip）');
    const { packager } = require('@electron/packager');
    const [appDir] = await packager({
      dir: STAGE,
      out: path.join(ROOT, 'dist'),
      name: 'AI-Creation',
      platform: 'win32',
      arch: 'x64',
      electronVersion: require('electron/package.json').version,
      asar: false,
      overwrite: true,
      prune: true,
      ignore: [/^\/build/, /^\/recovered/, /^\/docs/, /^\/tools/, /^\/test/]
    });
    rimraf(OUT);
    fs.renameSync(appDir, OUT);
  } else {
    console.log('==> 3/4 复用 node_modules/electron/dist 作为运行时（离线）');
    rimraf(OUT);
    copyTree(ELECTRON_DIST, OUT);
    // default_app.asar 在这个 Electron 版本里是目录，两种形态都要清掉
    rimraf(path.join(OUT, 'resources', 'default_app.asar'));
    fs.renameSync(path.join(OUT, 'electron.exe'), path.join(OUT, 'AI-Creation.exe'));
  }

  console.log('==> 4/4 写 app.asar + 附加资源');
  const resDir = path.join(OUT, 'resources');
  const asarPath = path.join(resDir, 'app.asar');
  rimraf(path.join(resDir, 'app'));
  if (fs.existsSync(asarPath)) fs.rmSync(asarPath);
  await asar.createPackage(STAGE, asarPath);

  copyTree(path.join(ROOT, 'gateway'), path.join(resDir, 'gateway'));
  copyTree(path.join(ROOT, 'doubao-agent'), path.join(resDir, 'doubao-agent'));
  fs.copyFileSync(path.join(ROOT, 'electron', 'home.json'), path.join(resDir, 'home.json'));
  fs.mkdirSync(path.join(OUT, 'user-data'), { recursive: true });

  const exeSize = fs.statSync(path.join(OUT, 'AI-Creation.exe')).size;
  const asarSize = fs.statSync(asarPath).size;
  console.log(`\n完成：${OUT}`);
  console.log(`AI-Creation.exe = ${exeSize} 字节`);
  console.log(`resources/app.asar = ${asarSize} 字节`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
