# JS

## Script 元素渲染机制

script 标签上设有 defer async 属性的影响

![script 元素渲染机制](https://raw.githubusercontent.com/SirM2z/assets/master/script_defer_async.png)
::: tip
defer 只对设置 src 的 script 标签起作用
:::

## 模块化

### CommonJS

NodeJS 所采用的模块化方案，简易实现：
```js
// a.js
module.exports = "test conmmonjs require";

// index.js
const fs = require('fs');

const requireSelf = (moduleName) => {
  const content = fs.readFileSync(moduleName, 'utf8');
  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', content + '\n return module.exports');
  // fn 相当于如下函数
  // function(module, exports, require, __dirname, __filename) {
  //   content + 'return module.exports'
  // }
  let module = {
    exports: {}
  };
  // const __dirname = __dirname;
  // const __filename = __filename;
  return fn(module, module.exports, requireSelf, __dirname, __filename);
}

const str = requireSelf('./a.js');
console.log(str);
```

### AMD
适合浏览器端的异步加载方案，如 `require.js`，简单实现：
```js
let factories = {};
const define = (moduleName, dependencies, func) => {
  // 将依赖挂载在函数上
  func.dependencies = dependencies;
  factories[moduleName] = func;
}
const _require = (mods, func) => {
  const res = mods.map(moduleName => {
    let factory = factories[moduleName];
    let _exports;
    let dependencies = factory.dependencies; // ['module1']
    _require(dependencies, function() {
      _exports = factory.apply(null, arguments);
    });
    return _exports;
  })
  func.apply(null, res);
}

define('module1', [], function() {
  return 'module1'
});

define('module2', ['module1'], function(module1) {
  return module1 + ' module2'
});

_require(['module2'], function(module2) {
  console.log(module2); // module1 module2
})
```

## 原型链

每个函数对象都含有一个原型对象，当访问某个对象的属性时，会先从自身属性查找（函数对象则从自身的原型对象中查找），若没有查到，就会从该对象的构造函数的原型对象中查找，这个查找过程就是原型链的体现

## 防抖

方法在 n 毫秒后调用，期间有再次调用将重置时间，重新等待 n 毫秒。常用 输入框 远程搜索

## 节流

每隔 n 毫秒调用一次方法，期间所有调用无效。常用 滚动事件 或 窗口 size 变化

## ajax 实现

```js
var isAsync = true; // 默认 true
var xhr = new XMLHttpRequest();
// document.cookie = 'abc';
// xhr.withCredentials = true; // 跨域携带 cookie
xhr.open('GET', 'url', isAsync);
xhr.onreadystatechange = function() {
  // 0 尚未调用 open
  // 1 调用 open 但还未 send
  // 2 已执行 send
  // 3 接收到数据
  // 4 请求完成
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      console.log(xhr.response);
    }
  }
};
xhr.send();
```

## ReactJS

### 生命周期

![生命周期](https://raw.githubusercontent.com/SirM2z/assets/master/react-lifecycle.png)

## Array

### map

```js
map( (item, index, array) => {}) // ES5
```
- 对数组每一项运行给定的函数，返回每次调用函数的结果组成的数组
- 不会改变原数组，返回值是一个新数组
- 如果数组元素是对象，那么是浅拷贝过去，修改对象属性会影响到原数组对象的属性

### filter
```js
filter((item, index, array) => {}) // ES5
```
- 对数组进行过滤，对数组每一项运行给定的函数，返回该函数返回true的项组成的数组
- 返回是一个新数组，不会影响到原数组
- 同样，对于对象元素，是浅拷贝

### forEach
```js
forEach( (item, index, array) => {})
```
- 遍历函数，不会修改原数组，该方法没有返回值
- 无法使用break终止循环，意味着forEach是无法终止循环的
- for循环可使用continue跳过本次循环，forEach中可以return false 来跳过本次循环

### some
```js
some((item, index, array) => {})
```
- 用于查询数组中的项是否满足某个条件
- 只要有一项返回true，则调用结束，返回true。全部返回false，则调用结果为false
- 不会改变原数组

### every
```js
every((item, index, array) => {})
```
- 用于查询数组中的项是否满足某个条件
- 只要有一项返回false，则调用结束，返回false。全部返回true，则调用结果为true
- 不会改变原数组

### reduce
```js
reduce((prev, cur, index, array) => {}, init)
```
- 数组的归并方法
- 第二个参数可选，作为归并的起始值，默认是数组第一个元素
- 第一次归并是，prev是数组第一个元素，cur为第二个元素，返回值为下次归并的prev。以此类推
- 返回值是最后一次归并的回调函数返回值
- 不会改变原数组

### reduceRight

- 同reduce，reduce是从左边开始归并，reduceRight是从右边开始归并

### splice
```js
splice(deleteIndex, deleteNum, addValue1, addValue2, ...)
```
- 该方法算是最强大的数组方法了，在指定位置开始(deleteIndex，包括该位置)，删除相应个数(deleteNum)，并在该位置插入相应值(从第三个参数开始，依次插入)
- 该方法可以实现对数组的删除、插入、替换
- 返回值为一个数组，包含从原数组删除的想，没有删除则返回空数组
- 该方法会修改原数组

### indexOf
```js
indexOf(value, start)
```
- 查找某个元素的索引
- 内部使用全等符号，必须严格相等
- 第二个参数指定查找起点
- lastIndexOf()从右到左，indexOf从左到右
- 可以使用ES6中includes、find、findIndex代替

### slice
```js
slice(start, end)
```
- 返回新数组，不会改变原数组
- 截取原数组一段返回，从start（包括）位置，到end（不包括）结束位置

### concat
- 合并数组，返回新数组，不会改变原数组
- 没有传参，返回当前调用该方法的数组(浅拷贝)
- 如果参数不是数组，依次加入到数组末尾，如果是数组，将数组拆开(只能拆开一层)依次加入到末尾

### sort
```js
sort(function)
```
- 数组各项比较时会先调用数组项的toString()方法，所以比较时字符串的比较

### reverse()
- 对数组进行倒序，该方法是在原数组上进行的，会修改原数组
- 返回值是原数组

### join(symbol)
- 以给定的符合将数组连接起来，返回值为字符串
- 如何元素中有数组，会把元素数组合并放入该位置

### shift unshift push pop

| 方法             | 功能            | 返回              |
| --------------- | --------------  | ---------------- |
| shift           | 移除第一个元素    | 第一个元素
| unshift         | 在首部加入一个元素 | 新数组长度
| push            | 在末尾加入一个元素 | 新数组长度
| pop             | 移除最后一个元素   | 最后一个元素

::: tip
以上四个方法均会改变原数组
:::

### Array.from

```js
Array.from(targeObj, mapFunction, mapThis)
```
- 生成数组的方法，返回值为一个新数组
- 从类数组对象、数组、实现了iterator接口的对象生成一个数组
- 是对原对象的拷贝，且是浅拷贝，意味着修改新的数组元素会影响到原对象
- 如果数组元素为非对象类型，修改新数组不会影响到原对象
- 可以接受第二个参数，一个函数，相当于map函数，对每个元素进行相应处理再放入新数组中
- 第三个参数，指定第二个参数函数内this

### Array.of
```js
Array.of(val1, val2, val3, ....)
```
- 生成数组的方法，返回一个新的数组
- 通过将一组数据生成数组
- 解决Array()由于参数不同产生不同行为的问题
- 当参数为空时，返回一个空数组

### copyWithin
```js
copyWithin(target, start = 0, end = this.length)
```
- 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组
- 该方法会修改当前数组
- 结束参数不包括end位置
- 数组长度不变，数组start到end-1的元素会从target(包括该位置)开始依次覆盖数组原有成员
- 参数可以是负数，表示倒数

### find
```js
find((value, index ,arr) => {})
```
- 找出第一个符合条件的数组成员，当回调函数中返回true，则符合条件；如果都没有，则返回undefined
- 接受第二个参数，用来绑定回调函数的this对象

### findIndex
- 使用与find一致，该方法返回数组成员的位置

### fill
```js
fill(value, start, end)
```
- 将给定的值，填充数组
- 第二个参数，指定填充的起始位置(包括该位置)
- 第三个参数，指定填充的结束位置(不包括该位置)
- 如果填充的对象是对象，那么赋值的是同一个内存地址的对象，也就是浅拷贝(嗯，浅拷贝，就知道会发生什么事)

### entries()
- 用于遍历数组
- 返回值为数组，里面的元素也是数组，第一元素是下标，第二个是元素值。[[0, 'a'], [1, 'b'], [3, 'c']]

### keys()
- 用于遍历数组
- 返回数组的键名组成的数组

### values()
- 用于遍历数组
- 返回数组键值组成的数组

### includes
```js
includes(start = 0)
```
- 返回值一个布尔值，判断数组是否包含给定的值
- ES2016引入该方法，类似于字符串的includes方法
- 第二个参数指定搜索的起始位置，如果是负数，表示倒数位置
- 相对于indexOf，该方法更加语义化。另外NaN.includes(NaN)返回true，而indexOf不能判断。
- 可以使用ES5中的some方法实现该功能

### flat()
- 对数组内嵌套的数组“拉平”，就是把数组中的数组的元素挨个拿出来，放数组元素所在位置，返回一个新的数组，不会影响到原来的数组
- 接收第二个参数，只能拉平的层数，默认只有一层。想无限拉平可以传入Infinity关键字

### flatMap(function)
- 同flat一样，先执行map函数再进行拉平
- 只能拉平一层
