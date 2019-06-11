# 跨域

## jsonp

前端方案，构造 `script` 元素实现
```js
/**
 * 
 * @param {string} url api url
 * @param {object} query url query
 * @param {function} cb callback
 */
function jsonp(url, query, cb) {
  const callbackName = '_$JSONPcallback';
  let script = document.createElement('script');
  if (typeof cb !== 'function') {
    throw new Error('jsonp error: invalid callback function');
  }
  window[callbackName] = function(data) {
    cb(data);
    window[callbackName] = undefined;
  }
  function removeScript() {
    script.parentNode.removeChild(script);
  }
  script.onload = removeScript;
  script.onerror = removeScript;
  let queryAry = [];
  Object.keys(query).forEach(key => {
    queryAry.push(`${key}=${query[key]}`)
  })
  if (url.includes('?')) {
    url += queryAry.join('&') + '&callback=' + callbackName;
  } else {
    url += '?' + queryAry.join('&') + '&callback=' + callbackName;
  }
  script.src = url;
  document.head.appendChild(script);
}
```
弊端：
- 只支持 `get` 请求
- 不安全，接口可返回恶意 `JavaScript` 造成 `xss` 攻击

## cors

后端方案，基于 express 实现
```js
const express = require('express');
const app = express();
app.use(function(req, res, next) {
  const whiteList = ['http://localhost:5000'];
  const origin = req.headers.origin;
  if (whiteList.includes(origin)) {
    // 设置哪个源可以访问 (* 与 Credentials 冲突)
    res.setHeader('Access-Control-Allow-Origin', origin);
    // 设置 request.headers 允许携带哪些头信息
    res.setHeader('Access-Control-Allow-Headers', 'name1,name2');
    // 设置允许哪些方法访问，默认支持 get post
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    // 设置允许跨域携带 cookie
    res.setHeader('Access-Control-Allow-Credentials', true);
    // 设置 response.headers 允许前端访问哪些头
    res.setHeader('Access-Control-Expose-Headers', 'name')
    // 设置预检的返回结果存活时间：options 请求（返回 Allow-Headers Allow-Methods 的信息）,单位 s
    res.setHeader('Access-Control-Max-Age', 10);
    if (req.method === 'OPTIONS') {
      res.end(); // OPTIONS 请求不作处理
    }
  }
  next()
})
app.listen(3000);
```

## postMessage

- **原理：** 嵌套 `iframe`，基于 `postMessage API`
- **目的：** `a.html` 向 `b.html` 发送 `hello`，并收到 `world`
- **环境：**
    - `a.html` 所在域为 `http://localhost:3000/a.html`
    - `b.html` 所在域为 `http://localhost:4000/b.html`
```html
<!-- a.html -->
<iframe src="http://localhost:4000/b.html" id="frame" onload="load()" frameborder="0"></iframe>
<script>
  function load() {
    const frame = document.getElementById('frame');
    frame.contentWindow.postMessage('hello', 'http://localhost:4000');
    window.onmessage = function (e) {
      console.log(e.data); // world
    }
  }
</script>

<!-- b.html -->
<script>
  window.onmessage = function (e) {
    console.log(e.data); // hello
    e.source.postMessage('world', e.origin);
  }
</script>
```
## document.domain

- **局限：** 只能解决 **一级域名** 与 **二级域名** 的跨域问题
- **目的：** `a.html` 取到 `b.html` 中的变量 `abc`
- **环境：**
    - `a.html` 所在域名为 `http://a.test.com:3000/a.html`
    - `b.html` 所在域名为 `http://b.test.com:3000/b.html`

```html
<!-- a.html -->
<iframe src="http://b.test.com:3000/b.html" id="frame" onload="load()" frameborder="0"></iframe>
<script>
  document.domain = 'test.com';
  function load() {
    console.log(frame.contentWindow.abc); // hello world
  }
</script>

<!-- b.html -->
<script>
  document.domain = 'test.com';
  abc = 'hello world';
</script>
```


## window.name

- **原理：** 嵌套 `iframe`，基于 `window.name` 在修改 `iframe.src` 属性后不变的原理实现
- **目的：** `a.html` 中访问到 `c.html` 中的 `hello world`
- **环境：** `a` 与 `b` 同域，`c` 为单独域
    - `a.html` 所在域为 `http://localhost:3000/a.html`
    - `b.html` 所在域为 `http://localhost:3000/b.html`
    - `c.html` 所在域为 `http://localhost:4000/c.html`
```html
<!-- a.html -->
<iframe src="http://localhost:4000/c.html" id="frame" onload="load()" frameborder="0"></iframe>
<script>
  let firstLoad = true;
  function load() {
    let frame = document.getElementById('frame');
    if (firstLoad) {
      frame.src = 'http://localhost:3000/b.html';
      firstLoad = false;
    } else {
      console.log(frame.contentWindow.name); // hello world
    }
  }
</script>

<!-- c.html -->
<script>
  window.name = 'hello world';
</script>

<!-- b.html -->
<!-- 无需做特殊处理 -->
```

## location.hash

- **原理：** 嵌套 `iframe`
    - `a.html` 将信息（`hello`）传递给 `c.html` 的 `hash`
    - `c.html` 把信息 (`world`) 传递给 `b.html` 的 `hash`
    - `b.html` 将结果传递给 `a.html` 的 `hash`
- **目的：** `a.html` 中访问到 `c.html` 中的数据
- **环境：** `a` 与 `b` 同域，`c` 为单独域
    - `a.html` 所在域为 `http://localhost:3000/a.html`
    - `b.html` 所在域为 `http://localhost:3000/b.html`
    - `c.html` 所在域为 `http://localhost:4000/c.html`

```html
<!-- a.html -->
<iframe src="http://localhost:4000/c.html#hello" frameborder="0"></iframe>
<script>
  window.onhashchange = function() {
    console.log(location.hash); // world
  }
</script>

<!-- c.html -->
<script>
  console.log(location.hash); // hello
  let iframe = document.createElement('iframe');
  iframe.src = 'http://localhost:3000/b.html#world';
  document.body.appendChild(iframe);
</script>

<!-- b.html -->
<script>
  window.parent.parent.location.hash = location.hash;
</script>
```

## http-proxy

具体使用 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 可查看[文档](https://github.com/chimurai/http-proxy-middleware#options)

## nginx

```nginx
location ~.*\.json {
  root json;
  add_header "Access-Control-Allow-Origin" "*";
}
```

## websocket

- **原理：** 通过 `websocket` 协议，两个页面通过服务端通信
    - `a.html` 告诉服务端 `hello`
    - 服务端告诉 `b.html` `hello`
    - `b.html` 告诉服务端 `world`
    - 服务端告诉 `a.html` `world`

```js
// server
const WebSocket = require('ws');
let wss = new WebSocket.Server({port: 3000});
wss.on('connection', function(ws) {
  ws.on('message', function(data) {
    console.log(data); // hello
    ws.send('world');
  });
});

// client
let socket = new WebSocket('ws://localhost:3000');
socket.onopen = function () {
  socket.send('hello');
}
socket.onmessage = function (e) {
  console.log(e.data); // world
}
```
