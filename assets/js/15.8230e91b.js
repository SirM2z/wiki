(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{205:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"html"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#html","aria-hidden":"true"}},[t._v("#")]),t._v(" HTML")]),t._v(" "),s("h2",{attrs:{id:"加载执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#加载执行","aria-hidden":"true"}},[t._v("#")]),t._v(" 加载执行")]),t._v(" "),s("h3",{attrs:{id:"script-元素渲染机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#script-元素渲染机制","aria-hidden":"true"}},[t._v("#")]),t._v(" Script 元素渲染机制")]),t._v(" "),s("p",[t._v("script 标签上设有 defer async 属性的影响")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/SirM2z/assets/master/script_defer_async.png",alt:"script 元素渲染机制"}})]),t._v(" "),s("div",{staticClass:"tip custom-block"},[s("p",[t._v("defer 只对设置 src 的 script 标签起作用")])]),t._v(" "),s("h2",{attrs:{id:"dom"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM")]),t._v(" "),s("h3",{attrs:{id:"dom-遍历"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom-遍历","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM 遍历")]),t._v(" "),s("p",[s("code",[t._v("DOM")]),t._v(" 元素属性属性诸如 "),s("code",[t._v("childNodes")]),t._v("，"),s("code",[t._v("firstChild")]),t._v(" 和 "),s("code",[t._v("nextSibling")]),t._v("并不区分元素节点和其他类型节点，比如注释和文本节点（通常只是换行符或两个节点间的空格）。因此建议用下表左侧属性代替右侧")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("属性名")]),t._v(" "),s("th",[t._v("被替代的属性")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("children")]),t._v(" "),s("td",[t._v("childNodes")])]),t._v(" "),s("tr",[s("td",[t._v("childElementCount")]),t._v(" "),s("td",[t._v("childNodes.length")])]),t._v(" "),s("tr",[s("td",[t._v("firstElementChild")]),t._v(" "),s("td",[t._v("firstChild")])]),t._v(" "),s("tr",[s("td",[t._v("lastElementChild")]),t._v(" "),s("td",[t._v("lastChild")])]),t._v(" "),s("tr",[s("td",[t._v("nextElementSibling")]),t._v(" "),s("td",[t._v("nextSibling")])]),t._v(" "),s("tr",[s("td",[t._v("previousElementSibling")]),t._v(" "),s("td",[t._v("previousSibling")])])])]),t._v(" "),s("div",{staticClass:"tip custom-block"},[s("p",[t._v("参考 《高性能 JavaScript》 第3章 DOM 编程 》DOM 访问与修改 》 遍历 DOM")])]),t._v(" "),s("h3",{attrs:{id:"dom-重排-回流（reflow）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom-重排-回流（reflow）","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM 重排\\回流（reflow）")]),t._v(" "),s("p",[t._v("当页面布局和元素几何属性改变时需要重排")]),t._v(" "),s("ul",[s("li",[t._v("添加或删除"),s("strong",[t._v("可见")]),t._v("的 "),s("code",[t._v("DOM")]),t._v(" 元素")]),t._v(" "),s("li",[t._v("元素位置改变")]),t._v(" "),s("li",[t._v("元素尺寸改变（包括：外边距、内边距、边框厚度、宽度、高度等属性变化）")]),t._v(" "),s("li",[t._v("内容改变，例如：文本改变或图片被另一个不同尺寸的图片替代")]),t._v(" "),s("li",[t._v("页面渲染器初始化")]),t._v(" "),s("li",[t._v("浏览器窗口尺寸改变")]),t._v(" "),s("li",[t._v("滚动条出现时（触发整个页面重排）")])]),t._v(" "),s("p",[t._v("重排会产生大量计算消耗，大多数浏览器通过队列化修改并批量执行来优化重排过程。但以下获取布局信息的方法会强制刷新队列并要求计划任务立刻执行来获取最新的信息，因此尽量避免使用")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("offsetTop")]),t._v(","),s("code",[t._v("offsetLeft")]),t._v(","),s("code",[t._v("offsetWidth")]),t._v(","),s("code",[t._v("offsetHeight")])]),t._v(" "),s("li",[s("code",[t._v("scrollTop")]),t._v(","),s("code",[t._v("scrollLeft")]),t._v(","),s("code",[t._v("scrollWidth")]),t._v(","),s("code",[t._v("scrollHeight")])]),t._v(" "),s("li",[s("code",[t._v("clientTop")]),t._v(","),s("code",[t._v("clientLeft")]),t._v(","),s("code",[t._v("clientWidth")]),t._v(","),s("code",[t._v("clientHeight")])]),t._v(" "),s("li",[s("code",[t._v("getComputedStyle()")]),t._v(" (currentStyle in IE)")])]),t._v(" "),s("h3",{attrs:{id:"dom-重绘（repaint）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom-重绘（repaint）","aria-hidden":"true"}},[t._v("#")]),t._v(" DOM 重绘（repaint）")]),t._v(" "),s("p",[t._v("元素的某些属性(不会引起布局改变，如颜色背景)变化导致的重新渲染")]),t._v(" "),s("h3",{attrs:{id:"元素移到顶部"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#元素移到顶部","aria-hidden":"true"}},[t._v("#")]),t._v(" 元素移到顶部")]),t._v(" "),s("p",[s("code",[t._v("ele.scrollIntoView()")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("ele")]),t._v(" 元素顶端会移动到可视区域的顶端")]),t._v(" "),s("li",[t._v("若传入参数 "),s("code",[t._v("alignToTop: false")]),t._v(", 则 "),s("code",[t._v("ele")]),t._v(" 移到屏幕底部")])]),t._v(" "),s("h2",{attrs:{id:"html5-事件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#html5-事件","aria-hidden":"true"}},[t._v("#")]),t._v(" HTML5 事件")]),t._v(" "),s("h3",{attrs:{id:"contextmenu-demo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#contextmenu-demo","aria-hidden":"true"}},[t._v("#")]),t._v(" contextmenu demo")]),t._v(" "),s("p",[t._v("右键菜单实现")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("ul")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("myMenu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token style-attr language-css"}},[s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("style")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('="')]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token property"}},[t._v("position")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" absolute"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("visibility")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" hidden"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-color")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" silver")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("li")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("111"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("li")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("li")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("222"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("li")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("li")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("333"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("li")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("ul")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" menu "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'myMenu'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'contextmenu'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("preventDefault")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    menu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("left "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientX "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px'")]),t._v("\n    menu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("top "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientY "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px'")]),t._v("\n    menu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("visibility "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'visible'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'click'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    menu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("visibility "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hidden'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("h2",{attrs:{id:"html5-存储"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#html5-存储","aria-hidden":"true"}},[t._v("#")]),t._v(" HTML5 存储")]),t._v(" "),s("h3",{attrs:{id:"sessionstorage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sessionstorage","aria-hidden":"true"}},[t._v("#")]),t._v(" sessionStorage")]),t._v(" "),s("p",[t._v("大小上限为 2.5Mb(不同浏览器会有差异), 页面关闭时便清空")]),t._v(" "),s("h3",{attrs:{id:"localstorage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#localstorage","aria-hidden":"true"}},[t._v("#")]),t._v(" localStorage")]),t._v(" "),s("p",[t._v("大小上限为 2.5Mb(不同浏览器会有差异), 页面关闭时不会清空;")]),t._v(" "),s("div",{staticClass:"tip custom-block"},[s("p",[t._v("在 "),s("code",[t._v("HTML5")]),t._v(" 范围之外与存储相关的技术还有 "),s("code",[t._v("cookie")]),t._v("(存放在客户端，可以由客户端也可以由服务端生成, 大小上限为 4 kb)、"),s("code",[t._v("IndexedDB")]),t._v("(大小上限为 5 Mb)、"),s("code",[t._v("cacheStorage")]),t._v("("),s("code",[t._v("ServiceWorker")]),t._v(")")])]),t._v(" "),s("h2",{attrs:{id:"html5-javascript-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#html5-javascript-api","aria-hidden":"true"}},[t._v("#")]),t._v(" HTML5 JavaScript Api")]),t._v(" "),s("h3",{attrs:{id:"requestanimationframe"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#requestanimationframe","aria-hidden":"true"}},[t._v("#")]),t._v(" requestAnimationFrame")]),t._v(" "),s("p",[s("code",[t._v("requestAnimationFrame(callback)")]),t._v(": 表示在重绘前执行指定的回调函数，维持16帧调用，垫片实现")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("requestAnimationFramePolyfill")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("callback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("requestAnimationFrame")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])},[],!1,null,null,null);a.default=e.exports}}]);