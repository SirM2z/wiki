## React

## 生命周期

![生命周期](https://raw.githubusercontent.com/SirM2z/assets/master/react-lifecycle.png)

## VertualDom

实现效果：![VertualDom](https://raw.githubusercontent.com/SirM2z/assets/master/20190624174255.png)

具体实现：
```js
// vertualDom Object
function Element(type, props, children) {
  this.type = type;
  this.props = props;
  this.children = children;
}

// create vertualDom method
function createElement(type, props, children) {
  return new Element(type, props, children);
}

// set attribute
function setAttr(node, key, value) {
  switch (key) {
    case 'value':
      if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case 'style':
      node.style.cssTex = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

// generate dom
function render(vertualDom) {
  const el = document.createElement(vertualDom.type);
  for(let key in vertualDom.props) {
    setAttr(el, key, vertualDom.props[key]);
  }
  vertualDom.children.forEach(child => {
    const childEl = (child instanceof Element) ? render(child) : document.createTextNode(child);
    el.appendChild(childEl);
  });
  return el;
}

// append dom to html
function renderDom(el, root) {
  root.appendChild(el);
}

// usage
const vertualDom = createElement('ul', {calss: 'list'}, [
  createElement('li', {class: 'item'}, ['a']),
  createElement('li', {class: 'item'}, ['b']),
  createElement('li', {class: 'item'}, ['c']),
]);
const el = render(vertualDom);
console.log(vertualDom);
console.log(el);
renderDom(el, document.getElementById('root'));
```

## VertualDom Diff 策略

1. `Web UI` 中 `DOM` 节点跨层级的移动操作特别少，可以忽略不计
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
3. 对于同一层级的一组子节点，它们可以通过唯一 `id(key)` 进行区分
