## React

## 生命周期

![生命周期](https://raw.githubusercontent.com/SirM2z/assets/master/react-lifecycle.png)

## VertualDom

实现效果：![VertualDom](https://raw.githubusercontent.com/SirM2z/assets/master/vertual-dom.png)

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
3. 对于同一层级的一组子节点，它们可以通过唯一 `id (key)` 进行区分

简单实现效果：![VertualDom Diff](https://raw.githubusercontent.com/SirM2z/assets/master/vertual-dom-diff.png)

[jsfiddle](https://jsfiddle.net/coolmrz/8jo7sxqw/)

暂未实现：
- 同级元素根据 `key` 进行移动

具体实现：
```js
// vertual dom diff
let Index = 0; // the node index of tree, begin from 0
let patches = {}; // the patches between old & new vertual dom
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';

function isString(node) {
  return Object.prototype.toString.call(node) === "[object String]";
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  // change attr
  for(let key in oldAttrs) {
    if(oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key];
    }
  }
  // new attr
  for(let key in newAttrs) {
    if(!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}

function walk(oldNode, newNode, index) {
  let currentPatch = [];
  if (!newNode) {
    // remove node from old tree  
    currentPatch.push({type: REMOVE, index});
  } else if (isString(oldNode) && isString(newNode)) {
    // text node
    if (oldNode !== newNode) {
      currentPatch.push({type: TEXT, text: newNode});
    }
  } else if (oldNode.type === newNode.type) {
    const attrs = diffAttr(oldNode.props, newNode.props);
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({type: ATTRS, attrs});
    }
    diffChildren(oldNode.children, newNode.children);
  } else {
    currentPatch.push({type: REPLACE, newNode});
  }
  if (currentPatch.length > 0) {
    patches[index] = currentPatch;
  }
}

function diffChildren(oldChildren, newChildren) {
  oldChildren.forEach((child, index) => {
    walk(child, newChildren[index], ++Index);
  })
}

function diff(oldTree, newTree) {
  walk(oldTree, newTree, Index);
}

// path to old dom
let indexPatch = 0;
function doPatch(node, currentPatch) {
  currentPatch.forEach(patch => {
    switch(patch.type) {
      case ATTRS:
        for(let key in patch.attrs) {
          const value = patch.attrs[key];
          if (value) {
            setAttr(node, key, value);
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case TEXT:
        node.textContent = patch.text;
        break;
      case REMOVE:
        node.parentNode.removeChild(node);
        break;
      case REPLACE:
        const newNode = patch.newNode instanceof Element ? render(patch.newNode) : document.createTextNode(patch.newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      default:
        break;
    }
  })
}

function walkPatch(node) {
  const currentPatch = patches[indexPatch++];
  node.childNodes.forEach(child => {
    walkPatch(child);
  });
  if(currentPatch && currentPatch.length > 0) {
    doPatch(node, currentPatch);
  }
}

function patch(node) {
  walkPatch(node);
}

// Usage
const vertualDom1 = createElement('ul', {calss: 'list'}, [
  createElement('li', {class: 'item'}, ['a']),
  createElement('li', {class: 'item'}, ['b']),
  createElement('li', {class: 'item'}, ['c']),
]);

const vertualDom2 = createElement('ul', {calss: 'list-group'}, [
  createElement('li', {class: 'item'}, ['1']),
  createElement('li', {class: 'lightcoral'}, ['b']),
  createElement('div', {class: 'item'}, ['3']),
]);

// use vertual dom
const el = render(vertualDom1);
renderDom(el, document.getElementById('root'));

// use vertual dom diff generate patches
diff(vertualDom1, vertualDom2);
console.log("patches: ", patches);

// use patch
patch(el);
```

## React-Router 权限实现

借鉴官方[Route Config 例子](https://reacttraining.com/react-router/web/example/route-config)

[jsfiddle](https://jsfiddle.net/coolmrz/3Lzpxyjb/)

```jsx
import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

// mock login status
const isLogin = false;

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

////////////////////////////////////////////////////////////
// first our route components
function Login() {
  return <h2>Login</h2>;
}

function User() {
  return <h3>User</h3>;
}

function Product() {
  return <h3>Product</h3>;
}

function Order() {
  return <h3>Order</h3>;
}

function NoMatch({location}) {
  return (<h3>
    No match for <code>{location.pathname}</code>
  </h3>);
}

function Layout({ routes }) {
  return (
    <div>
      <h2>Layout</h2>
      <ul>
        <li>
          <Link to="/app/product">Product</Link>
        </li>
        <li>
          <Link to="/app/order">Order</Link>
        </li>
        <li>
          <Link to="/app/user">User (need login)</Link>
        </li>
      </ul>
      <Switch>
        {routes.map((route, i) => RouteWithSubRoutes(route, i))}
        {/* <Redirect exact from="/app" to="/app/product" />
        <Route path="/app/product" component={Product} />
        <Route path="/app/order" component={Order} />
        <Route path="/app/user" component={User} />
        <Route component={NoMatch} /> */}
      </Switch>
    </div>
  );
}

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/app",
    component: Layout,
    routes: [
      {
        path: "/app",
        redirect: "/app/product"
      },
      {
        path: "/app/product",
        component: Product
      },
      {
        path: "/app/order",
        component: Order
      },
      {
        path: "/app/user",
        auth: true,
        component: User
      },
      {
        component: NoMatch
      }
    ]
  },
  {
    component: NoMatch
  }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes(route, i) {
  const uniqueKey = route.path || i;
  if (route.redirect) {
    return (
      <Redirect key={uniqueKey + '-redirect'} exact from={route.path} to={route.redirect} />
    )
  } else {
    return (
      <Route
        key={uniqueKey}
        exact={!route.routes}
        path={route.path}
        render={props => {
          // pass the sub-routes down to keep nesting
          if (route.auth) {
            if (isLogin) {
              return <route.component key={uniqueKey} {...props} routes={route.routes} />
            } else {
              return <Redirect to={{
                pathname: '/login',
                state: {
                  from: route.path
                }
              }} />
            }
          } else {
            return <route.component key={uniqueKey} {...props} routes={route.routes} />
          }
        }}
      />
    );
  }
}

function App() {
  return (
    <Router>
      <div>
        <h3>Current login status: {isLogin.toString()}</h3>
        <ul>
          <li>
            <Link to="/app">Layout (Redirect to Product)</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => RouteWithSubRoutes(route, i))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```
