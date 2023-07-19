var net = require('net')
var fs = require('fs')

var server = net.createServer()
var port = 13000

var messages = []

server.on('connection', conn => {
  console.log('接收到连接', conn.remoteAddress)

  conn.on('data', data => {
    console.log(data, data.toString())
    var recv = data.toString()
    var [header, body] = recv.split('\r\n\r\n')
    var [firstLine, ...headerLines] = header.split('\r\n')
    var headers = parseHeaders(headerLines)
    var [method, url] = firstLine.split(' ')
    var urlObj = new URL(`http://${headers.host}${url}`)
    urlObj.pathname = decodeURIComponent(urlObj.pathname)

    if (method == 'GET' && urlObj.pathname == '/favicon.ico') {
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: image/png\r\n')
      conn.write('\r\n')
      conn.write(fs.readFileSync('./tu.png'))
      conn.end()
      return
    }

    if (method == 'POST' && urlObj.pathname == '/leave-message') {

      var params = new URLSearchParams(body)
      var name = params.get('name')
      var message = params.get('message')
      messages.push({ name, message })
      conn.write('HTTP/1.1 302 Found\r\n')
      conn.write('Location: /\r\n')
      conn.end()
      return
    }

    if (method == 'GET' && urlObj.pathname == '/') {
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: text/html; charset=UTF-8\r\n')
      conn.write(`Date: ${new Date()}\r\n`)
      conn.write('\r\n')
      conn.write(`
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
              </fieldset>`
      }).join('\n')
        }
        `)
      conn.end()
      return
    }

    conn.write('HTTP/1.1 404 Not Found\r\n')
    conn.write('Content-Type: text/html; charset=UTF-8\r\n')
    conn.write('\r\n')
    conn.write('页面未找到')
    conn.end()
  })


  conn.on('error', () => {

  })

})

server.listen(port, () => {
  console.log('服务器正在', port, '端口侦听')
})

function parseHeaders(headers) {
  var obj = {}
  for (var h of headers) {
    var [k, v] = h.split(': ')
    obj[k.toLowerCase()] = v
  }
  return obj
}