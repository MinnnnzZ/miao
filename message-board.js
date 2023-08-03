const http = require('http');
const fs = require('fs');

const port = 13000;

let messages = [];

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/favicon.ico') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.end(fs.readFileSync('./tu.png'));
    } else if (req.method === 'POST' && req.url === '/leave-message') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const name = params.get('name');
            const message = params.get('message');
            if (!name || !message) {
                res.statusCode = 204;
                res.end();
            } else {
                messages.push({ name, message });
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            }
        });
    } else if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.write(`
          <!doctype html>
          <form method="POST" action="/leave-message">
            Name:<br>
            <input type="text" name="name"><br>
            Message:<br>
            <input type="text" name="message"><br>
            <button>submit</button>
          </form>
          ${messages.map(msg => {
            return `<fieldset>
                <legend>${msg.name}</legend>
                <div>${msg.message}</div>
              </fieldset>`;
        }).join('\n')}
        `);
        res.end();
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.end('页面未找到');
    }
});

server.listen(port, () => {
    console.log(`服务器正在 ${port} 端口侦听`);
});
