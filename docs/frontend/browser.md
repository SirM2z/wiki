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

## 当浏览器输入一个地址发生了什么

[https://github.com/alex/what-happens-when](https://github.com/alex/what-happens-when)

## native webview 通讯原理
- `native` 调 `js`：原生 `webview` 组件自带 `api`
- `js` 调 `native`：通过拦截自定义网络请求实现
