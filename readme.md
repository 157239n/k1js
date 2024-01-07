
## Intro

This is a supplementary library written in JS for the main one [k1lib](https://k1lib.com), providing a stripped down version of the cli workflow (by monkey patching Arrays, Sets and Strings). This also provides some random utility functions here and there that I use often. Finally, a lot of k1lib's JS transpiler functions actually transpiles to JS that needs this library to run.

Some examples:

```python
data = [[1, 2], [3, 4], [5, 6]]
data | (toJsFunc() | transpose() | cut(1) | toMax())
```

That should transpiles to:

```js
const data = [[1, 2], [3, 4], [5, 6]];
a = data.transpose().cut(1).toMax();
```

## Installing

At the moment, k1js is not available on npm. Rather, it's distributed in 2 formats: UMD and AMD. See [this folder](https://k1js.com/dist/) to see all published versions.

## Links

Main docs is available at [k1js.com](https://k1js.com)

Repo is available at [github.com/157239n/k1js](https://github.com/157239n/k1js)



