---
sidebarDepth: 3
sidebar: auto
---

# 算法

## 基础技巧

### 二维数组展平

```js
const arr = [[1,2],[3,4]];
[].concat(...arr); // [1, 2, 3, 4]
```

### 三维以上数组展平

```js
const arr = [[1,2],[3,[4]],5];
function flatten(array) {
  return [].concat(
    ...array.map(x => Array.isArray(x) ? flatten(x) : x)
  );
}
flatten(arr); // [1, 2, 3, 4, 5]
```

利用 `js` 语言特性最简单的方法：
```js
eval(`[${[[1,2],[3,[4]],5] + ''}]`) // [1, 2, 3, 4, 5]
```
利用迭代器实现
```js
const arr = [[1,2],[3,[4]],5];
function *flatten(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      yield * flatten(arr[i]);
    } else {
      yield arr[i];
    }
  }
}
console.log([...flatten(arr)]); // [1, 2, 3, 4, 5]
```
