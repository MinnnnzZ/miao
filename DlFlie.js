const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 

const port = 12000; 

// 创建服务器，处理GET请求和/favicon.ico请求
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/favicon.ico') {
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'image/png'); 
    res.end(fs.readFileSync('./tu.png')); 
  } else {
    const fileName = decodeURIComponent(req.url.slice(1)); 
    const filePath = path.resolve(fileName); 

    fs.stat(filePath, (err, stat) => {
      if (err) { 
        res.statusCode = 404; 
        res.setHeader('Content-Type', 'text/html; charset=UTF-8'); 
        res.end('页面未找到'); 
      } else {
        if (stat.isFile()) { 
          res.statusCode = 200; 
          res.setHeader('Content-Type', getContentType(path.extname(fileName))); 
          fs.createReadStream(filePath).pipe(res);
        } else if (stat.isDirectory()) { 
          if (!req.url.endsWith('/')) {
            res.writeHead(302, {
              Location: req.url + '/'
            });
            res.end();
            return;
          }

          fs.readdir(filePath, { withFileTypes: true }, (err, fileEntries) => {
            if (err) { 
              res.end('404 Not Found');
            } else {
              res.writeHead(200, {
                'Content-Type': 'text/html; charset=UTF-8'
              });

              fileEntries.sort((a, b) => {
                if (a.isDirectory() && !b.isDirectory()) {
                  return -1;
                } else if (!a.isDirectory() && b.isDirectory()) {
                  return 1;
                } else {
                  return a.name.localeCompare(b.name);
                }
              });

              const html = fileEntries.map(entry => {
                const slash = entry.isDirectory() ? '/' : '';
                return `<div><a href="${entry.name}${slash}">${entry.name}${slash}</a></div>`;
              }).join('\n');

              res.end(html);
            }
          });
        }
      }
    });
  }
});

server.listen(port, () => { 
  console.log(`服务器正在 ${port} 端口侦听`);
});

function getContentType(extname) {
  switch (extname.toLowerCase()) { 
    case '.html':
      return 'text/html; charset=UTF-8';
    case '.css':
      return 'text/css; charset=UTF-8';
    case '.js':
      return 'application/javascript; charset=UTF-8';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream'; 
  }
}
