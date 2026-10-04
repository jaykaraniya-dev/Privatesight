const http = require('node:http');
const { renderCaseHtml } = require('./generator.cjs');

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

function startPilotServer({ definitions, host = '127.0.0.1', port = 0 }) {
  const byId = new Map(definitions.map((item) => [item.case_id, item]));
  const requests = [];
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host || host}`);
    if (request.method === 'GET' && url.pathname === '/health') {
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ status: 'ok', synthetic_only: true }));
      return;
    }
    if (request.method === 'GET' && url.pathname.startsWith('/case/')) {
      const caseId = decodeURIComponent(url.pathname.slice('/case/'.length));
      const definition = byId.get(caseId);
      if (!definition) {
        response.writeHead(404, { 'content-type': 'text/plain' });
        response.end('Unknown controlled case');
        return;
      }
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'x-privatesight-fixture': 'synthetic',
      });
      response.end(renderCaseHtml(definition));
      return;
    }
    if (request.method === 'POST' && url.pathname === '/collector') {
      const body = await readBody(request);
      requests.push({ channel: 'HTTP', method: request.method, path: url.pathname, headers: request.headers, body });
      response.writeHead(202, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ accepted: true }));
      return;
    }
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end('Not found');
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => {
      const address = server.address();
      resolve({
        baseUrl: `http://${host}:${address.port}`,
        requests,
        close: () => new Promise((done, fail) => server.close((error) => error ? fail(error) : done())),
      });
    });
  });
}

module.exports = { startPilotServer };

