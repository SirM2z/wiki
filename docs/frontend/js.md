# JS

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
  //   content
  //   return module.exports;
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

### CMD

`CMD` 是另一种 `js` 模块化方案，它与 `AMD` 很类似，不同点在于：`AMD` 推崇依赖前置、提前执行，`CMD` 推崇依赖就近、延迟执行。此规范其实是在 `sea.js` 推广过程中产生的

## 创建对象

### 原型对象

::: tip
无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 `prototype` 属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 `constructor`（构造函数）属性，这个属性是一个指向 `prototype` 属性所在函数的指针。

《JavaScript 高级程序设计（第3版）》 p148（理解原型对象）
:::

### 组合模式
结合构造函数模式和原型模式
```js
function Foo(name) {
  this.name = name; // 实例属性
}
// 共享方法
Foo.prototype.getName = function() {
  return this.name;
}
var foo = new Foo('foo');
```

## 继承

### 原型链

每个函数对象都含有一个原型对象，当访问某个对象的属性时，会先从自身属性查找（函数对象则从自身的原型对象中查找），若没有查到，就会从原型对象中查找，这个查找过程就是原型链的体现

::: tip
构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。

《JavaScript 高级程序设计（第3版）》 p162（原型链）
:::

原型链继承
```js
function SuperType() {
  this.value = true; // 实例属性
}
// 共享方法
SuperType.prototype.getSuperValue = function() {
  console.log(this.value);
}

function SubType() {
  this.subValue = false; // 实例属性
}
// 继承 SuperType
// 重写 prototype 导致 constructor 等于 SuperType.prototype.constructor
SubType.prototype = new SuperType();
// 共享方法
SubType.prototype.getSubValue = function() {
  console.log(this.subValue);
}

// sub 的 constructor 由于原型链的缘故指向 SuperType 而非 SubType
var sub = new SubType();
sub.getSuperValue(); // true
sub.getSubValue(); // false
```
存在的问题：
1. 父类中**引用类型的实例属性**变成子类的**原型属性**，即实例的共享属性
    ```JS
    function SuperType() {
      this.value = [1]; // 实例属性
    }
    function SubType() {}
    SubType.prototype = new SuperType();
    var sub1 = new SubType();
    var sub2 = new SubType();
    sub1.value.push(2);
    console.log(sub2.value); // ==> [1, 2]
    ```
2. 创建子类型的实例时，不能很好的向父类型的构造函数中传递参数

### 借用构造函数
此方式可以解决上述两个问题
```js
function SuperType(name) {
  this.value = [1];
  this.name = name;
}

function SubType() {
  // 这里调用父类构造函数，转换实例属性
  SuperType.call(this, 'name');
}
// 继承 SuperType
SubType.prototype = new SuperType();
var sub1 = new SubType();
var sub2 = new SubType();
sub1.value.push(2);
console.log(sub1.value); // ==> [1, 2]
console.log(sub2.value); // ==> [1]
console.log(sub1.name); // ==> "name"
```
单纯使用**借用构造函数**方式，所有方法就必须在构造函数中声明，函数复用就无从谈起

### 组合继承
原型链加借用构造函数的方式称为**组合继承**，原理：
- 使用原型链实现对原型属性和方法的继承
- 通过借用构造函数来实现对实例属性的继承
```js
function SuperType(name) {
  this.value = [1];
  this.name = name;
}
SuperType.prototype.getName = function() {
  console.log(this.name);
}

function SubType(name) {
  // 这里调用父类构造函数，转换实例属性
  SuperType.call(this, name);
  this.subValue = 'subValue';
}
// 继承 SuperType
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.getValue = function() {
  console.log(this.subValue);
}
var sub1 = new SubType('sub1');
sub1.value.push(2);
console.log(sub1.value); // [1, 2]
sub1.getName(); // "sub1"
sub1.getValue(); // "subValue"

var sub2 = new SubType('sub2');
console.log(sub2.value); // [1]
sub2.getName(); // "sub2"
sub2.getValue(); // "subValue"
```
依然有个问题，这种继承实现必须调用两次父类的构造函数：
1. 在创建子类型原型的时候：`SubType.prototype = new SuperType();`，这里把 `SuperType` 的实例赋值给 `SubType` 的原型，因此 `SubType` 的原型上实例化了 `value, name` 属性
2. 在子类型的构造函数内部：`SuperType.call(this, name);`，这里通过 `call` 函数将 `value, name` 属性定义在 `this` 上

因此可以看出，`SubType` 的实例属性和原型对象属性中存在两份相同的属性，即 `value, name`

### 原型式继承
```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
var person = {
  friends: ['a', 'b']
}
var personA = object(person);
personA.friends,push('c');

var personB = object(person);
personA.friends,push('d');

console.log(person.friends); // ['a', 'b', 'c', 'd']
```
只想让一个对象与另一个对象保持类似的情况下，**原型式继承**是完全可以胜任的。不过包含引用类型值的属性都会共享相应的值，就像使用原型模式一样

`ES5` 中 `Object.create` 方法传入一个参数时，与 `object` 方法的行为相同

### 寄生式继承
这种思路与寄生式构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数
```js
function createAnother(original) {
  var clone = Object.create(original); // 通过调用函数创建一个新对象
  clone.sayHi = function() {
    console.log('hi');
  }
  return clone;
}
var person = {
  friends: ['a', 'b']
}
var personA = createAnother(person);
personA.sayHi(); // 'hi'
```

### 寄生式组合继承
前面说过**组合继承**的一些问题，这里可以通过引入 **寄生式继承** 避免 **在创建子类型原型的时候** 调用父类的构造函数
```js
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}
```
寄生式组合继承实现：
```js
function SuperType(name) {
  this.value = [1];
  this.name = name;
}
SuperType.prototype.getName = function() {
  console.log(this.name);
}

function SubType(name) {
  // 这里调用父类构造函数，转换实例属性
  SuperType.call(this, name);
  this.subValue = 'subValue';
}
// 继承 SuperType
inheritPrototype(SubType, SuperType);
SubType.prototype.getValue = function() {
  console.log(this.subValue);
}
```
这种实现方式只调用了一次 `SuperType`构造函数，因此避免了在 `SubType.prototype` 上面创建不必要的、多余的属性，并且保持原型链不变

**寄生式组合继承**被普遍认为是引用类型最理想的继承范式

## 防抖

方法在 n 毫秒后调用，期间有再次调用将重置时间，重新等待 n 毫秒。常用 输入框 远程搜索

```js
// ---1--2--3---------4--5--6-----------
// -----------------3---------------6---
//          | 300ms |       | 300ms |   
function debounce(func, interval = 300) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, interval);
  };
}
```

## 节流

每隔 n 毫秒调用一次方法，期间所有调用无效。常用 滚动事件 或 窗口 size 变化
```js
// ---1--2--3---------4--5--6---------
// ---1---------------4---------------
//    |    300ms    |    300ms    |   
function throttle(func, interval = 300) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    func.apply(this, arguments);
    canRun = false;
    setTimeout(() => {canRun = true}, interval);
  };
}
```

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

## 常用的 `Math` 函数

| 方法          | 描述    |
| ------------ | ------- |
| Math.abs     | 求绝对值 |
| Math.ceil    | 向上取整 |
| Math.floor   | 向下取整 |
| Math.max     | 求最大值 |
| Math.min     | 求最小值 |
| Math.random  | `0-1` 之间的随机数 |
| Math.sqrt    | 求平方根 |
| Math.sign    | 求数值的符号，`-100` 为 `-1`，`20` 为 `1` |
| Math.pow     | 求幂 |

## Array

### map <Badge text="不修改原数组"/>

```js
map( (item, index, array) => {}) // ES5
```
- 对数组每一项运行给定的函数，返回每次调用函数的结果组成的数组
- 如果数组元素是对象，那么是浅拷贝过去，修改对象属性会影响到原数组对象的属性
- 不会改变原数组，返回值是一个新数组

### filter <Badge text="不修改原数组"/>
```js
filter((item, index, array) => {}) // ES5
```
- 对数组进行过滤，对数组每一项运行给定的函数，返回该函数返回 `true` 的项组成的数组
- 同样，对于对象元素，是浅拷贝
- 返回是一个新数组，不会影响到原数组

### forEach <Badge text="不修改原数组"/>
```js
forEach( (item, index, array) => {})
```
- 遍历函数，不会修改原数组，该方法没有返回值
- 无法使用 `break` 终止循环，意味着 `forEach` 是无法终止循环的
- `for` 循环可使用 `continue` 跳过本次循环，`forEach` 中可以 `return false` 来跳过本次循环

### some <Badge text="不修改原数组"/>
```js
some((item, index, array) => {})
```
- 用于查询数组中的项是否满足某个条件
- 只要有一项返回 `true`，则调用结束，返回 `true`。全部返回 `false`，则调用结果为 `false`
- 不会改变原数组

### every <Badge text="不修改原数组"/>
```js
every((item, index, array) => {})
```
- 用于查询数组中的项是否满足某个条件
- 只要有一项返回 `false`，则调用结束，返回 `false`。全部返回 `true`，则调用结果为 `true`
- 不会改变原数组

### reduce <Badge text="不修改原数组"/>
```js
reduce((prev, cur, index, array) => {}, init)
```
- 数组的归并方法
- 第二个参数可选，作为归并的起始值，默认是数组第一个元素
- 第一次归并是，`prev` 是数组第一个元素，`cur` 为第二个元素，返回值为下次归并的 `prev`。以此类推
- 返回值是最后一次归并的回调函数返回值
- 不会改变原数组

### reduceRight <Badge text="不修改原数组"/>

- 同 `reduce`，`reduce` 是从左边开始归并，`reduceRight` 是从右边开始归并

### splice <Badge text="修改原数组" type="warn"/>
```js
splice(deleteIndex, deleteNum, addValue1, addValue2, ...)
```
- 该方法算是最强大的数组方法了，在指定位置开始（`deleteIndex`，包括该位置），删除相应个数（`deleteNum`），并在该位置插入相应值（从第三个参数开始，依次插入）
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
- `lastIndexOf()` 从右到左，`indexOf` 从左到右
- 可以使用 `ES6` 中 `includes`、`find`、`findIndex` 代替

### slice <Badge text="不修改原数组"/>
```js
slice(start, end)
```
- 返回新数组，不会改变原数组
- 截取原数组一段返回，从 `start`（包括）位置，到 `end`（不包括）结束位置

### concat <Badge text="不修改原数组"/>
- 合并数组，返回新数组，不会改变原数组
- 没有传参，返回当前调用该方法的数组（浅拷贝）
- 如果参数不是数组，依次加入到数组末尾，如果是数组，将数组拆开（只能拆开一层）依次加入到末尾

### sort <Badge text="修改原数组" type="warn"/>
```js
sort(function)
```
- 数组各项比较时会先调用数组项的 `toString()` 方法，所以比较时字符串的比较

### reverse() <Badge text="修改原数组" type="warn"/>
- 对数组进行倒序，该方法是在原数组上进行的，会修改原数组
- 返回值是原数组

### join(symbol)
- 以给定的符合将数组连接起来，返回值为字符串
- 如何元素中有数组，会把元素数组合并放入该位置

### shift unshift push pop <Badge text="修改原数组" type="warn"/>

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
- 从类数组对象、数组、实现了 `iterator` 接口的对象生成一个数组
- 是对原对象的拷贝，且是浅拷贝，意味着修改新的数组元素会影响到原对象
- 如果数组元素为非对象类型，修改新数组不会影响到原对象
- 可以接受第二个参数，一个函数，相当于 `map` 函数，对每个元素进行相应处理再放入新数组中
- 第三个参数，指定第二个参数函数内 `this`

### Array.of
```js
Array.of(val1, val2, val3, ....)
```
- 生成数组的方法，返回一个新的数组
- 通过将一组数据生成数组
- 解决 `Array()` 由于参数不同产生不同行为的问题
- 当参数为空时，返回一个空数组

### copyWithin <Badge text="修改原数组" type="warn"/>
```js
copyWithin(target, start = 0, end = this.length)
```
- 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组
- 该方法会修改当前数组
- 结束参数不包括 `end` 位置
- 数组长度不变，数组 `start` 到 `end-1` 的元素会从 `target`（包括该位置）开始依次覆盖数组原有成员
- 参数可以是负数，表示倒数

### find
```js
find((value, index ,arr) => {})
```
- 找出第一个符合条件的数组成员，当回调函数中返回 `true`，则符合条件；如果都没有，则返回 `undefined`
- 接受第二个参数，用来绑定回调函数的 `this` 对象

### findIndex
- 使用与 `find` 一致，该方法返回数组成员的位置

### fill <Badge text="修改原数组" type="warn"/>
```js
fill(value, start, end)
```
- 将给定的值，填充数组
- 第二个参数，指定填充的起始位置（包括该位置）
- 第三个参数，指定填充的结束位置（不包括该位置）
- 如果填充的对象是对象，那么赋值的是同一个内存地址的对象，也就是浅拷贝（嗯，浅拷贝，就知道会发生什么事）

### entries() <Badge text="不修改原数组"/>
- 用于遍历数组
- 返回值为数组，里面的元素也是数组，第一元素是下标，第二个是元素值。`[[0, 'a'], [1, 'b'], [3, 'c']]`

### keys() <Badge text="不修改原数组"/>
- 用于遍历数组
- 返回数组的键名组成的数组

### values() <Badge text="不修改原数组"/>
- 用于遍历数组
- 返回数组键值组成的数组

### includes
```js
includes(start = 0)
```
- 返回值一个布尔值，判断数组是否包含给定的值
- `ES2016` 引入该方法，类似于字符串的 `includes` 方法
- 第二个参数指定搜索的起始位置，如果是负数，表示倒数位置
- 相对于 `indexOf`，该方法更加语义化。另外 `NaN.includes(NaN)` 返回 `true`，而 `indexOf` 不能判断。
- 可以使用 `ES5` 中的 `some` 方法实现该功能

### flat() <Badge text="不修改原数组"/>
- 对数组内嵌套的数组“拉平”，就是把数组中的数组的元素挨个拿出来，放数组元素所在位置，返回一个新的数组，不会影响到原来的数组
- 接收第二个参数，只能拉平的层数，默认只有一层。想无限拉平可以传入 `Infinity` 关键字

### flatMap(function) <Badge text="不修改原数组"/>
- 同 `flat` 一样，先执行 `map` 函数再进行拉平
- 只能拉平一层
