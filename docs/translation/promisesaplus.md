# Promises/A+

[官网](https://promisesaplus.com/)

## 1. 术语

1.1 `promise` 是一个有 `then` 方法的对象或者是函数，行为遵循本规范

1.2 `thenable` 是一个有 `then` 方法的对象或者是函数

1.3 `value` 是 `promise` 状态成功时的值，包括 `undefined/thenable` 或者是 `promise`

1.4 `exception` 是一个使用 `throw` 抛出的异常值

1.5 `reason` 是 `promise` 状态失败时的值

## 2. 要求
    
### 2.1. Promise States
    
Promise 必须处于以下三个状态之一：pending, fulfilled 或者是 rejected

#### 2.1.1 如果 promise 在 pending 状态

    2.1.1.1 可以变成 fulfilled 或者是 rejected

#### 2.1.2 如果 promise 在 fulfilled 状态

    2.1.2.1 不会变成其它状态
    2.1.2.2 必须有一个 value 值

#### 2.1.3 如果 promise 在 rejected 状态

    2.1.3.1 不会变成其它状态
    2.1.3.2 必须有一个 promise 被 reject 的 reason

概括：`promise` 的状态只能从 `pending` 变成 `fulfilled`，或者从 `pending` 变成`rejected`。`promise` 成功，有成功的 `value`，`promise` 失败的话，有失败的原因 `reason`

### 2.2 then方法

promise 必须提供一个 then 方法，来访问最终的结果，promise 的 then 方法接收两个参数

```js
promise.then(onFulfilled, onRejected)
```

#### 2.2.1 onFulfilled 和 onRejected 都是可选参数

    2.2.1.1 onFulfilled 必须是函数类型
    2.2.1.2 onRejected 必须是函数类型

#### 2.2.2 如果 onFulfilled 是函数

    2.2.2.1 必须在 promise 变成 fulfilled 时，调用 onFulfilled，参数是promise的value
    2.2.2.2 在 promise 的状态不是 fulfilled 之前，不能调用
    2.2.2.3 onFulfilled 只能被调用一次

#### 2.2.3 如果 onRejected 是函数:

    2.2.3.1 必须在 promise 变成 rejected 时，调用 onRejected，参数是 promise 的 reason
    2.2.3.2 在 promise 的状态不是 rejected 之前，不能调用
    2.2.3.3 onRejected 只能被调用一次

#### 2.2.4 onFulfilled 和 onRejected 应该是微任务

#### 2.2.5 onFulfilled 和 onRejected 必须作为函数被调用

#### 2.2.6 then方法可能被多次调用

    2.2.6.1 如果 promise 变成了 fulfilled 态，所有的 onFulfilled 回调都需要按照 then 的顺序执行
    2.2.6.2 如果 promise 变成了 rejected 态，所有的 onRejected 回调都需要按照 then 的顺序执行

#### 2.2.7 then必须返回一个promise

```js
promise2 = promise1.then(onFulfilled, onRejected);
```

    2.2.7.1 onFulfilled 或 onRejected 执行的结果为 x，调用 resolvePromise
    2.2.7.2 如果 onFulfilled 或者 onRejected 执行时抛出异常 e，promise2 需要被 reject
    2.2.7.3 如果 onFulfilled 不是一个函数，promise2 以 promise1 的值 fulfilled
    2.2.7.4 如果 onRejected 不是一个函数，promise2 以 promise1 的 reason rejected

### 2.3 resolvePromise

```js
resolvePromise(promise2, x, resolve, reject)
```

#### 2.3.1 如果 promise2 和 x 相等，那么 reject promise with a TypeError

#### 2.3.2 如果 x 是一个 promsie

    2.3.2.1 如果 x 是 pending 态，那么 promise 必须要在 pending，直到 x 变成 fulfilled or rejected.
    2.3.2.2 如果 x 被 fulfilled, fulfill promise with the same value.
    2.3.2.3 如果 x 被 rejected, reject promise with the same reason.

#### 2.3.3 如果 x 是一个 object 或者 是一个 function

    2.3.3.1 let then = x.then
    2.3.3.2 如果 x.then 这步出错，那么 reject promise with e as the reason
    2.3.3.3 如果 then 是一个函数，then.call(x, resolvePromiseFn, rejectPromise)
        2.3.3.3.1 resolvePromiseFn 的入参是 y, 执行 resolvePromise(promise2, y, resolve, reject);
        2.3.3.3.2 rejectPromise 的入参是 r, reject promise with r.
        2.3.3.3.3 如果 resolvePromise 和 rejectPromise 都调用了，那么第一个调用优先，后面的调用忽略。
        2.3.3.3.4 如果调用then抛出异常 e 
            2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略
            2.3.3.3.4.3 否则，reject promise with e as the reason
    2.3.3.4 如果 then 不是一个function. fulfill promise with x.

#### 2.3.4 如果 x 不是一个 object 或者 function，fulfill promise with x
