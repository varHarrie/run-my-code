# run-my-code

Execute javascript code from a string based on new function, inspired by [zx](https://github.com/google/zx).

## Install

```bash
$ npm install --save run-my-code
```

## Usage

**Tagged Template:**

```javascript
const $ = require('run-my-code');

const obj = { foo: 'foo' };
const arr = [1, 2];

console.log($`return 1 + 1`); // 2
console.log($`return ${obj}`); // { foo: 'foo' }
console.log($`return ${arr}.map((n) => n * 2)`); // [2, 4]
```

**Normal Function:**

```javascript
const $ = require('run-my-code');

console.log($('return 1 + 1')); // 2
```

**With Context:**

```javascript
console.log($({ a: 1, b: 2 })(`return a + b`)); // 3
console.log($({ a: 1, b: 2 })`return a + b`); // 3
```

## License

[MIT](./LICENSE)
