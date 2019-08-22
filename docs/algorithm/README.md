---
sidebarDepth: 3
sidebar: auto
---

# 算法

## 基础技巧

### 数组 `[[1,2],[3,4]]` 摊平

`[].concat(...[[1,2],[3,4]])`

### 数组 `[[1,2],[3,[4]],5]` 摊平

```js
function flatten(array) {
  return [].concat(
    ...array.map(x => Array.isArray(x) ? flatten(x) : x)
  );
}
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
