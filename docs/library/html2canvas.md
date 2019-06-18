# html2canvas

## 使用
```js
html2canvas(domElement).then(canvas => {
  const base64 = canvas.toDataURL("image/png");
});
```

## 坑

- 样式中不要用背景图片，采用 `img` 元素加绝对定位布局，避免合成图模糊
- 合成图 `dom` 在合成过程中，如果未出现在视窗内，会造成白屏
