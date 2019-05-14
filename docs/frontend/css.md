# css

## felx

[flex 工具以及属性介绍](http://sirm2z.github.io/a_project/flexbox-cssgrid/index.html)

## animation

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
