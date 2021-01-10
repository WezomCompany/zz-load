# `zz-load`

![types](https://img.shields.io/badge/types-TypeScript-blue)
[![BSD-3-Clause License badge](https://img.shields.io/github/license/WezomCompany/zz-load)](https://github.com/WezomCompany/zz-load/blob/master/LICENSE)
[![NPM package badge](https://img.shields.io/badge/npm-install-orange.svg)](https://www.npmjs.com/package/@wezom/zz-load)
![Test and Build status badge](https://github.com/WezomCompany/zz-load/workflows/Test%20and%20Build/badge.svg)

> Lazy loader based on IntersectionObserver API

Live preview: https://wezomcompany.github.io/zz-load/

## Coverage

| Statements                | Branches                | Functions                | Lines                |
| ------------------------- | ----------------------- | ------------------------ | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-32.93%25-red.svg) | ![Branches](https://img.shields.io/badge/Coverage-21.65%25-red.svg) | ![Functions](https://img.shields.io/badge/Coverage-27.45%25-red.svg) | ![Lines](https://img.shields.io/badge/Coverage-33.33%25-red.svg) |

---

## Code-base features

🌟 Fully treeshackable  
🌟 Types included  
🌟 [ESNext distribute](#esnext)  
🌟 [CommonJS version available](#commonjs-version)  


---

## Table of Content:

1. [Usage](#usage)
    1. [Install npm package](#install-npm-package)
    1. [Import to your codebase](#import-to-your-codebase)
        - [ESNext](#esnext)
        - [CommonJS Version](#commonjs-version)
1. [API](#api)
1. [Contributing](#contributing)
1. [License](#licence)

---




## Usage

### Install npm package

```bash
npm i @wezom/zz-load
```

### Import to your codebase

#### ESNext

We use TypeScript as main development language and distribute our lib in the maximum compliance with modern JavaScript specifications. 
You project bundler (webpack or something else) must not exclude this installed package from `node_modules` folder.

_The package [`babel-loader-exclude-node-modules-except`](https://www.npmjs.com/package/babel-loader-exclude-node-modules-except) can help you with this_

#### CommonJS Version

If you cannot change your bundler config or if you don not want to include _esnext_ code version into your project - for this we have compiled CommonJS version of each library file and you can import `*.cjs.js` files. They ready to use without excluding `node_modules` and else. These files may have redundant code that is necessary for them to work "out of the box". And they will also be deprived of all the features of the _ESNext_ specifications.


```js
// no ES6 features but ready for use as is, without transpiling
import zzLoad from '@wezom/zz-load/dist/index.cjs';
```

### Usage example

```js
import zzLoad from '@wezom/zz-load';
// create and run observer for elements
const observer = zzLoad('.js-lazy-load');
observer.observe();
```

See in action https://wezomcompany.github.io/zz-load/

[▲ Go Top](#) | [▲ Table of Content](#table-of-content)

---





## API

[▲ Go Top](#) | [▲ Table of Content](#table-of-content)

---



## Contributing

Please fill free to create [issues](https://github.com/WezomCompany/zz-load/issues) or send [PR](https://github.com/WezomCompany/zz-load/pulls)

## Licence

[BSD-3-Clause License](https://github.com/WezomCompany/zz-load/blob/master/LICENSE)

---
