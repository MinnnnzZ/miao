
  
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const port = 8081


const threads = []



app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use(express.urlencoded())
app.use(express.json())


app.use(cookieParser('fkwlejfoiwjeofiweoruwoiejfowiejfoijoiwejfoi'))



app.use((req, res, next) => {
  req.user = users.find(user => {
    return user.username == req.signedCookies.login
  })
  next()
})





app.get('/', (req, res, next) => {


  res.type('html')
  res.end(`
    <!doctype html>
    <h1>首页</h1>
    <h2>${req.signedCookies.login ? '欢迎' + req.signedCookies.login : ''}</h2>
    <div>
      <a href="/thread/new">发贴</a>
      <a href="/register">注册</a>
      <a href="/login">登陆</a>
      <a href="/logout">登出</a>
    </div>
    ${
      threads.map((t, idx) => {
        return `<div>
          <a href="/thread/${idx}">${t.title}</a>
        </div>`
      }).join('')
    }
  `)
})

app.get('/thread/new', (req, res, next) => {

  res.type('html')
  res.end(`
    <!doctype html>
    <form action="/thread/new" method="post">
      <div>发表主题</div>
      <div>标题:<input name="title"></div>
      <div>内容:<textarea name="content"></textarea></div>
      <div><button>发布</button></div>
    </form>
  `)
})

app.post('/thread/new', (req, res, next) => {
  if (req.user) {
    threads.push({
      ...req.body,
      createdAt: new Date().toISOString(),
    })
    res.redirect('/thread/' + (threads.length - 1))
  } else {
    res.type('html').end('未登陆')
  }
})

app.get('/thread/:id', (req, res, next) => {
  var thread = threads[req.params.id]

  var threadComments = comments.filter(it => {
    return it.thread == req.params.id
  })

  res.type('html').end(`
    <!doctype html>
    <h1>${thread.title}</h1>
    <h2>${thread.owner}, ${thread.createdAt}</h2>
    <div>${thread.content}</div>
    <hr>

    ${
      threadComments.map(comment => {
        return `<div>${comment.content} BY ${comment.owner} @ ${comment.createdAt}</div>`
      }).join('')
    }

    ${
      req.user ? `
        <div>评论:</div>
        <form action="/comment/thread/${req.params.id}" method="post">
          <textarea placeholder="输入评论" name="content"></textarea>
          <button>发表评论</button>
        </form>
      ` : `
        <div>想留言?请先<a href="/login">登陆</a></div>
      `
    }
  `)
})

app.post('/comment/thread/:id', (req, res, next) => {
  var { content } = req.body
  var threadId = req.params.id

  if (req.user) {
    var comment = {
      thread: threadId, 
      content, 
      owner: req.user.username, 
      createdAt: new Date().toISOString(), 
    }
    comments.push(comment)

    res.redirect('/thread/' + threadId)
  } else {
    res.type('html').end('未登陆,请先登陆后发贴')
  }
})


app.get('/user/:id', (req, res, next) => {
})



app.get('/logout', (req, res, next) => {
  res.clearCookie('login') //
  res.redirect('/')
})

app.get('/login', (req, res, next) => {
  res.type('html').end(`
    <!doctype html>
    <h1>登陆</h1>
    <form action="/login" method="post">
      <input type="text" name="username">
      <input type="password" name="password">
                                               <!---  这里拿到的是,谁打开了login,即之前在哪个页面  ---->
                                               <!---  把这个信息放入这个表单,表单提交后,在登陆请求中就能够正确的跳回去了  ---->
      <input type="hidden" name="next" value="${req.get('referer')}">
      <button>登陆</button>
    </form>
  `)
})

app.post('/login', (req, res, next) => {
    var loginInfo = req.body

    var user = user.find(user => user.username == loginInfo.username && user.password == loginInfo.password)

    if (user) {
        res.cookie('login', user.username, {
            signed: true,
            maxAge:5 * 86400000
        })
    }
})

if (req.body.next) {
    res.redirect(req.body.next)
} else {
    res.redirect('/')
}

