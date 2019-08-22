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

### 柯里化

函数柯里化在函数组合（`compose`）时非常有用，可以让开发者将关注的重点聚焦到函数本身，而不用考虑冗余的数据参数

```js
// 示例
function tmp(a, b, c, d) {
  console.log(a, b, c, d);
}
const foo = curry(tmp);
foo(1, 2, 3, 4); // 1 2 3 4
foo(1, 2, 3); // 不返回
const f = foo(1, 2, 3);
f(5); // 1 2 3 5
```
`curry` 方法实现
```js
function curry(fn) {
  const func = (...argsFunc) => {
    if (argsFunc.length >= fn.length) {
      return fn(...argsFunc);
    } else {
      return (...args) => func(...argsFunc, ...args);
    }
  }
  return func;
}
```
