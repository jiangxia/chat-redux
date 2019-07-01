# 聊天室

react全家桶+Socket.io+Express+mongoose打造的网页版聊天室。

## 使用方式

先把项目拷贝到本地

```
git clone https://github.com/jiangxia/chat-redux.git
```

然后到项目路径下执行：

```
npm install
npm start
```

该系统的页面有：

<br/>
<img src='https://github.com/jiangxia/chat-redux/raw/master/temp/1.png' width='600'>
<br/>

先进入注册页面注册账号，请分别注册两个账号，牛人与boss类型账号各一个，这样才能发起聊天。

目前支持的功能有：注册、登录、查看信息列表、个人中心、发起聊天等。


## 技术栈
* **React16**：实现前端页面构建
* **redux**：实现不同组件间的状态共享
* **redux-thunk**：redux中间件，支持异步action
* **react-router**：页面路由切换,实现单页的核心
* **Socket.io**：实现实时消息推送
* **axios**：一个基于 `Promise` 的 HTTP 库，向后端发起请求
* **Express**：开发环境使用Express，生产环境使用Koa2
* **ES6**：服务端和客户端均使用ES6语法，promise/async/await 处理异步
* **Webpack**：模块打包，前端项目构建工具首选
* **Flex**：flex弹性布局，简单适配手机、PC端
* **CSS3**：CSS3过渡动画及样式
* **mongoose**：非关系型数据库

## 亮点
- 全栈开发：包括react技术栈+node+mongoose+socket.io；
- 使用ant-motion优化动画效果
<!-- 3. 使用immutable优化react -->
- 使用SSR进行前后端同构
<!-- - 使用jest进行组件测试 -->
- 使用eslint进行代码规范
- 使用高阶组件抽象重复逻辑

## 难点
### 前后端同构
所谓前后端同构，就是首屏使用服务端渲染，后面的交互由客户端完成。这样的好处，一方面可以提高首屏加载速度，另一方面有利于SEO优化。

做前后端同构的步骤：
1. 先让node服务端支持ES6语法，使用 `@babel/cli`
2. 让node支持jsx语法，将package中babel的配置拷贝到根目录.babelrc文件中即可
3. 抽离公用组件App.js，前后端统一用App进行渲染
4. 调整服务端渲染代码，redux的逻辑同客户端，在server.js中做同样的实现；使用StaticRouter代替BrowserRouter；
5. 让node环境能解析css，使用css-modules-require-hook这个插件
6. 让node环境能解析image，使用asset-require-hook这个插件
7. react16之前服务端渲染的API是renderToString、renderToStaticMarkup，react16以后提供的API是renderToNodeStream，建议用后者，效率比前者高5倍以上。
8、 使用 hydrate代替render

遇到的问题：
1. babel升到7.0以后，会报Error: Requires Babel “^7.0.0-0”, but was loaded with “6.26.3”。解决方案是按照正确的依赖，在babel之前，安装依赖的格式例如babel-cli，那babel7以后，需要安装@babel/cli
2. build打包时不包含antd的样式，查了[资料](https://github.com/ant-design/create-react-app-antd/pull/1)，说是要配置webpack，但create-react-app生成的文件并没有webpack.config.prod.js 文件，最终的解决方案是，手动将build/asset-manifest.json中的css跟js都引入到server.js模板中即可。



## 截图

* 登录页面

<br/>
<img src='https://github.com/jiangxia/chat-redux/raw/master/temp/2.png' width='600'>
<br/>

* 注册页面

<br/>
<img src='https://github.com/jiangxia/chat-redux/raw/master/temp/3.png' width='600'>
<br/>

* 牛人列表页面

<br/>
<img src='https://github.com/jiangxia/chat-redux/raw/master/temp/4.png' width='600'>
<br/>

* 牛人列表页面

<br/>
<img src='https://github.com/jiangxia/chat-redux/raw/master/temp/7.png' width='600'>
<br/>

* 消息列表页面

<br/>
<img src='https://github.com/jiangxia/chat-redux/raw/master/temp/5.png' width='600'>
<br/>

* 消息列表页面

<br/>
<img src='https://github.com/jiangxia/chat-redux/raw/master/temp/6.png' width='600'>
<br/>


## 分析与改进

* ### 服务端使用ES6语法

服务端使用ES6语法，但目前还需要babel转码。这是接下来一个改进的点。

其实可以不需要使用babel转码以及一系列的配置，只需要将node升级到V8版本，V8已经很好地支持了ES6/ES7/ES8等最新特性，这是目前最好的办法。升级到V8版本，可以直接到nodejs中文网(http://nodejs.cn/download/) 下载即可，也可以使用NVM切换node版本。

升级到V8后，还不支持通过import/export关键字来导入导出模块(因为服务端已经有了CommonJS规范，如果再使用import/export的话就有点冲突了)，如果一定要使用import/export关键字，这时可以在服务端的入口文件首行添加以下代码：

```javascript
require("babel-core/register")({
	presets: ['es2015', 'stage-0']
})
require("babel-polyfill")
```

上面的模块不可以使用import来导入，必须使用require，同时需要通过npm安装babel-core、babel-preset-es2015、babel-preset-stage-0、babel-polyfill等依赖。这样就可以愉快地使用import/export了。

服务端代码片段如下：

``` javascript
// ES7 async/await
import express from 'express'
import login from '../../controller/login'

const loginRouter = express.Router()

loginRouter
	.get('/:user/:pwd', async(req, res) => { // 登录
		const result = await login.login(req, res)
		res.json(result)
	})

export default loginRouter
```

* ### Socket.io
服务端(结合Express/Koa):

```javascript
// Server
import express from 'express'
import http from 'http'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
server.listen(3000)

io.on('connection', (socket)=>{
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
```

客户端：

```javascript
// Client
<script src="http://localhost:3000/socket.io/socket.io.js"></script>
<script>
  const socket = io.connect('http://localhost:3000')
  socket.on('news', (data)=>{
    socket.emit('my other event', { my: 'data' })
  })
</script>
```

socket.io最核心的两个api就是`emit` 和 `on`了 ，服务端和客户端都有这两个api。通过 `emit` 和 `on`可以实现服务器与客户端之间的双向通信。

`emit` ：发射一个事件，第一个参数为事件名，第二个参数为要发送的数据，第三个参数为回调函数（如需对方接受到信息后立即得到确认时，则需要用到回调函数）。

`on` ：监听一个 emit 发射的事件，第一个参数为要监听的事件名，第二个参数为回调函数，用来接收对方发来的数据，该函数的第一个参数为接收的数据。

服务端常用API：

`socket.emit()`：向建立该连接的客户端发送消息

`socket.on()`：监听客户端发送信息

`io.to(socketid).emit()`：向指定客户端发送消息

`io.sockets.socket(socketid).emit()`：向指定客户端发送消息，新版本用`io.sockets.socket[socketid].emit()` ，数组访问

`socket.broadcast.emit()`：向除去建立该连接的客户端的所有客户端广播

`io.sockets.emit()`：向所有客户端广播

客户端常用API：

`socket.emit()`：向服务端发送消息

`socket.on()`：监听服务端发来的信息

注意：

监听事件前，一定要先移除原来的事件，否则会有重复的监听器。可以使用`socket.removeAllListeners`，该API接收一个数组。

## 最后

如果觉得不错，就毫不吝啬地给个star吧。后期项目还会继续更新和完善。
