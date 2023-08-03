const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 13000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/favicon.ico') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/png');
    res.end(fs.readFileSync('./tu.png'));
  } else {
    const fileName = decodeURIComponent(req.url.slice(1)); // 去掉URL中的第一个斜杠并解码URL
    const filePath = path.resolve(fileName); // 获取文件的绝对路径

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.end('页面未找到');
      } else {
        res.statusCode = 200;
        // 设置正确的Content-Type，根据文件后缀名来确定
        res.setHeader('Content-Type', getContentType(path.extname(fileName)));
        res.end(data);
      }
    });
  }
});

server.listen(port, () => {
  console.log(`服务器正在 ${port} 端口侦听`);
});

// 根据文件后缀名获取对应的Content-Type
function getContentType(extname) {
  switch (extname) {
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
