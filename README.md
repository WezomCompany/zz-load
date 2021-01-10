# `zz-load`

![types](https://img.shields.io/badge/types-TypeScript-blue)
[![BSD-3-Clause License badge](https://img.shields.io/github/license/WezomCompany/zz-load)](https://github.com/WezomCompany/zz-load/blob/master/LICENSE)
[![NPM package badge](https://img.shields.io/badge/npm-install-orange.svg)](https://www.npmjs.com/package/@wezom/zz-load)
![Test and Build status badge](https://github.com/WezomCompany/zz-load/workflows/Test%20and%20Build/badge.svg)

> Lazy loader based on IntersectionObserver API

Live preview: https://wezomcompany.github.io/zz-load/

## Coverage

| Statements                                                            | Branches                                                            | Functions                                                            | Lines                                                            |
| --------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-32.93%25-red.svg) | ![Branches](https://img.shields.io/badge/Coverage-21.65%25-red.svg) | ![Functions](https://img.shields.io/badge/Coverage-26.92%25-red.svg) | ![Lines](https://img.shields.io/badge/Coverage-33.04%25-red.svg) |

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
1. [Progressive Enhancement](#progressive-enhancement)
    - [Why i need to use `zz-load` when we have native `loading` attribute?](#why-i-need-to-use-zz-load-when-we-have-native-loading-attribute)
1. [API](#api)
    - [`zzLoad()`](#zzload)
        - [`observer.observe()`](#observerobserve)
        - [`observer.triggerLoad()`](#observertriggerload)
    - [Attrs NS](#attrs-ns)
    - [Dataset NS](#dataset-ns)
    - [Events NS](#events-ns)
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

```html
<img
    alt
    width="640"
    height="320"
    class="js-lazy-load"
    data-zzload-source-img="https://placeimg.com/640/320/nature"
    src='data:image/svg+xml,&lt;svg xmlns="http://www.w3.org/2000/svg" width="640" height="320"&gt;&lt;/svg&gt;'
/>
```

```js
import zzLoad from '@wezom/zz-load';
// create and run observer for elements
const observer = zzLoad('.js-lazy-load');
observer.observe();
```

See in action https://wezomcompany.github.io/zz-load/

[▲ Go Top](#) | [▲ Table of Content](#table-of-content)

---

## Progressive Enhancement

If you do not know what "Progressive Enhancement" is, watch this [video from Heydon Pickering](https://briefs.video/videos/is-progressive-enhancement-dead-yet/), we assure you you will not regret.

> We have browsers that support Intersection Observer API, and browsers that do not support Intersection Observer API.  
> We can detect the feature and apply polyfill for API if needed.

An example:

```js
// zz-load-init.js
import zzLoad from '@wezom/zz-load';
const observer = zzLoad('.js-lazy-load');
observer.observe();
```

```js
// lazy-loading-progressive-enhancement.js
(function () {
    if ('IntersectionObserver' in window) {
        import('./zz-load-init');
    } else {
        import('intersection-observer').then(() => {
            import('./zz-load-init');
        });
    }
})();
```

### Why I need to use `zz-load` when we have native `loading` attribute?

Not all browser support native loading!

If you want to make real "progressive enhancement" with browser native lazy loading as primary implementation - please consider next two circumstances:

1. Not all cases can be covered with native loading
1. You should be able to influence the template of your markup on the server.

Since the browser environment (for reliable verification) will not be available to you on the server - you can determine support of native loading baserd on the browser version by comparing with [the table caniuse.com](https://caniuse.com/loading-lazy-attr). Based on the result of the check, you can render the markup for native loading or markup for JavaScript implementation. After that, we need to extend our previous script

```js
// lazy-loading-progressive-enhancement.js
(function () {
    const lazyLoadingElements = document.querySelectorAll('.js-lazy-load');
    // if render was for native loading implementation it should be empty
    // otherwise - initialize JS implemetation
    if (lazyLoadingElements.length > 0) {
        if ('IntersectionObserver' in window) {
            import('./zz-load-init');
        } else {
            import('intersection-observer').then(() => {
                import('./zz-load-init');
            });
        }
    }
})();
```

[▲ Go Top](#) | [▲ Table of Content](#table-of-content)

---

## API

### zzLoad()

<details>
<summary><em>Signature</em></summary>
<div>

```ts
zzLoad(elements: RootElement, options: Options = {}): Observer

type RootElement = string | Element | Element[] | NodeList | JQuery;

interface Options {
    rootMargin?: string;
    threshold?: number;
    clearSourceAttrs?: boolean;
    setSourcesOnlyOnLoad?: boolean;
    onProcess?(element: Element, resource?: string): void;
    onLoad?(element: Element, resource?: string): void;
    onError?(element: Element, resource?: string): void;
}

interface Observer {See `https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options`
    observe(): void;
    triggerLoad(triggerElements: RootElement, triggerOptions?: Options): void;
}
```

</div>
</details>

_Parameters:_

Name | Data type | Argument | Default value | Description
 --- | --- | --- | --- | ---
`elements` | `string`, `Element`, `Element[]`, `NodeList`, `JQuery` | required |  | String selector or already programmatically received Elements. You can give it even jQuery collection, if use it.
`options` | `Object` | optional | `undefined` | Observing options
`options.rootMargin` | `string` |  | `'0px'` | Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros. See [Intersection observer options -> `rootMargin`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)
`options.threshold` | `number` |  | `0` | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible. See [Intersection observer options -> `rootMargin`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)
`options.setSourcesOnlyOnLoad` | `boolean` |  | `true` | Setting resource attributes to the element only after successful loading
`options.clearSourceAttrs` | `boolean` |  | `false` | Removing all zz-load source attributes from element after successful loading
`options.onProcess` | `Function` |  | `undefined` | Method called before starting to load resources for element.
`options.onLoad` | `Function` |  | `undefined` | Callback after successful after successful loading resources for element.
`options.onFail` | `Function` |  | `undefined` | Callback on error loading resources for element.

_Return type:_ `Observer`

<details>
<summary><em>Example</em></summary>
<div>

```js
import zzLoad from '@wezom/zz-load';
const observer = zzLoad('.my-js-selector', {
    rootMargin: '0px 10%'
});
```

</div>
</details>

#### Observer.observe()

<details>
<summary><em>Signature</em></summary>
<div>

```ts
observe(): void;
```

</div>
</details>

<details>
<summary><em>Example</em></summary>
<div>

```js
import zzLoad from '@wezom/zz-load';
const observer = zzLoad('.my-js-selector', {
    rootMargin: '0px 10%'
});

// run observer
observer.observe();
```

</div>
</details>

#### Observer.triggerLoad()

<details>
<summary><em>Signature</em></summary>
<div>

```ts
triggerLoad(triggerElements: RootElement, triggerOptions?: Options): void;
```

</div>
</details>

<details>
<summary><em>Example</em></summary>
<div>

```js
import zzLoad from '@wezom/zz-load';
const observer = zzLoad('.my-js-selector', {
    rootMargin: '0px 10%'
});

// run observer
observer.observe();

// ..code conditions
observer.triggerLoad('#load-me-immediately-now');
```

</div>
</details>

### Attrs NS

Library attributes namespace  
See [source](https://github.com/WezomCompany/zz-load/blob/main/src/config/attrs.ts)

<details>
<summary><em>Example</em></summary>
<div>

```js
import zzLoad, { attrs } from '@wezom/zz-load';
const observer = zzLoad(`[${attrs.sourceImg}]`); // zzLoad('[data-zzload-source-img]')
```

</div>
</details>

### Dataset NS

Library dataset namespace  
See [source](https://github.com/WezomCompany/zz-load/blob/main/src/config/data-set.ts)

<details>
<summary><em>Example</em></summary>
<div>

```js
import zzLoad, { dataset } from '@wezom/zz-load';

const picture = document.querySelector('.my-picture-element');
if (picture !== null) {
    const sources = [
        {
            media: '(min-width: 1280px)',
            srcset: 'https://via.placeholder.com/1280x720/0000FF/000000'
        },
        {
            media: '(min-width: 750px)',
            srcset: 'https://via.placeholder.com/800x450/7878ff/000000'
        }
    ]
    picture.dataset[dataset.sourceSources] = JSON.stringify(sources);

    const observer = zzLoad(picture);
    observer.observe();
}
```

</div>
</details>

### Events NS

Library events namespace.  
See [source](https://github.com/WezomCompany/zz-load/blob/main/src/config/events.ts)

<details>
<summary><em>Example</em></summary>
<div>

```js
import zzLoad, { events } from '@wezom/zz-load';

const picture = document.querySelector('.my-picture-element');
if (picture !== null) {
    picture.addEventListener(events.observed, () => {
        console.log('Start observing');
    });
    picture.addEventListener(events.processed, () => {
        console.log('Start loading');
    });
    picture.addEventListener(events.loaded, () => {
        console.log('Successfully loaded');
    });
    picture.addEventListener(events.failed, () => {
        console.log('Loading failed');
    });
    picture.addEventListener(events.inView, (event) => {
        console.log('Element is visible', event.detail.visible);
    });
}
```

</div>
</details>

[▲ Go Top](#) | [▲ Table of Content](#table-of-content)

---

## Contributing

Please fill free to create [issues](https://github.com/WezomCompany/zz-load/issues) or send [PR](https://github.com/WezomCompany/zz-load/pulls)

## Licence

[BSD-3-Clause License](https://github.com/WezomCompany/zz-load/blob/master/LICENSE)

---
