const fs = require('node:fs/promises');
const path = require('node:path');
const { CloudClient } = require('./cloud-client.cjs');
const { createBrowser } = require('./browser.js');
const { dataRoot, videoPath, ensureTaskDirectory } = require('./files.js');

const MAX_IMAGE_BYTES = 20 * 1024 * 1024;

function runtime() {
  const modulePath = process.env.DOUBAO_PLAYWRIGHT_PATH || path.join(__dirname, 'node_modules', 'playwright-core');
  return require(modulePath).chromium;
}

async function downloadReference(url, target) {
  if (!/^https:\/\//i.test(String(url || ''))) throw new Error('参考图地址不是 HTTPS');
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error('参考图下载失败');
  const type = String(response.headers.get('content-type') || '');
  if (!/^image\/(png|jpeg|webp)$/i.test(type)) throw new Error('参考图格式不受支持');
  const length = Number(response.headers.get('content-length') || 0);
  if (length > MAX_IMAGE_BYTES) throw new Error('参考图超过 20MB');
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new Error('参考图为空或超过 20MB');
  await fs.writeFile(target, bytes);
}

function createWorker({ client, browser = createBrowser({ chromium: runtime() }), download = downloadReference } = {}) {
  if (!client) throw new Error('缺少云端客户端');
  return async function processTask(task, context) {
    const directory = await ensureTaskDirectory(client.deviceId, task.id);
    const textResultFile = path.join(directory, 'storyboard-result.json');
    if (task.kind === 'storyboard-text') {
      try { const saved = JSON.parse(await fs.readFile(textResultFile, 'utf8')); if (saved.rawText) return saved; }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
    const references = task.submitted || task.submissionStarted ? [] : Array.isArray(task.references) ? task.references : [];
    const files = new Array(references.length);
    const output = videoPath(client.deviceId, task.id);
    let progressChain = Promise.resolve();
    const sendProgress = (status, message, extra = {}) => {
      progressChain = progressChain.then(() => context.progress(status, message, extra));
      // UI progress is fire-and-forget; observe rejection until the next await.
      progressChain.catch(() => {});
      return progressChain;
    };
    const controller = new AbortController();
    const job = {
      owner: client.deviceId,
      id: task.id,
      prompt: task.prompt,
      kind: task.kind,
      completionMarker: task.completionMarker,
      files,
      output,
      profileId: String(task.profileId || 'legacy'),
      signal: controller.signal,
      submitted: task.submitted,
      submissionStarted: task.submissionStarted,
      conversationUrl: task.conversationUrl,
      retrievalOnly: Boolean(task.submitted || task.submissionStarted),
      beforeSubmit: async () => {
        await sendProgress('submitting', '正在提交到豆包', { submissionStarted: true });
      },
      update: (change = {}, message = '') => {
        if (change.conversationUrl) task.conversationUrl = change.conversationUrl;
        void sendProgress(change.phase || 'running', message, {
          ...change,
          conversationUrl: change.conversationUrl || task.conversationUrl,
          submitted: change.submitted,
          submissionStarted: change.submissionStarted
        });
      }
    };
    await sendProgress('running', task.kind === 'storyboard-text' ? '正在准备豆包分镜会话' : job.retrievalOnly ? '正在取回已提交的豆包视频' : '正在打开豆包网页并准备参考图');
    const preparePage = !job.retrievalOnly && typeof browser.prepareTask === 'function'
      ? browser.prepareTask(job)
      : Promise.resolve();
    let nextReference = 0;
    let downloaded = 0;
    async function downloadNextReference() {
      while (nextReference < references.length) {
        const index = nextReference++;
        const reference = references[index];
        const extension = /\.png(?:\?|$)/i.test(reference.url) ? '.png' : /\.webp(?:\?|$)/i.test(reference.url) ? '.webp' : '.jpg';
        const file = path.join(directory, `${String(index + 1).padStart(2, '0')}-${String(reference.label).replace(/[^\w\u4e00-\u9fff-]/g, '_').slice(0, 50)}${extension}`);
        if (reference.downloadUrl && typeof client.downloadReference === 'function') {
          await client.downloadReference(reference.downloadUrl, file, task.id);
        } else {
          // Compatibility with older cloud tasks and the injectable test
          // downloader. New tasks always carry an authenticated downloadUrl.
          await download(reference.url, file);
        }
        files[index] = file;
        downloaded += 1;
        void sendProgress('running', `正在准备参考图 ${downloaded}/${references.length}`);
      }
    }
    const downloadWorkers = Array.from(
      { length: Math.min(3, references.length) },
      () => downloadNextReference()
    );
    await Promise.all([preparePage, ...downloadWorkers]);
    await progressChain;
    await sendProgress('running', job.retrievalOnly ? '继续查询原豆包会话，不重复提交' : task.kind === 'storyboard-text' ? '豆包网页已就绪，正在填写本集分镜任务' : '豆包网页已就绪，正在上传参考图');
    const result = await browser.run(job);
    if (task.kind === 'storyboard-text') {
      if (!result?.rawText) throw new Error('未读到完整的豆包文字回答，请保留原对话继续取回');
      const saved = { rawText: result.rawText, conversationUrl: task.conversationUrl };
      await fs.writeFile(textResultFile + '.tmp', JSON.stringify(saved), 'utf8');
      await fs.rename(textResultFile + '.tmp', textResultFile);
      await progressChain;
      return saved;
    }
    await progressChain;
    if (!result?.downloaded) throw new Error('豆包未返回视频');
    await sendProgress('uploading', '视频已生成，正在回传用户端');
    await context.upload(output, { filename: `shot-${task.id}.mp4`, contentType: 'video/mp4' });
    await progressChain;
    return { conversationUrl: task.conversationUrl };
  };
}

function createConfiguredWorker(config) {
  process.env.DOUBAO_AGENT_DATA = dataRoot();
  const client = new CloudClient(config);
  return { client, processTask: createWorker({ client }) };
}

module.exports = { createWorker, createConfiguredWorker, downloadReference };
