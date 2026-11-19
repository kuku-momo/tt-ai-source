const { setTimeout: wait } = require('node:timers/promises');

class AgentLoop {
  constructor({ client, intervalMs = 3000, processTask, logger = console } = {}) {
    if (!client) throw new Error('缺少云端客户端');
    this.client = client;
    this.intervalMs = Math.max(1000, Number(intervalMs) || 3000);
    this.processTask = processTask || (async () => { throw new Error('浏览器自动化尚未接入'); });
    this.logger = logger;
    this.controller = null;
    this.running = false;
    this.active = new Map();
    this.maxConcurrent = 3;
  }

  async runOnce() {
    if (!this.client.paired) return { state: 'unpaired' };
    await this.client.heartbeat();
    const result = await this.client.claim();
    const task = result?.task || null;
    if (!task) return { state: 'idle' };
    return this.processClaimed(task);
  }

  async processClaimed(task) {
    try {
      await this.client.progress(task.id, 'running', '本地助手已领取任务');
      const keepalive = setInterval(() => {
        this.client.heartbeat().catch(error => this.logger.error?.(`[豆包助手] 心跳续租失败：${error.message}`));
      }, Math.max(1000, Math.floor(this.intervalMs / 2)));
      let output;
      try {
        output = await this.processTask(task, {
          progress: (status, message, extra) => this.client.progress(task.id, status, message, extra),
          upload: (file, options) => this.client.upload(task.id, file, options)
        });
      } finally { clearInterval(keepalive); }
      await this.client.complete(task.id, { status: 'success', ...(output || {}) });
      return { state: 'completed', taskId: task.id };
    } catch (error) {
      const message = error.userMessage || error.message || '本地助手任务失败';
      try { await this.client.progress(task.id, 'paused', message); } catch (progressError) {
        this.logger.error?.(`[豆包助手] 回传失败：${progressError.message}`);
      }
      this.logger.error?.(`[豆包助手] 任务 ${task.id} 暂停：${message}`);
      return { state: 'paused', taskId: task.id, error };
    } finally { this.client.taskLeases?.delete(String(task.id)); }
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.controller = new AbortController();
    void this.run().catch(error => this.logger.error?.(`[豆包助手] 轮询停止：${error.message}`));
  }

  stop() {
    this.running = false;
    this.controller?.abort();
    this.controller = null;
  }

  async run() {
    const signal = this.controller.signal;
    while (this.running) {
      try {
        if (this.client.paired && this.active.size < this.maxConcurrent) {
          await this.client.heartbeat();
          const { task } = await this.client.claim();
          if (task) {
            const work = this.processClaimed(task).finally(() => this.active.delete(task.id));
            this.active.set(task.id, work);
          }
        }
      } catch (error) { this.logger.error?.(`[豆包助手] ${error.message}`); }
      try { await wait(this.intervalMs, undefined, { signal }); } catch (error) {
        if (error.name !== 'AbortError') throw error;
      }
    }
  }
}

module.exports = { AgentLoop };
