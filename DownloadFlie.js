const http = require('http'); // 导入http模块，用于创建服务器和处理HTTP请求
const fs = require('fs'); // 导入fs模块，用于读取文件
const path = require('path'); // 导入path模块，用于处理文件路径

const port = 12000; // 设置服务器监听的端口号

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/favicon.ico') { // 处理收到的GET请求并且URL路径为/favicon.ico
    res.statusCode = 200; // 设置响应状态码为200（成功）
    res.setHeader('Content-Type', 'image/png'); // 设置响应头的Content-Type为image/png
    res.end(fs.readFileSync('./tu.png')); // 向客户端发送图片文件./tu.png的内容
  } else {
    const fileName = decodeURIComponent(req.url.slice(1)); // 获取URL路径并去掉第一个斜杠，再对URL进行解码得到文件名
    const filePath = path.resolve(fileName); // 获取文件的绝对路径

    fs.readFile(filePath, (err, data) => { // 读取文件内容
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

server.listen(port, () => { // 服务器开始侦听指定的端口号
  console.log(`服务器正在 ${port} 端口侦听`); // 在控制台输出服务器正在监听的端口号
});

// 根据文件后缀名获取对应的Content-Type
function getContentType(extname) {
  switch (extname) { // 根据文件后缀名进行判断
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