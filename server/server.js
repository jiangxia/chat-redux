import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook';
import express from "express";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import staticPath from '../build/asset-manifest.json'

// import App1 from '../src/App'
import reducers from '../src/reducer'


import App from '../src/App'
// 要在图片加载之前调用
assethook({
  extensions: ['png'],
})
const userRouter = require('./user');
const app = express();
const model = require('./model')
const Chat = model.getModel('chat')


const server = require('http').Server(app);
const io = require('socket.io')(server)
io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
      if (!err) {
        io.emit('recvmsg', Object.assign({}, doc._doc));
      }
    })
  })
})


app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

app.use(function (req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next();
  }
  const store = createStore(reducers, compose(
    applyMiddleware(thunk),
  ))
  const context = {}
  const markup = renderToString(<Provider store={store}>
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App></App>
    </StaticRouter>
  </Provider>);

  const pageHtml = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="stylesheet" href="${staticPath['files']['main.css']}">
      <link rel="stylesheet" href="${staticPath['files']['static/css/2.74bb7cb6.chunk.css']}">
      <title>React App</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">${markup}</div>
      <script src="${staticPath['files']['main.js']}"></script>
      <script src="${staticPath['files']['runtime~main.js']}"></script>
      <script src="${staticPath['files']['static/js/2.896ad638.chunk.js']}"></script>

      
    </body>
  </html>
  `;
  return res.send(pageHtml)
})

app.use('/', express.static(path.resolve('build')))

// 上线的步骤：
// 1、购买域名
// 2、 DNS解析到你的服务器IP
// 3、安装nginx
// 4、 使用 pm2 管理node进程

server.listen('9093', function () {
  console.log('node app start at port 9093');
})