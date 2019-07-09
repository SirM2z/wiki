# CSS

## 伪类
处于dom树无法描述的状态下才能为元素添加样式，hover；

## 伪元素
创建一些不在文档树中的元素，before，双冒号（css3规定）

## 两栏布局

![效果图](https://raw.githubusercontent.com/SirM2z/assets/master/two-row-layout.png)

`HTML` 结构如下
```html
<div class="container">
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

### inline-block 与 calc 结合

```css
.container {
  font-size: 0; /* 消除间距 */
}
.left {
  display: inline-block;
  width: 100px;
  height: 150px;
  background-color: #FFB5BF;
}
.right {
  display: inline-block;
  width: calc(100% - 100px); /* 计算宽度，运算符号左右一定要有空格 */
  height: 150px;
  background-color: #94E8FF;
}
```

### float 与 margin
原理：块状元素无视浮动元素，利用 `margin` 预留空间
```css
.left {
  float: left;
  width: 100px;
  height: 150px;
  background-color: #FFB5BF;
}
.right {
  width: 100%;
  margin-left: 100px; /* 为 .left 留出空间 */
  height: 150px;
  background-color: #94E8FF;
}
```

### float 与 calc
原理：均浮动，计算右侧宽度
```css
.container {
  overflow: hidden;
}
.left {
  float: left;
  width: 100px;
  height: 150px;
  background-color: #FFB5BF;
}
.right {
  float: left;
  width: calc(100% - 100px); /* 计算宽度，运算符号左右一定要有空格 */
  height: 150px;
  background-color: #94E8FF;
}
```

### float 与 BFC
原理：`BFC` 不会忽视浮动元素，让 `.right` 形成 `BFC`
```css
.container {
  overflow: hidden;
}
.left {
  float: left;
  width: 100px;
  height: 150px;
  background-color: #FFB5BF;
}
.right {
  overflow: auto; /* 形成 BFC */
  height: 150px;
  background-color: #94E8FF;
}
```

### absolute
原理：`absolute` 会脱离文档流
```css
.container {
  position: relative;
}
.left {
  position: absolute;
  width: 100px;
  height: 150px;
  background-color: #FFB5BF;
}
.right {
  margin-left: 100px;
  height: 150px;
  background-color: #94E8FF;
}
```

## 三栏布局

![实现效果](https://raw.githubusercontent.com/SirM2z/assets/master/three-row-layout.png)
两边固定宽度，中间自适应的三栏布局，并且主要内容要优先渲染，按照 DOM 从上至下的加载原则，中间的自适应部分要放在前面。`HTML` 结构如下
```html
<div class="container">
  <div class="center">center</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```
默认 `css` 样式如下
```css
body {
  min-width: 630px;
}
.center {
  width: 100%;
  height: 150px;
  background-color: #94E8FF;
}
.left {
  width: 100px;
  height: 150px;
  background-color: #FFB5BF;
}
.right {
  width: 200px;
  height: 150px;
  background-color: #8990D5;
}
```

### 圣杯布局
原理：
- 三个元素均设为 `float: left` 浮动元素
- 设 `margin-left` 为负值将 `.left .right` 元素拉回与 `.center` 同行
- 设 `.container` 的 `padding` 值缩小 `.center` 的宽度
- 将 `.left .right` 通过 `relative` 定位回归左侧和右侧
```css
.container {
  padding-right: 200px;
  padding-left: 100px;
}
.center, .left, .right {
  float: left; /* 设为浮动元素 */
}
.left {
  margin-left: -100%; /* 外边距设为百分比时将参考父元素的宽度，设置 -100% 拉回到 center 左侧 */
  position: relative;
  left: -100px;
}
.right {
  margin-left: -200px; /* 设置 -200px 将自己左移200px */
  position: relative;
  right: -200px;
}
```

### 双飞翼布局
原理（前两条同圣杯布局）：
- 三个元素均设为 `float: left` 浮动元素
- 设 `margin-left` 为负值将 `.left .right` 元素拉回与 `.center` 同行
- 在 `.center` 中增加 `.main` 元素，设置 `.main` 元素的 `margin left right` 解决覆盖问题
```html
<div class="container">
  <div class="center">
    <div class="main">center</div>
  </div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```
```css
.center, .left, .right {
  float: left;
}
.main {
  margin-left: 100px;
  margin-right: 200px;
}
.left {
  margin-left: -100%;
}
.right {
  margin-left: -200px;
}
```

## Felx

[flex 工具以及属性介绍](http://sirm2z.github.io/a_project/flexbox-cssgrid/index.html)

## Animation

```css
animation: name duration timing-function delay iteration-count direction fill-mode;
```
`animation-name` 规定需要绑定到选择器的 keyframe 名称。

`animation-duration` 规定完成动画所花费的时间，以秒或毫秒计。

`animation-timing-function` 规定动画的速度曲线。

| timing-function       | 描述           |
| --------------------- | ------------- |
| linear                | 动画从头到尾的速度是相同的 |
| ease                  | 默认。动画以低速开始，然后加快，在结束前变慢 |
| ease-in               | 动画以低速开始 |
| ease-out              | 动画以低速结束 |
| ease-in-out           | 动画以低速开始和结束 |
| cubic-bezier(n,n,n,n) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值 |

`animation-delay` 规定在动画开始之前的延迟。

`animation-iteration-count` 规定动画应该播放的次数。

| iteration-count | 描述           |
| --------------- | ------------- |
| n               | 定义动画播放次数的数值 |
| infinite        | 规定动画应该无限次播放 |

`animation-direction` 规定是否应该轮流反向播放动画。

| direction | 描述           |
| --------- | ------------- |
| normal    | 默认值。动画应该正常播放 |
| alternate | 动画应该轮流反向播放 |

`animation-fill-mode` 规定动画在播放之前或之后，其动画效果是否可见。

| fill-mode | 描述           |
| --------- | ------------- |
| none      | 不改变默认行为 |
| forwards  | 当动画完成后，保持最后一个属性值（在最后一个关键帧中定义） |
| backwards | 在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义） |
| both      | 向前和向后填充模式都被应用 |


## 单/双行文本超出显示省略号

单行

```css
.single-line {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
```

多行

```css
.multi-line {
  line-height: 32px; /* 配合 height 使用 */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 2行文本超出 */
}
```

## 固定foot在页底

```html
<div class="page-wrap">
  Content!
</div>

<footer class="site-footer">
  I'm the Sticky Footer.
</footer>
```

```css
* {
  margin: 0;
}
html, body {
  height: 100%;
}
.page-wrap {
  min-height: 100%;
  /* equal to footer height */
  margin-bottom: -142px; 
}
.page-wrap:after {
  content: "";
  display: block;
}
.site-footer, .page-wrap:after {
  height: 142px; 
}
.site-footer {
  background: orange;
}
```

## 清除浮动

### 使用 :after 伪元素
```css
.clearfix { /*兼容 IE*/
  zoom: 1;
}
.clearfix:after {  /*最简方式*/
  content: '';
  display: block;
  clear: both;
}
/* 新浪使用方式 */
.clearfix:after { 
  content: '';
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
```

### 利用overflow:hidden;属性

```css
.float {
  overflow: hidden;
  zoom: 1;/*兼容 IE*/
}
```

### 额外标签法
```html
<div class="clearfix" style="clear:both;"></div>
```

### 其它方法

- 给父元素定高
- 父元素浮动（外层依然塌陷）
- 父元素处于绝对定位（外层依然塌陷）

## 按钮按压效果

### 透明+缩放

```css
.press-btn:active {
  transition: all 0.3s;
  opacity: 0.8;
  transform: scale(0.9);
}
```
