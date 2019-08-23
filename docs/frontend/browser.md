# 浏览器

## 事件机制

### 事件触发三阶段
- 捕获阶段：`window` 往事件触发处传播，遇到注册的捕获事件会触发
- 事件源
- 冒泡阶段：从事件触发处往 `window` 传播，遇到注册的冒泡事件会触发

**捕获事件** 与 **冒泡事件** 均是相对于 **事件源** 的所有 **父元素** 来定义的，也就是当 **触发事件元素本身** 既绑定了捕获事件，又绑定了冒泡事件是没有意义的，此时只会按照 **事件绑定顺序触发事件**。

可以点击下方按钮测试，该按钮本身的事件触发顺序已经和冒泡捕获无关，只和绑定事件顺序有关
<div id="test-event-stage-div" style="display:inline-block;">
  <button id="test-event-stage-btn">测试 捕获-事件源-冒泡</button>
</div>
<script>
  document.getElementById('test-event-stage-btn').addEventListener('click', function() {
    alert('btn 事件源 冒泡!');
  });
  document.getElementById('test-event-stage-btn').addEventListener('click', function() {
    alert('btn 事件源 捕获!');
  }, true);
  document.getElementById('test-event-stage-div').addEventListener('click', function() {
    alert('box 冒泡 !');
  });
  document.getElementById('test-event-stage-div').addEventListener('click', function() {
    alert('box 捕获 !');
  }, true);
</script>

该按钮源码：
```html
<div id="box">
  <button id="btn">hello</button>
</div>
<script>
  document.getElementById('btn').addEventListener('click', function() {
    alert('btn 事件源 冒泡!');
  });
  document.getElementById('btn').addEventListener('click', function() {
    alert('btn 事件源 捕获!');
  }, true);
  document.getElementById('box').addEventListener('click', function() {
    alert('box 冒泡 !');
  });
  document.getElementById('box').addEventListener('click', function() {
    alert('box 捕获 !');
  }, true);
</script>
```

## 性能
雅虎优化规则
![雅虎优化规则](~@img/yahoo-performance.png)

## 缓存机制
当浏览器向服务器发起请求时，服务器会将缓存规则放入 `Response Headers` 中和请求结果一起返回给浏览器。

### 强缓存

#### Expires

`Expires` 是 `HTTP/1.0` 控制网页缓存的字段，其值为服务器返回该请求结果缓存的到期时间，即再次发起该请求时，如果客户端的时间小于 `Expires` 的值时，直接使用缓存结果。

`HTTP/1.1` 中 `Expire` 被 `Cache-Control` 替代，原因在于 `Expires` 控制缓存的原理是使用客户端的时间与服务端返回的时间做对比，那么如果客户端与服务端的时间因为某些原因（例如时区不同；客户端和服务端有一方的时间不准确）发生误差，那么强制缓存则会直接失效，这样的话强制缓存的存在则毫无意义。

#### Cache-Control
在 `HTTP/1.1` 中，`Cache-Control` 是最重要的规则，主要用于控制网页缓存，主要取值为：
- `public`：所有内容都将被缓存（客户端和代理服务器都可缓存）
- `private`：所有内容只有客户端可以缓存，`Cache-Control` 的默认取值
- `no-cache`：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
- `no-store`：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
- `max-age=xxx (xxx is numeric)`：缓存内容将在xxx秒后失效

### 协商缓存
协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。

#### Last-Modified / If-Modified-Since
- `Last-Modified` 是服务器响应请求时，返回该资源文件在服务器最后被修改的时间
- `If-Modified-Since` 是客户端再次发起该请求时，携带上次请求返回的 `Last-Modified` 值，通过此字段值告诉服务器该资源上次请求返回的最后被修改时间。服务器收到该请求，发现请求头含有 `If-Modified-Since` 字段，则会根据 `If-Modified-Since` 的字段值与该资源在服务器的最后被修改时间做对比，若服务器的资源最后被修改时间大于 `If-Modified-Since` 的字段值，则重新返回资源，状态码为 `200`；否则则返回 `304`，代表资源无更新，可继续使用缓存文件

#### Etag / If-None-Match
- `Etag` 是服务器响应请求时，返回当前资源文件的一个唯一标识（由服务器生成）
- `If-None-Match` 是客户端再次发起该请求时，携带上次请求返回的唯一标识 `Etag` 值，通过此字段值告诉服务器该资源上次请求返回的唯一标识值。服务器收到该请求后，发现该请求头中含有 `If-None-Match`，则会根据 `If-None-Match` 的字段值与该资源在服务器的 `Etag` 值做对比，一致则返回 `304`，代表资源无更新，继续使用缓存文件；不一致则重新返回资源文件，状态码为 `200`

`Etag` 的出现主要是为了解决 `Last-Modified` 存在的问题：
- `Last-Modified` 标注的最后修改只能精确到秒级，如果某些文件在 `1` 秒钟以内被修改多次的话，它将不能准确标注文件的最后修改时间
- 如果本地打开缓存文件，即使没有对文件进行修改，但 `Last-Modified` 却改变了，导致文件没法使用缓存

因此 `Etag / If-None-Match` 优先级高于 `Last-Modified / If-Modified-Since`，同时存在则只有 `Etag / If-None-Match` 生效。

::: tip
**强制缓存** 优先于 **协商缓存** 进行，若强制缓存(`Expires和Cache-Control`)生效则直接使用缓存，若不生效则进行协商缓存(`Last-Modified / If-Modified-Since` 和 `Etag / If-None-Match`)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，重新获取请求结果，再存入浏览器缓存中；生效则返回 `304`，继续使用缓存。
:::

### 缓存位置
浏览器缓存位置分为四种，其优先级顺序如下：
1. Service Worker
2. Memory Cache
3. Disk Cache
4. Push Cache (HTTP 2.0)

#### Service Worker
`Service Worker` 是一个注册在指定源和路径下的事件驱动 `worker`。它采用 `JavaScript` 控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。

我们可以通过谷歌开发者工具中的 `Application -> Service Workers` 查看当前缓存的资源。

#### Memory Cache
`Memory Cache` 即内存中的缓存，其特点是容量小、读取高效、持续性短，会随着进程的释放而释放。
所以，在内存使用率低、缓存小尺寸资源时，会以 `Memory Cache` 为优先，否则使用 `Disk Cache`。
#### Disk Cache
`Disk Cache` 即磁盘中的缓存，其特点是容量大、读取缓慢、持续性长，任何资源都能存储到磁盘中。
所以，在内存使用率高、缓存大尺寸资源时，会以 `Disk Cache` 为优先。
#### Push Cache
`Push Cache` 是 `HTTP 2.0` 中的内容，其缓存时间也很短暂，只在会话（`Session`）中存在，一旦会话结束就被释放。

## 当浏览器输入一个地址发生了什么
[https://github.com/alex/what-happens-when](https://github.com/alex/what-happens-when)

## native webview 通讯原理
- `native` 调 `js`：原生 `webview` 组件自带 `api` 执行 `js` 脚本
- `js` 调 `native`：通过拦截自定义请求
