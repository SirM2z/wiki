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
