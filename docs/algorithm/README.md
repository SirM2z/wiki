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

利用迭代器实现：
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

利用 `js` 语言特性最简单的方法：
```js
eval(`[${[[1,2],[3,[4]],5] + ''}]`) // [1, 2, 3, 4, 5]
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

## 排序算法

### 冒泡排序

时间复杂度：`O(n^2)`

冒泡排序（`Bubble Sort`）也是一种简单直观的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

![冒泡排序](~@img/paixu-maopao.gif)

#### `JavaScript` 实现

```js
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

### 快速排序

平均时间复杂度：`O(nlogn)`，最坏情况时间复杂度：`O(n^2)`

快速排序使用分治法策略来把一个串行分为两个子串行，快速排序又是一种分而治之思想在排序算法上的典型应用。本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。

![快速排序](~@img/paixu-kuaisu.gif)

#### `JavaScript` 实现

```js
function quickSort(arr, left, right) {
  const len = arr.length;
  left = typeof left != 'number' ? 0 : left;
  right = typeof right != 'number' ? len - 1 : right;

  if (left < right) {
    const partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}

// 分区操作
function partition(arr, left ,right) {
  const pivot = left; // 设定基准值（pivot）
  let index = pivot + 1;
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
```
