const http = require('http'); // 导入http模块，用于创建服务器和处理HTTP请求
const fs = require('fs'); // 导入fs模块，用于读取文件
const path = require('path'); // 导入path模块，用于处理文件路径

const port = 12000; // 设置服务器监听的端口号

// 创建服务器，处理GET请求和/favicon.ico请求
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/favicon.ico') { // 处理收到的GET请求并且URL路径为/favicon.ico
    res.statusCode = 200; // 设置响应状态码为200（成功）
    res.setHeader('Content-Type', 'image/png'); // 设置响应头的Content-Type为image/png
    res.end(fs.readFileSync('./tu.png')); // 向客户端发送图片文件./tu.png的内容
  } else {
    const fileName = decodeURIComponent(req.url.slice(1)); // 获取URL路径并去掉第一个斜杠，再对URL进行解码得到文件名
    const filePath = path.resolve(fileName); // 获取文件的绝对路径

    // 读取文件内容
    fs.readFile(filePath, (err, data) => {
      if (err) { // 如果发生错误
        res.statusCode = 404; // 设置响应状态码为404（页面未找到）
        res.setHeader('Content-Type', 'text/html; charset=UTF-8'); // 设置响应头的Content-Type为text/html; charset=UTF-8
        res.end('页面未找到'); // 向客户端发送错误页面内容
      } else { // 如果文件读取成功
        res.statusCode = 200; // 设置响应状态码为200（成功）
        res.setHeader('Content-Type', getContentType(path.extname(fileName))); // 设置正确的Content-Type，根据文件后缀名来确定
        res.end(data); // 向客户端发送文件内容
      }
    });
  }
});

const 文件夹 = './';

http.createServer((req, res) => {
  console.log(req.method, req.url);

  var targetPath = 文件夹 + req.url;

  fs.stat(targetPath, (err, stat) => {
    if (err) { // 错误处理
      res.writeHead(404);
      res.end('404 Not Found 1');
    } else { // 能读到这个路径的状态
      if (stat.isFile()) { // 如果是文件
        fs.readFile(targetPath, (err, data) => {
          if (err) { // 文件读取错误处理
            res.writeHead(404);
            res.end('404 Not Found 2');
          } else {
            res.write(data);
            res.end();
          }
        });
      } else if (stat.isDirectory()) { // 如果是目录
        // 如果请求的是文件夹但是请求的路径不以/结尾,让浏览器跳转到以/结尾的地址,否则相对路径的计算会出错
        if (!req.url.endsWith('/')) {
          res.writeHead(302, {
            Location: req.url + '/'
          });
          res.end();
          return;
        }

        // 读取文件夹内容
        fs.readdir(targetPath, { withFileTypes: true }, (err, fileEntries) => {
          if (err) { // 错误处理
            res.end('404 Not Found 3');
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=UTF-8'
            });

            // 排序文件夹内容，文件夹在前，文件在后
            fileEntries.sort((a, b) => {
              if (a.isDirectory() && !b.isDirectory()) {
                return -1;
              } else if (!a.isDirectory() && b.isDirectory()) {
                return 1;
              } else {
                return a.name.localeCompare(b.name);
              }
            });

            // 生成文件夹内容的HTML
            const html = fileEntries.map(entry => {
              const slash = entry.isDirectory() ? '/' : '';
              return `<div><a href="${entry.name}${slash}">${entry.name}${slash}</a></div>`;
            }).join('\n');

            res.end(html); // 向客户端发送文件夹内容
          }
        });
      }
    }
  });

}).listen(port, () => {
  console.log('server listening on port', port);
});

server.listen(port, () => { // 服务器开始侦听指定的端口号
  console.log(`服务器正在 ${port} 端口侦听`); // 在控制台输出服务器正在监听的端口号
});

// 根据文件后缀名获取对应的Content-Type
function getContentType(extname) {
  switch (extname.toLowerCase()) { // 根据文件后缀名进行判断，忽略大小写
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
      return 'application/octet-stream'; // 默认情况下，将文件当作二进制文件处理
  }
}
