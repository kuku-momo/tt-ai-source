// 本地桩：模拟 OpenAI 兼容服务的 /models 与 /chat/completions，用来验证探测与转发
const http = require('node:http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:9100');
  const auth = req.headers['authorization'] || '';
  const ok = auth === 'Bearer sk-goodkey123456';

  const json = (code, data) => {
    const b = Buffer.from(JSON.stringify(data), 'utf8');
    res.writeHead(code, { 'content-type': 'application/json', 'content-length': b.length });
    res.end(b);
  };

  if (url.pathname.endsWith('/models')) {
    if (!ok) return json(401, { code: 'INVALID_API_KEY', message: 'Invalid API key' });
    return json(200, {
      object: 'list',
      data: [
        { id: 'gpt-4o-mini', object: 'model' },
        { id: 'deepseek-chat', object: 'model' },
        { id: 'qwen-max', object: 'model' }
      ]
    });
  }

  if (url.pathname.endsWith('/chat/completions')) {
    if (!ok) return json(401, { code: 'INVALID_API_KEY', message: 'Invalid API key' });
    res.writeHead(200, { 'content-type': 'text/event-stream' });
    res.write('data: {"choices":[{"delta":{"content":"你好"}}]}\n\n');
    res.write('data: [DONE]\n\n');
    return res.end();
  }

  json(404, { code: 'NOT_FOUND', message: `no route ${req.method} ${url.pathname}` });
});

server.listen(9100, '127.0.0.1', () => console.log('[stub-api] listening http://127.0.0.1:9100'));
