# html2canvas

## 文档
[https://html2canvas.hertzen.com/configuration](https://html2canvas.hertzen.com/configuration)

## 使用
```js
// 网络图片需要配置 useCORS:true
html2canvas(domElement).then(canvas => {
  const base64 = canvas.toDataURL("image/png");
});
```

## 坑

- 样式中不要用背景图片，采用 `img` 元素加绝对定位布局，避免合成图模糊
- 合成图 `dom` 在合成过程中，如果未出现在视窗内，会造成白屏（ios 出现）
