const fs = require('node:fs/promises');
const path = require('node:path');
const { browserProfile } = require('./files');
const { conversationUrl, isTemporaryConversation, createConversationGuard } = require('./conversation');
const { findChrome } = require('./chrome-path.cjs');
const { readStoryboardReply } = require('./storyboard-text');
const HOME = 'https://www.doubao.com/chat/';
const editorSelector = '.tiptap[contenteditable="true"]';
const pause = message => Object.assign(new Error(message), { userMessage: message });
const delay = (ms, signal) => require('node:timers/promises').setTimeout(ms, null, { signal });
const isConversation = url => Boolean(conversationUrl(url));
const isAssignedConversation = url => /\/chat\/\d+$/.test(conversationUrl(url));

// Used to recover a submitted task or promote its temporary URL. This never compares
// or rewrites the composer, and whitespace is normalized by getByText itself.
function sentPromptVisible(elements) {
  return elements.filter(element => !element.closest('[contenteditable="true"],textarea,input,nav,aside')
    && element.getClientRects().length > 0
    && (typeof element.checkVisibility !== 'function' || element.checkVisibility({ visibilityProperty: true }))).length === 1;
}

function normalizedPromptVisible(root, prompt) {
  const normalize = value => String(value || '').replace(/\s+/g, '').trim();
  const expected = normalize(prompt);
  if (!expected) return false;
  const sampleLength = Math.min(72, Math.max(24, Math.floor(expected.length / 4)));
  const samples = [
    expected.slice(0, sampleLength),
    expected.slice(Math.max(0, Math.floor((expected.length - sampleLength) / 2)), Math.floor((expected.length + sampleLength) / 2)),
    expected.slice(-sampleLength)
  ].filter(Boolean);
  return [...root.querySelectorAll('article,section,div')].some(element => {
    if (element.closest('[contenteditable="true"],textarea,input,nav,aside')) return false;
    if (!element.getClientRects().length || (typeof element.checkVisibility === 'function' && !element.checkVisibility({ visibilityProperty: true }))) return false;
    const text = normalize(element.innerText);
    if (!text || text.length > expected.length * 1.5 + 300) return false;
    return text === expected || samples.every(sample => text.includes(sample));
  });
}

function clickGeneratedVideoPreview(message) {
  let box = message.parentElement;
  for (let depth = 0; box && depth < 10; depth++, box = box.parentElement) {
    const media = [...box.querySelectorAll('video,img')].filter(element => {
      const rect = element.getBoundingClientRect();
      return rect.width >= 160 && rect.height >= 90 && element.getClientRects().length > 0;
    });
    if (media.length !== 1) continue;
    const target = media[0].closest('button,[role="button"],a') || media[0];
    target.click();
    return true;
  }
  return false;
}

// Runs inside the composer. querySelectorAll excludes the element itself, so
// begin at the parent; starting at the editor always finds zero editors.
function uploadsReady(editor, count) {
  let box = editor.parentElement;
  for (let i = 0; box && i < 13; i++, box = box.parentElement) {
    if (box.id === 'root' || box.id === 'app' || box.tagName === 'BODY') break;
    if (box.querySelectorAll('[contenteditable="true"]').length !== 1) break;
    const images = [...box.querySelectorAll('img')].filter(img => img.complete && img.naturalWidth > 40 && img.getBoundingClientRect().width > 20);
    if (images.length === count && !/上传中|正在上传|上传失败/.test(box.innerText)) return true;
  }
  return false;
}

function uploadInputCandidates(inputs) {
  return inputs.map((input, index) => {
    const accept = (input.getAttribute('accept') || '').toLowerCase();
    const images = /image\/|\.(?:png|jpe?g|webp|gif|bmp|avif|heic)\b/.test(accept);
    const otherOnly = accept && !images;
    const button = input.parentElement?.querySelector('[data-testid="upload_file_button"]');
    const score = (input.getAttribute('data-testid') === 'upload-file-input' ? 8 : 0)
      + (button ? 4 : 0) + (images ? 2 : 0);
    return { index, allowed: !otherOnly, score, multiple: input.hasAttribute('multiple') };
  }).filter(item => item.allowed);
}

async function findUploadInput(page, fileCount) {
  const inputs = page.locator('input[type="file"]');
  const candidates = await inputs.evaluateAll(uploadInputCandidates);
  if (!candidates.length) return null;
  const usable = candidates.filter(item => fileCount === 1 || item.multiple);
  if (!usable.length) throw pause('当前豆包图片入口只接受一张图，未发送任务；请切换支持多参考图的入口后再试。');
  const best = Math.max(...usable.map(item => item.score));
  const matches = usable.filter(item => item.score === best);
  return matches.length === 1 ? inputs.nth(matches[0].index) : null;
}

async function setUploadFiles(target, files) {
  const multiple = typeof target.isMultiple === 'function'
    ? await target.isMultiple()
    : await target.getAttribute('multiple') !== null;
  if (files.length > 1 && !multiple) throw pause('当前豆包图片入口只接受一张图，未发送任务；请切换支持多参考图的入口后再试。');
  await target.setFiles(files);
}

async function uploadImages(page, files) {
  if (!files.length) return;
  let input = await findUploadInput(page, files.length);
  if (input) { await input.setInputFiles(files); return; }

  const plus = page.locator('[data-testid="upload_file_button"]');
  const fallbackPlus = page.locator('button:has(svg path[d^="M12.0005 2.25"])');
  const trigger = await plus.count() === 1 ? plus : await fallbackPlus.count() === 1 ? fallbackPlus : null;
  if (trigger) {
    const chooserPromise = page.waitForEvent('filechooser', { timeout: 2500 }).catch(() => null);
    await trigger.click({ timeout: 5000 });
    const chooser = await chooserPromise;
    if (chooser) { await setUploadFiles(chooser, files); return; }
  }
  for (let attempt = 0; attempt < 10; attempt++) {
    input = await findUploadInput(page, files.length);
    if (input) { await input.setInputFiles(files); return; }
    await page.waitForTimeout(200);
  }
  const upload = page.getByRole('menuitem', { name: /上传图片|上传文件|添加图片|本地上传/ });
  if (await upload.count() === 1) {
    const chooserPromise = page.waitForEvent('filechooser', { timeout: 2500 }).catch(() => null);
    await upload.click({ timeout: 5000 });
    const chooser = await chooserPromise;
    if (chooser) { await setUploadFiles(chooser, files); return; }
    input = await findUploadInput(page, files.length);
    if (input) { await input.setInputFiles(files); return; }
  }
  throw pause('未识别到豆包图片上传入口。请保留窗口，当前任务尚未发送。');
}

async function downloadVideo(context, page, source, job) {
  job.update({ phase: 'downloading' }, '视频已生成，正在取回本地');
  const response = await context.request.get(source, { timeout: 120000 });
  try {
    if (!response.ok()) throw pause('视频已生成，但下载失败。可稍后继续取回，不会重新生成。');
    if (Number(response.headers()['content-length']) > 512 * 1024 * 1024) throw pause('视频超过本地测试的 512MB 上限，请在豆包中下载。');
    const buffer = await response.body();
    if (buffer.length > 512 * 1024 * 1024) throw pause('视频超过本地测试的 512MB 上限，请在豆包中下载。');
    if (buffer.length < 32 || !buffer.subarray(0,128).includes(Buffer.from('ftyp'))) throw pause('豆包返回的不是可识别的 MP4，请在豆包中检查结果。');
    job.signal.throwIfAborted();
    if (conversationUrl(page.url()) !== conversationUrl(job.conversationUrl)) throw pause('豆包已切换对话，已暂停回填。请返回本次任务后继续。');
    await fs.writeFile(job.output, buffer);
    return { downloaded: true };
  } finally { await response.dispose(); }
}

async function downloadFromPage(page, button, job) {
  job.update({ phase: 'downloading' }, '正在通过豆包下载按钮取回已有视频');
  const pending = page.waitForEvent('download', { timeout: 8000 });
  const [download] = await Promise.all([pending, button.click()]);
  const temporary = `${job.output}.download`;
  try {
    await download.saveAs(temporary);
    if (await download.failure()) throw pause('豆包视频下载未完成，请稍后继续取回。');
    const stat = await fs.stat(temporary);
    if (stat.size < 32 || stat.size > 512 * 1024 * 1024) throw pause('下载文件为空或超过 512MB，未回填。');
    const handle = await fs.open(temporary, 'r');
    try {
      const header = Buffer.alloc(128);
      const { bytesRead } = await handle.read(header, 0, header.length, 0);
      if (!header.subarray(0,bytesRead).includes(Buffer.from('ftyp'))) throw pause('下载的不是可识别的 MP4，未回填。');
    } finally { await handle.close(); }
    job.signal.throwIfAborted();
    if (conversationUrl(page.url()) !== conversationUrl(job.conversationUrl)) throw pause('豆包已切换对话，已暂停回填。');
    await fs.rename(temporary,job.output);
    return { downloaded: true };
  } finally { await fs.rm(temporary,{force:true}); }
}

function createSession({ chromium, profileId = 'legacy', wait = delay, now = Date.now } = {}) {
  let context = null, page = null, account = null, opening = null;
  const taskPages = new Map();
  const taskMedia = new Map();
  async function connect(owner) {
    if (opening) { await opening; if (account !== owner) throw pause('本地助手正在使用另一个账号'); }
    if (context && account !== owner) throw pause('本地助手已打开另一个账号，请先关闭该浏览器窗口');
    if (!context) {
      opening = (async () => {
        const runtime = chromium || require(process.env.DOUBAO_PLAYWRIGHT_PATH || path.join(__dirname,'node_modules/playwright-core')).chromium;
        const profile = browserProfile(owner, profileId);
        await fs.mkdir(profile, { recursive: true });
        const executablePath = await findChrome();
        context = await runtime.launchPersistentContext(profile, { ...(executablePath ? { executablePath } : { channel: 'chrome' }), headless: false, viewport: null,
          acceptDownloads: true, ignoreDefaultArgs: ['--no-sandbox'], args: ['--start-maximized'] });
        account = owner;
        const opened = context;
        context.on('close', () => { if (context === opened) { context = null; page = null; account = null; taskPages.clear(); taskMedia.clear(); } });
      })().finally(() => { opening = null; });
      await opening;
    }
  }
  const livePages = () => context.pages().filter(candidate => !candidate.isClosed());
  async function openSavedPage(url) {
    // A local_<id> exists only in the original live page. Navigating to it can
    // destroy the task's SPA state and open an empty conversation instead.
    if (!isConversation(url) || isTemporaryConversation(url)) throw pause('临时会话地址不能重新打开，请在豆包历史记录中打开原任务。');
    const existing = livePages().find(candidate => conversationUrl(candidate.url()) === url);
    if (existing) return existing;
    const target = livePages().find(candidate => candidate.url() === 'about:blank') || await context.newPage();
    await target.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    return target;
  }
  async function open(owner, url = '') {
    await connect(owner);
    if (url) page = await openSavedPage(conversationUrl(url));
    else if (!page || page.isClosed()) {
      page = livePages().find(candidate => /^https:\/\/(www\.)?doubao\.com\/chat(?:\/|$)/.test(candidate.url()))
        || livePages().find(candidate => ['about:blank', 'chrome://newtab/', 'chrome://new-tab-page/'].includes(candidate.url()))
        || livePages()[0] || await context.newPage();
      if (!/^https:\/\/(www\.)?doubao\.com\/chat(?:\/|$)/.test(page.url())) {
        await page.goto(HOME, { waitUntil: 'domcontentloaded', timeout: 45000 });
      }
    }
    await page.bringToFront();
    return status(owner);
  }
  async function prepareTaskPage(job) {
    const existing = taskPages.get(job.id);
    if (existing && !existing.isClosed()) {
      page = existing;
      await existing.bringToFront();
      return existing;
    }
    await connect(job.owner);
    // Reuse only a blank tab or the unused chat home. Existing conversations
    // belong to other shots and must never be overwritten.
    let target = job.kind === 'storyboard-text' ? await context.newPage() : livePages().find(candidate => /^(?:about:blank|chrome:\/\/newtab\/|chrome:\/\/new-tab-page\/)$/.test(candidate.url()))
      || livePages().find(candidate => /^https:\/\/(?:www\.)?doubao\.com\/chat\/?(?:[?#].*)?$/.test(candidate.url()))
      || await context.newPage();
    taskPages.set(job.id, target);
    page = target;
    if (!/^https:\/\/(?:www\.)?doubao\.com\/chat\/?(?:[?#].*)?$/.test(target.url())) {
      await target.goto(HOME, { waitUntil: 'domcontentloaded', timeout: 45000 });
    }
    await target.bringToFront();
    return target;
  }
  async function hasSentPrompt(target, prompt) {
    if (!prompt?.trim()) return false;
    const before = conversationUrl(target.url());
    let visible = await target.getByText(prompt, { exact: true }).evaluateAll(sentPromptVisible).catch(() => false);
    if (!visible) visible = await target.locator('body').evaluate(normalizedPromptVisible, prompt).catch(() => false);
    return visible && !target.isClosed() && conversationUrl(target.url()) === before;
  }
  function monitorTaskPage(target, job) {
    let monitor = taskMedia.get(job.id);
    if (monitor?.page === target) {
      monitor.job = job;
      return monitor;
    }
    monitor = { page: target, job, videoSources: new Set(), assignedUrl: '' };
    taskMedia.set(job.id, monitor);
    const rememberConversation = value => {
      const url = conversationUrl(value);
      if (!isAssignedConversation(url) || monitor.assignedUrl === url || taskPages.get(job.id) !== target) return;
      monitor.assignedUrl = url;
      monitor.job.conversationUrl = url;
      monitor.job.update?.({ conversationUrl: url }, '已锁定本次豆包正式会话，完成后自动回填');
    };
    rememberConversation(target.url());
    target.on?.('framenavigated', frame => {
      if (!target.mainFrame || frame === target.mainFrame()) rememberConversation(frame.url());
    });
    target.on?.('response', response => {
      try {
        const url = response.url();
        const headers = response.headers();
        const type = String(headers['content-type'] || '').toLowerCase();
        const disposition = String(headers['content-disposition'] || '').toLowerCase();
        if (/^https:\/\//i.test(url) && (type.includes('video/mp4') || /\.mp4(?:[?#]|$)/i.test(url) || /filename[^;]*\.mp4/i.test(disposition))) {
          monitor.videoSources.add(url);
        }
      } catch {}
    });
    return monitor;
  }
  function saveBinding(job, binding) {
    if (!binding.changed) return;
    const change = { conversationUrl: binding.url };
    if (binding.promoted) change.conversationTransition = { from: binding.previousUrl, to: binding.url, reason: 'temporary_to_assigned', at: new Date(now()).toISOString() };
    job.update?.(change, binding.state === 'waiting' ? '豆包已提交，正在等待正式会话地址' : '已连接本次豆包会话，完成后自动回填');
    job.conversationUrl = binding.url;
  }
  async function recoverTaskPage(job) {
    await connect(job.owner);
    const saved = conversationUrl(job.conversationUrl);
    let target;
    if (saved && !isTemporaryConversation(saved)) {
      // A permanent ID is authoritative; never replace it with another ID on
      // the basis of similar prompts. Open it separately if its tab is gone.
      target = await openSavedPage(saved);
    } else {
      const started = now();
      while (!target) {
        job.signal?.throwIfAborted();
        const candidates = [];
        const ownedPage = taskPages.get(job.id);
        for (const candidate of livePages()) {
          const url = conversationUrl(candidate.url());
          if (saved && url === saved) candidates.push({ candidate, url });
          else if (candidate === ownedPage && isAssignedConversation(url)) candidates.push({ candidate, url });
          else if (/\/chat\/\d+$/.test(url) && await hasSentPrompt(candidate, job.prompt)) candidates.push({ candidate, url });
        }
        // Tabs may navigate while another tab's evidence is being checked.
        const matches = candidates.filter(item => !item.candidate.isClosed() && conversationUrl(item.candidate.url()) === item.url);
        if (new Set(matches.map(item => item.url)).size > 1) throw pause('找到多个可能的豆包任务对话，未打开新对话。请用“取回已生成视频”粘贴本次任务的正式对话网址。');
        const match = matches.find(item => item.candidate === taskPages.get(job.id)) || matches[0];
        if (match) {
          target = match.candidate;
          const binding = createConversationGuard(saved, { now }).observe(match.url, true);
          saveBinding(job, binding);
        } else {
          // Give restored tabs time to render messages; never navigate a
          // temporary URL, open HOME, or overwrite an unrelated tab to retry.
          if (now() - started >= 16000) throw pause('未找到本次任务原会话，未打开新对话。请在豆包历史记录打开原任务后继续，或用“取回已生成视频”粘贴正式对话网址。');
          await wait(1000, job.signal);
        }
      }
    }
    taskPages.set(job.id, target);
    page = target;
    monitorTaskPage(target, job);
    await target.bringToFront();
    return target;
  }
  async function openTask(job) {
    if (!job.submitted && !job.submissionStarted && !job.retrievalOnly && !job.conversationUrl) return open(job.owner);
    await recoverTaskPage(job);
    return status(job.owner);
  }
  async function status(owner) {
    if (!context || account !== owner || !page || page.isClosed()) return { open: false, loggedIn: false, message: '先打开豆包并登录' };
    const login = await page.getByRole('button', { name: '登录', exact: true }).isVisible().catch(() => false);
    const editor = await page.locator(editorSelector).isVisible().catch(() => false);
    return { open: true, loggedIn: editor && !login,
      message: login ? '等待你在豆包窗口登录' : editor ? '豆包窗口已连接' : '请检查豆包窗口，可能需要登录或验证' };
  }
  async function waitForUploads(page, files, signal) {
    if (!files.length) return;
    // Filenames are kept in explicit image order. Count thumbnails in the
    // composer, never avatars or images from older conversation messages.
    for (let n = 0; n < 60; n++) {
      signal.throwIfAborted();
      const ready = await page.locator(editorSelector).evaluate(uploadsReady, files.length).catch(() => false);
      if (ready) return;
      await wait(1000, signal);
    }
    throw pause('无法确认所有参考图已上传，任务未发送。请检查豆包窗口中的图片数量，再继续。');
  }
  async function run(job) {
    const { owner, prompt, files, signal, update } = job;
    signal.throwIfAborted();
    let taskPage;
    if (!job.submitted && !job.submissionStarted && !job.retrievalOnly) {
      // The worker starts this while reference images download, so the visible
      // browser cold start is no longer added after all downloads finish.
      taskPage = await prepareTaskPage(job);
      monitorTaskPage(taskPage, job);
      await taskPage.locator(editorSelector).waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
      if (!(await status(owner)).loggedIn) throw pause('请在已打开的豆包窗口登录，再点击“继续任务”。');
      if (job.kind !== 'storyboard-text') await taskPage.getByRole('button', { name: '视频生成', exact: true }).click({ timeout: 20000 });
      const editor = taskPage.locator(editorSelector);
      await editor.waitFor({ state: 'visible', timeout: 15000 });
      update({ phase: 'uploading' }, job.kind === 'storyboard-text' ? '正在将本集剧本和已有资产清单填写到豆包' : '正在将参考图和原始提示词填写到豆包');
      await editor.fill(prompt);
      if (job.kind === 'storyboard-text') {
        const actual = await editor.innerText();
        if (actual.replace(/\s+/g, '') !== prompt.replace(/\s+/g, '')) throw pause('豆包输入框未完整接收剧本，任务尚未提交。请检查原文长度后继续。');
      }
      await uploadImages(taskPage, files);
      await waitForUploads(taskPage, files, signal);
      // Persist submission intent before Enter. Ambiguous sends are never retried.
      await job.beforeSubmit?.();
      await editor.press('Enter');
      update({ submitted: true, phase: 'waiting' }, job.kind === 'storyboard-text' ? '豆包已提交，正在等待分镜回答' : '豆包已提交，正在等待视频');
    } else {
      // Resume locates the submitted task before any navigation. A saved local
      // URL may already have become a permanent URL in an existing tab.
      taskPage = await recoverTaskPage(job);
    }
    return job.kind === 'storyboard-text' ? watchTextTask(taskPage, job) : watchTask(taskPage, job);
  }
  async function watchTextTask(target, job) {
    const started = now();
    const guard = createConversationGuard(job.conversationUrl, { now });
    while (now() - started < 90 * 60 * 1000) {
      job.signal.throwIfAborted();
      if (target.isClosed()) throw pause('豆包窗口已关闭，请打开原对话后继续取回分镜');
      const observedUrl = target.url();
      const evidence = guard.needsEvidence(observedUrl) && (taskPages.get(job.id) === target || await hasSentPrompt(target, job.prompt));
      const binding = guard.observe(target.url(), evidence);
      saveBinding(job, binding);
      if (binding.state === 'mismatch') throw pause('豆包已切换到其他对话，请返回本次分镜对话后继续取回');
      if (binding.state === 'ready') {
        const rawText = await target.locator('body').evaluate(readStoryboardReply, { marker: job.completionMarker, prompt: job.prompt });
        if (rawText && conversationUrl(target.url()) === binding.url) return { rawText };
      }
      if (await target.getByRole('button', { name: '登录', exact: true }).isVisible().catch(() => false)) throw pause('豆包登录已失效，请登录后继续取回');
      await wait(2500, job.signal);
    }
    throw pause('尚未读到完整分镜，原任务已保留，可继续取回，不会重复提交');
  }
  async function watchTask(page, job) {
    const { prompt, signal, update } = job;
    const started = now();
    const monitor = monitorTaskPage(page, job);
    const guard = createConversationGuard(job.conversationUrl, { now });
    let playbackTried = false;
    if (job.retrievalOnly) update({ phase: 'waiting' }, '正在检查此豆包对话的已有视频，不会重新生成');
    while (now() - started < 90 * 60 * 1000) {
      signal.throwIfAborted();
      if (page.isClosed()) throw pause('豆包窗口已关闭。打开豆包后可继续取回结果。');
      const observedUrl = page.url();
      let sameTask = false;
      if (guard.needsEvidence(observedUrl) && prompt?.trim()) {
        // A page created and retained for this exact task is authoritative.
        // Text matching remains the fallback only after a client restart.
        sameTask = taskPages.get(job.id) === page || await hasSentPrompt(page, prompt);
        // The page may have navigated while the asynchronous DOM check ran.
        if (conversationUrl(page.url()) !== conversationUrl(observedUrl)) sameTask = false;
      }
      const binding = guard.observe(page.url(), sameTask);
      saveBinding(job, binding);
      if (binding.state === 'mismatch') {
        update({ conversationMismatch: { expected: guard.url, observed: conversationUrl(page.url()), at: new Date(now()).toISOString() } });
        throw pause('豆包当前对话与本次任务未能对应，已暂停回填。点击查看豆包任务，确认是本次对话后继续。');
      }
      if (binding.state === 'ready') {
        const boundUrl = binding.url;
        const videos = page.locator('video');
        const completedMessage = page.getByText(/^(你的视频生成好了[。！]?|视频生成完成[。！]?|视频已生成[。！]?)$/);
        const generatedReady = await completedMessage.count() > 0 && await completedMessage.last().isVisible().catch(() => false);
        const directSources = await videos.evaluateAll(elements => [...new Set(elements.map(el => el.currentSrc || el.src || el.querySelector('source')?.src || '').filter(source => /^https:\/\//i.test(source)))]);
        const sources = directSources.length ? directSources : [...monitor.videoSources];
        if (conversationUrl(page.url()) !== boundUrl) continue;
        if (sources.length > 1) throw pause('本对话包含多个视频，无法确定要回填哪一个。请打开只包含本镜头结果的对话后取回。');
        if (sources.length === 1) return downloadVideo(context, page, sources[0], { ...job, conversationUrl: boundUrl });
        if (await videos.count() === 1 || generatedReady) {
          if (await videos.count() === 1) await videos.first().hover().catch(() => {});
          const downloadLocators = [
            page.getByRole('menuitem', { name: /下载/ }),
            page.getByRole('button', { name: /下载/ }),
            page.getByRole('link', { name: /下载/ }),
            page.locator('button[aria-label*="下载"]:visible,button[title*="下载"]:visible,a[download]:visible,a[aria-label*="下载"]:visible,a[title*="下载"]:visible')
          ];
          let downloadMenuOpened = false;
          for (const download of downloadLocators) {
            if (await download.count() === 1 && await download.isVisible()) {
              try { return await downloadFromPage(page, download, { ...job, conversationUrl: boundUrl }); }
              catch (error) {
                if (error?.name !== 'TimeoutError') throw error;
                downloadMenuOpened = true;
                break;
              }
            }
          }
          if (downloadMenuOpened) { await wait(1000, signal); continue; }
        }
        // Some cards mount the video only after playback. Never click a generate
        // button, or guess between multiple playback controls.
        if (!playbackTried) {
          const play = page.getByRole('button', { name: /^(播放|播放视频)$/ });
          if (await play.count() === 1 && await play.isVisible()) { await play.click(); playbackTried = true; }
          else if (generatedReady && await completedMessage.last().evaluate(clickGeneratedVideoPreview).catch(() => false)) {
            update({ phase: 'waiting' }, '已发现豆包生成的视频，正在打开播放器取回');
            playbackTried = true;
          }
          else if (await videos.count() === 1 && await videos.isVisible()) { await videos.click(); playbackTried = true; }
        }
        if (job.retrievalOnly && now() - started > 30000) throw pause('尚未读到可下载的视频。请在豆包打开本段视频并点击播放，再点“继续任务”；不会重新生成。');
      }
      if (await page.getByRole('button', { name: '登录', exact: true }).isVisible().catch(() => false)) throw pause('豆包登录已失效，请重新登录后继续取回结果。');
      await wait(4000, signal);
    }
    throw pause('豆包生成较久，已暂停等待。稍后可点击继续取回结果，不会重新生成。');
  }
  return { open, prepareTask: prepareTaskPage, openTask, status, run };
}

function createBrowser({ chromium, wait, now } = {}) {
  const sessions = new Map();
  function session(owner, profileId = 'legacy') {
    const key = browserProfile(owner,profileId);
    if (!sessions.has(key)) sessions.set(key,createSession({chromium,profileId,wait,now}));
    return sessions.get(key);
  }
  return {
    open: (owner,url='',profileId='legacy') => session(owner,profileId).open(owner,url),
    prepareTask: job => session(job.owner,job.profileId).prepareTask(job),
    openTask: job => session(job.owner,job.profileId).openTask(job),
    status: (owner,profileId='legacy') => session(owner,profileId).status(owner),
    run: job => session(job.owner,job.profileId).run(job)
  };
}
module.exports = { createBrowser, isConversation, uploadsReady, uploadInputCandidates, uploadImages, sentPromptVisible, normalizedPromptVisible, clickGeneratedVideoPreview };
