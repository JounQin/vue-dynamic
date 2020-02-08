# vue-dynamic

[![GitHub Actions](https://github.com/JounQin/vue-dynamic/workflows/Node%20CI/badge.svg)](https://github.com/JounQin/vue-dynamic/actions?query=workflow%3A%22Node+CI%22)
[![Codacy Grade](https://img.shields.io/codacy/grade/a8dfdfc423974b6e83f81215aee07e7e)](https://www.codacy.com/gh/JounQin/vue-dynamic)
[![npm](https://img.shields.io/npm/v/vue-dynamic.svg)](https://www.npmjs.com/package/vue-dynamic)
[![GitHub Release](https://img.shields.io/github/release/JounQin/vue-dynamic)](https://github.com/JounQin/vue-dynamic/releases)

[![David Peer](https://img.shields.io/david/peer/JounQin/vue-dynamic.svg)](https://david-dm.org/JounQin/vue-dynamic?type=peer)
[![David](https://img.shields.io/david/JounQin/vue-dynamic.svg)](https://david-dm.org/JounQin/vue-dynamic)
[![David Dev](https://img.shields.io/david/dev/JounQin/vue-dynamic.svg)](https://david-dm.org/JounQin/vue-dynamic?type=dev)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![codechecks.io](https://raw.githubusercontent.com/codechecks/docs/master/images/badges/badge-default.svg?sanitize=true)](https://codechecks.io)

Load stringified or normal Vue components dynamically!

## TOC <!-- omit in toc -->

- [Notice](#notice)
- [Usage](#usage)
- [Changelog](#changelog)
- [License](#license)

## Notice

This module is just a simple wrapper of Vue's built-in `component`, and you should only use it to use stringified static components.

## Usage

_1.Global Component_

```js
import Vue from 'vue' // make sure to use 'vue/dist/vue.js' because we will use template
import VueDynamic from 'vue-dynamic'

Vue.use(VueDynamic, { name: 'dynamic' }) // you can custom the global component name and it's default name is 'dynamic'
```

Then it will be same with the next case:

_2.Specific Component_

```vue
<template>
  <Dynamic :comps="comps" :emptyView="emptyView" />
</template>
<script>
import { Dynamic } from 'vue-dynamic' // if we choose to use the first case, you don't need to import this component again
import NoItem from 'components/NoItem'

export default {
  name: 'VueDynamic',
  data() {
    return {
      comps: this.$route.meta.data,
      emptyView: NoItem,
    }
  },
  components: {
    Dynamic,
  },
}
</script>
```

It needs you to pass two props to `Dynamic`, `emptyView` is required because it will be used when we failed to pass your `comps`.

`comps` can be a Object like the normal `components` option in `*.vue` file of an Array of Vue-Component-like Object.

There is a deadly simple example:

```js
;[
  {
    template: `<div>{{ msg }}</div>`,
    data: {
      msg: `It's the first dynamic template!`,
    },
  },
  {
    template: `<div>{{ reverse ? $options.filters.reverse(msg) : msg }}
<button class="btn btn-primary" @click="reverseMsg">Try to reverse me!</button></div>`,
    data: {
      msg: `It's the second dynamic template!`,
      reverse: false,
    },
    methods: {
      reverseMsg: 'this.reverse = !this.reverse',
    },
  },
  {
    template: `<div>More Magic Here!</div>`,
  },
]
```

As you see, the value of `methods` object is a string (or array, them will be applied to `Function` constructor) what means you can store it in your database! So that it is possible to define customer defined page component separately and link them together at once!

It's very useful to build a html5 page like [eqxiu.com](http://www.eqxiu.com/).

**_And nested components can be used! Here is a example:_**

```js
;[
  {
    template: '<div><component1/><component2/></div>',
    components: {
      component1: {
        template: '<div @click="click">{{ msg }}</div>',
        data: {
          msg: 'Inner Message',
        },
        methods: {
          click: 'alert("abc")',
        },
      },
      component2: {
        template: '<div @click="click">{{ msg }}<component3/></div>',
        data: {
          msg: 'Inn1222er Message',
        },
        methods: {
          click: 'alert("ab11c")',
        },
        components: {
          component3: {
            template: `<button @click="reverse">{{ msg }}</button>`,
            data: {
              msg: `I'm the third one!`,
            },
            methods: {
              reverse: `this.msg = this.msg.split('').reverse().join('')`,
            },
          },
        },
      },
    },
  },
]
```

The nested components can also be an array and use a name option in component which is used in you template.

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
