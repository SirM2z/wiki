# HTML

## 加载执行
### Script 元素渲染机制

script 标签上设有 defer async 属性的影响

![script 元素渲染机制](https://raw.githubusercontent.com/SirM2z/assets/master/script_defer_async.png)
::: tip
defer 只对设置 src 的 script 标签起作用
:::

## DOM
### DOM 遍历
`DOM` 元素属性属性诸如 `childNodes`，`firstChild` 和 `nextSibling`并不区分元素节点和其他类型节点，比如注释和文本节点（通常只是换行符或两个节点间的空格）。因此建议用下表左侧属性代替右侧

| 属性名                   | 被替代的属性        |
| ----------------------- | ----------------- |
| children                | childNodes        |
| childElementCount       | childNodes.length |
| firstElementChild       | firstChild        |
| lastElementChild        | lastChild         |
| nextElementSibling      | nextSibling       |
| previousElementSibling  | previousSibling   |

::: tip
参考 《高性能 JavaScript》 第3章 DOM 编程 》DOM 访问与修改 》 遍历 DOM
:::

### DOM 重排\回流（reflow）
当页面布局和元素几何属性改变时需要重排
- 添加或删除**可见**的 `DOM` 元素
- 元素位置改变
- 元素尺寸改变（包括：外边距、内边距、边框厚度、宽度、高度等属性变化）
- 内容改变，例如：文本改变或图片被另一个不同尺寸的图片替代
- 页面渲染器初始化
- 浏览器窗口尺寸改变
- 滚动条出现时（触发整个页面重排）

重排会产生大量计算消耗，大多数浏览器通过队列化修改并批量执行来优化重排过程。但以下获取布局信息的方法会强制刷新队列并要求计划任务立刻执行来获取最新的信息，因此尽量避免使用
- `offsetTop`,`offsetLeft`,`offsetWidth`,`offsetHeight`
- `scrollTop`,`scrollLeft`,`scrollWidth`,`scrollHeight`
- `clientTop`,`clientLeft`,`clientWidth`,`clientHeight`
- `getComputedStyle()` (currentStyle in IE)

### DOM 重绘（repaint）
元素的某些属性(不会引起布局改变，如颜色背景)变化导致的重新渲染

### 元素移到顶部
`ele.scrollIntoView()`
- `ele` 元素顶端会移动到可视区域的顶端
- 若传入参数 `alignToTop: false`, 则 `ele` 移到屏幕底部

## HTML5 事件
### contextmenu demo
右键菜单实现
```html
<ul id="myMenu" style="position: absolute;visibility: hidden;background-color: silver">
  <li>111</li>
  <li>222</li>
  <li>333</li>
</ul>
<script>
  var menu = document.getElementById('myMenu')
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    menu.style.left = event.clientX + 'px'
    menu.style.top = event.clientY + 'px'
    menu.style.visibility = 'visible'
  }, false)
  document.addEventListener('click', (event) => {
    menu.style.visibility = 'hidden'
  }, false)
</script>
```

## HTML5 存储

### sessionStorage
大小上限为 2.5Mb(不同浏览器会有差异), 页面关闭时便清空


### localStorage
大小上限为 2.5Mb(不同浏览器会有差异), 页面关闭时不会清空;

::: tip
在 `HTML5` 范围之外与存储相关的技术还有 `cookie`(存放在客户端，可以由客户端也可以由服务端生成, 大小上限为 4 kb)、`IndexedDB`(大小上限为 5 Mb)、`cacheStorage`(`ServiceWorker`)
:::

## HTML5 JavaScript Api

### requestAnimationFrame
`requestAnimationFrame(callback)`: 表示在重绘前执行指定的回调函数，维持16帧调用，垫片实现
```js
function requestAnimationFramePolyfill(callback) {
  return window.requestAnimationFrame(callback) || setTimeout(callback, 1000 / 60);
}
```
