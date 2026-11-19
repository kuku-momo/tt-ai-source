// 本地桩上游：模拟自定义图像/视频协议，用于验证网关转发
// sync 模式：POST /img {prompt,size,n} → {data:[{url}]}
// task 模式：POST /vid {prompt} → {task_id}；GET /vid/:id → {status,output:[{url}]}
const http = require('node:http');

const store = new Map();
let seq = 0;

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    const url = new URL(req.url, 'http://127.0.0.1:8999');
    const p = url.pathname;
    const json = (code, data) => {
      const b = Buffer.from(JSON.stringify(data), 'utf8');
      res.writeHead(code, { 'content-type': 'application/json', 'content-length': b.length });
      res.end(b);
    };

    if (req.method === 'POST' && p === '/img') {
      let parsed = {};
      try { parsed = JSON.parse(body || '{}'); } catch {}
      console.log(`[stub] /img prompt=${parsed.prompt} size=${parsed.size} n=${parsed.n} token=${req.headers['x-token'] || '-'}`);
      const n = Math.max(1, Number(parsed.n) || 1);
      return json(200, {
        code: 0,
        data: Array.from({ length: n }, (_, i) => ({
          url: `https://cdn.example.com/img/${encodeURIComponent(parsed.prompt || 'x')}-${i + 1}.png`
        }))
      });
    }

    if (req.method === 'POST' && p === '/vid') {
      let parsed = {};
      try { parsed = JSON.parse(body || '{}'); } catch {}
      seq += 1;
      const taskId = `vt${seq}`;
      store.set(taskId, { polls: 0, prompt: parsed.prompt });
      console.log(`[stub] /vid submit prompt=${parsed.prompt} → ${taskId}`);
      return json(200, { code: 0, data: { task_id: taskId } });
    }

    const m = /^\/vid\/([A-Za-z0-9]+)$/.exec(p);
    if (req.method === 'GET' && m) {
      const rec = store.get(m[1]);
      if (!rec) return json(404, { code: 404, msg: 'no such task' });
      rec.polls += 1;
      if (rec.polls < 2) {
        console.log(`[stub] poll ${m[1]} → running`);
        return json(200, { code: 0, data: { status: 'running' } });
      }
      console.log(`[stub] poll ${m[1]} → succeeded`);
      return json(200, { code: 0, data: { status: 'succeeded', output: [{ url: `https://cdn.example.com/vid/${m[1]}.mp4` }] } });
    }

    json(404, { code: 404, msg: `no route ${req.method} ${p}` });
  });
});

server.listen(8999, '127.0.0.1', () => console.log('[stub] listening http://127.0.0.1:8999'));
