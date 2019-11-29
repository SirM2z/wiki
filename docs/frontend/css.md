# CSS

## 伪类
处于dom树无法描述的状态下才能为元素添加样式，hover；

## 伪元素
创建一些不在文档树中的元素，before，双冒号（css3规定）

## 元素各种 `width`

方块样式
```css
.box {
  padding: 20px;
  margin: 10px;
  width: 100px;
  height: 100px;
  background-color: #FFB5BF;
  border: 6px solid #94E8FF;
}
```
<CSSAllWidth />

## `z-index`

### 两个原则
1. 非层叠上下文：谁大谁上
2. 层叠上下文：后来居上

### 非层叠上下文
```html
<div style="position:relative; z-index:auto;">
  <!-- 红 -->
  <div style="background-color:#FFB5BF; width:100px; height:50px; position:absolute; z-index:2;"></div>
</div>
<div style="position:relative; z-index:auto;">
  <!-- 蓝 -->
  <div style="background-color:#94E8FF; width:50px; height:100px; position:absolute; z-index:1;"></div>
</div>
```
<div style="height:100px;">
  <div style="position:relative; z-index:auto;">
    <div style="background-color:#FFB5BF; width:100px; height:50px; position:absolute; z-index:2;"></div>
  </div>
  <div style="position:relative; z-index:auto;">
    <div style="background-color:#94E8FF; width:50px; height:100px; position:absolute; z-index:1;"></div>
  </div>
</div>

`z-index:auto` 是一个普通的元素，遵循**谁大谁上**

### 层叠上下文
```html
<div style="position:relative; z-index:0;">
  <!-- 红 -->
  <div style="background-color:#FFB5BF; width:100px; height:50px; position:absolute; z-index:2;"></div>
</div>
<div style="position:relative; z-index:0;">
  <!-- 蓝 -->
  <div style="background-color:#94E8FF; width:50px; height:100px; position:absolute; z-index:1;"></div>
</div>
```
<div style="height:100px;">
  <div style="position:relative; z-index:0;">
    <div style="background-color:#FFB5BF; width:100px; height:50px; position:absolute; z-index:2;"></div>
  </div>
  <div style="position:relative; z-index:0;">
    <div style="background-color:#94E8FF; width:50px; height:100px; position:absolute; z-index:1;"></div>
  </div>
</div>

将 `z-index:auto` 改为 `z-index:0` 之后，两个父元素都变为层叠上下文，遵循**后来居上**，子元素的 `z-index` 失去作用

### 创建层叠上下文元素

- 根元素 `Html`
- `z-index` 值为数值的定位元素的传统层叠上下文
- 其他 `CSS3` 属性

:::tip
参考[深入理解CSS中的层叠上下文和层叠顺序 -- 张鑫旭](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
:::

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
两边固定宽度，中间自适应的三栏布局，并且主要内容要优先渲染，按照 `DOM` 从上至下的加载原则，中间的自适应部分要放在前面。`HTML` 结构如下
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
- 将 `.left .right` 元素的 `margin-left` 设为负值而拉回与 `.center` 同行
- 设 `.container` 的 `padding` 值而缩小 `.center` 的宽度
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
- 将 `.left .right` 元素的 `margin-left` 设为负值而拉回与 `.center` 同行
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

[flex 工具以及属性介绍](https://sirm2z.github.io/flexbox-cssgrid/)

## Animation

```css
animation: name duration timing-function delay iteration-count direction fill-mode;
```
`animation-name` 规定需要绑定到选择器的 keyframe 名称

`animation-duration` 规定完成动画所花费的时间，以秒或毫秒计

`animation-timing-function` 规定动画的速度曲线

| timing-function       | 描述           |
| --------------------- | ------------- |
| linear                | 动画从头到尾的速度是相同的 |
| ease                  | 默认。动画以低速开始，然后加快，在结束前变慢 |
| ease-in               | 动画以低速开始 |
| ease-out              | 动画以低速结束 |
| ease-in-out           | 动画以低速开始和结束 |
| cubic-bezier(n,n,n,n) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值 |

`animation-delay` 规定在动画开始之前的延迟

`animation-iteration-count` 规定动画应该播放的次数

| iteration-count | 描述           |
| --------------- | ------------- |
| n               | 定义动画播放次数的数值 |
| infinite        | 规定动画应该无限次播放 |

`animation-direction` 规定是否应该轮流反向播放动画

| direction | 描述           |
| --------- | ------------- |
| normal    | 默认值。动画应该正常播放 |
| alternate | 动画应该轮流反向播放 |

`animation-fill-mode` 规定动画在播放之前或之后，其动画效果是否可见

| fill-mode | 描述           |
| --------- | ------------- |
| none      | 不改变默认行为 |
| forwards  | 当动画完成后，保持最后一个属性值（在最后一个关键帧中定义） |
| backwards | 在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义） |
| both      | 向前和向后填充模式都被应用 |

## 常用 css 示例

### loading 效果
<style>
.css-loading-demo {
  margin-top: 10px;
  width: 50px;
  height: 50px;
  display: inline-block;
  border: 5px solid #ddd;
  border-left-color: #FFB5BF;
  border-radius: 50%;
  animation: css-loading-demo-animation 1.2s linear infinite;
}
@keyframes css-loading-demo-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<div class="css-loading-demo"></div>

```html
<style>
.loading {
  width: 50px;
  height: 50px;
  display: inline-block;
  border: 5px solid #ddd;
  border-left-color: #FFB5BF;
  border-radius: 50%;
  animation: loading-animation 1.2s linear infinite;
}
@keyframes loading-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<div class="loading"></div>
```

### 居中
1. 行内元素使用 `text-aign:center;` 与 `line-height`
2. 块状元素定宽使用 `margin: 0 auto;`
3. 绝对定位
    - 知道子元素宽度
      ```css
      .container {
        width: 200px;
        height: 200px;
        position: relative;
      }
      .item {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
      }
      ```
    - 不知道子元素宽度
      ```css
      .container {
        width: 200px;
        height: 200px;
        position: relative;
      }
      .item {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      ```
4. `flex` 布局
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 三角形

先设置一个宽高均为 0 的盒子，并设置 `border` 看下效果
```css
.box {
  width: 0;
  height: 0;
  border-top: 50px solid #FFB5BF;
  border-bottom: 50px solid #FFB5BF;
  border-right: 50px solid #94E8FF;
  border-left: 50px solid #94E8FF;
}
```
<style>
.css-triangle-box {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 50px solid #FFB5BF;
  border-bottom: 50px solid #FFB5BF;
  border-right: 50px solid #94E8FF;
  border-left: 50px solid #94E8FF;
}
</style>
<div class="css-triangle-box"></div>
移除 `border-top` 效果：
<style>
.css-triangle-box-rm-top {
  display: inline-block;
  width: 0;
  height: 0;
  border-bottom: 50px solid #FFB5BF;
  border-right: 50px solid #94E8FF;
  border-left: 50px solid #94E8FF;
}
</style>
<div class="css-triangle-box-rm-top"></div>

可以发现，只需要修改对应的方向上的 `border` 即可实现三角形，如修改左右的 `border-color` 为 `transparent`，即下例中的 `box4`。所有 `demo` 实现：

<style lang="less">
.css-triangle-box-all-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  > div {
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .box {
    width: 0;
    height: 0;
    border-top: 50px solid #FFB5BF;
    border-bottom: 50px solid #FFB5BF;
    border-right: 50px solid #94E8FF;
    border-left: 50px solid #94E8FF;
  }
  .box1 {
    width: 0;
    height: 0;
    border-bottom: 50px solid #FFB5BF;
    border-right: 50px solid #94E8FF;
    border-left: 50px solid #94E8FF;
  }
  .box2 {
    width: 0;
    height: 0;
    border-bottom: 50px solid #FFB5BF;
    border-left: 50px solid #94E8FF;
  }
  .box3 {
    width: 0;
    height: 0;
    border-bottom: 50px solid transparent;
    border-left: 50px solid #94E8FF;
  }
  .box4 {
    width: 0;
    height: 0;
    border-bottom: 50px solid #FFB5BF;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
  }
  .box5 {
      width: 200px;
      height: 100px;
      background-color: #FFB5BF;
      border-radius: 100% 0 0 0;
  }
  .box6 {
    position: relative;
    width: 200px;
    height: 50px;
    line-height: 50px;
    border: 5px solid #FFB5BF;
    border-radius: 5px;
  }
  .box6-1 {
    position: absolute;
    left: 50%;
    top: 100%;
    margin-left: -20px;
    width: 0;
    height: 0;
    border-top: 20px solid #FFB5BF;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
  }
  .box6-2 {
    position: absolute;
    left: 50%;
    top: 100%;
    margin-left: -13px;
    width: 0;
    height: 0;
    border-top: 13px solid #ffffff;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
  }
}
</style>
<div class="css-triangle-box-all-demo">
  <div><div class="box"></div>box</div>
  <div><div class="box1"></div>box1</div>
  <div><div class="box2"></div>box2</div>
  <div><div class="box3"></div>box3</div>
  <div><div class="box4"></div>box4</div>
  <div><div class="box5"></div>box5</div>
  <div>
    <div class="box6">
      box6
      <div class="box6-1"></div>
      <div class="box6-2"></div>
    </div>
  </div>
</div>

```html
<div class="box"></div>
<div class="box1"></div>
<div class="box2"></div>
<div class="box3"></div>
<div class="box4"></div>
<div class="box5"></div>
<div class="box6">
  <div class="box6-1"></div>
  <div class="box6-2"></div>
</div>
<style>
.box {
  width: 0;
  height: 0;
  border-top: 50px solid #FFB5BF;
  border-bottom: 50px solid #FFB5BF;
  border-right: 50px solid #94E8FF;
  border-left: 50px solid #94E8FF;
}
.box1 {
  width: 0;
  height: 0;
  border-bottom: 50px solid #FFB5BF;
  border-right: 50px solid #94E8FF;
  border-left: 50px solid #94E8FF;
}
.box2 {
  width: 0;
  height: 0;
  border-bottom: 50px solid #FFB5BF;
  border-left: 50px solid #94E8FF;
}
.box3 {
  width: 0;
  height: 0;
  border-bottom: 50px solid transparent;
  border-left: 50px solid #94E8FF;
}
.box4 {
  width: 0;
  height: 0;
  border-bottom: 50px solid #FFB5BF;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
}
.box5 {
    width: 200px;
    height: 100px;
    background-color: #FFB5BF;
    border-radius: 100% 0 0 0;
}
.box6 {
  position: relative;
  width: 200px;
  height: 50px;
  border: 5px solid #FFB5BF;
  border-radius: 5px;
}
.box6-1 {
  position: absolute;
  left: 50%;
  top: 100%;
  margin-left: -20px;
  width: 0;
  height: 0;
  border-top: 20px solid #FFB5BF;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
.box6-2 {
  position: absolute;
  left: 50%;
  top: 100%;
  margin-left: -13px;
  width: 0;
  height: 0;
  border-top: 13px solid #ffffff;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
}
</style>
```

::: tip
所有示例查看 [jsfiddle](https://jsfiddle.net/coolmrz/tyLjbnfs/)
:::

### 阴影 box-shadow
`box-shadow: h-shadow v-shadow blur spread color inset;`
- `h-shadow`：必需设置，表示水平阴影的位置，正值阴影向右，负值向左
- `v-shadow`：必需设置，表示垂直阴影的位置，正值阴影向下，负值向上
- `blur`：可选，代表模糊半径
- `spread`：可选，阴影的尺寸
- `color`：可选，阴影的颜色
- `inset`：可选，使用该值可以将外部阴影（outset）转换成内部阴影

将水平阴影和垂直阴影都设为 0，可以制造“发光”一样的特效：`box-shadow: 0 0 10px 2px #94E8FF;`
<style>
.css-box-shadow-0-light {
  width: 100px;
  height: 100px;
  background-color: #FFB5BF;
  box-shadow: 0 0 10px 2px #94E8FF;
}
</style>
<div class="css-box-shadow-0-light"></div>

### 单/双行文本超出显示省略号

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

### 固定 Foot 在页底

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

### 清除浮动

1. 使用 :after 伪元素
```css
.clearfix {
  zoom: 1; /*兼容 IE*/
}
.clearfix:after { /*最简方式*/
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

2. 利用overflow:hidden;属性

```css
.float {
  overflow: hidden;
  zoom: 1; /*兼容 IE*/
}
```

3. 额外标签法
```html
<div class="clearfix" style="clear:both;"></div>
```

4. 其它方法

- 给父元素定高
- 父元素浮动（外层依然塌陷）
- 父元素处于绝对定位（外层依然塌陷）

### 按钮按压效果（透明+缩放）

```css
.press-btn:active {
  transition: all 0.3s;
  opacity: 0.8;
  transform: scale(0.9);
}
```
