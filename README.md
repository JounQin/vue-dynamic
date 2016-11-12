# vue-dynamic
Load stringified or normal Vue components dynamically!

## Usage

_1.Global Component_

``` js
import Vue from 'vue'   // make sure to use 'vue/dist/vue.js' because we will use template
import VueDynamic from 'vue-dynamic'

Vue.use(VueDynamic, {name: 'dynamic'})  // you can custom the global component name and it's default name is 'dynamic'
```

Then it will be same with the next case:

_2.Specific Component_

``` vue
<template>
  <Dynamic :comps="comps" :emptyView="emptyView"/>
</template>
<script>
  import Dynamic from 'vue-dynamic/dynamic' // if we choose to use the first case, you don't need to import this component again
  import NoItem from 'components/NoItem'

  export default {
    name: 'VueDynamic',
    data() {
      return {
        comps: this.$route.meta.data,
        emptyView: NoItem
      }
    },
    components: {
      Dynamic
    }
  }
</script>

```

It needs you to pass two props to `Dynamic`, `emptyView` is required because it will be used when we failed to pass your `comps`.

`comps` can be a Object like the normal `components` option in `*.vue` file of an Array of Vue-Component-like Object.

There is a deadly simple example:

``` js
[{
  template: `<div>{{ msg }}</div>`,
  data: {
    msg: `It's the first dynamic template!`
  }
}, {
  template: `<div>{{ reverse ? $options.filters.reverse(msg) : msg }}
<button class="btn btn-primary" @click="reverseMsg">Try to reverse me!</button></div>`,
  data: {
    msg: `It's the second dynamic template!`,
    reverse: false
  },
  methods: {
    reverseMsg: 'this.reverse = !this.reverse'
  }
}, {
  template: `<div>More Magic Here!</div>`
}]
```

As you see, the value of `methods` object is a string what means you can store it in your database! So that it is possible to define customer defined page component separately and link them together at once!

It's very useful to build a html5 page like [eqxiu.com](eqxiu.com).

__*And nested components can be used! Here is a example:*__

``` js
[{
  template: '<div><component1/><component2/></div>',
  components: {
    component1: {
      template: '<div @click="click">{{ msg }}</div>',
      data: {
        msg: 'Inner Messgae'
      },
      methods: {
        click: 'alert("abc")'
      }
    },
    component2: {
      template: '<div @click="click">{{ msg }}<component3/></div>',
      data: {
        msg: 'Inn1222er Messgae'
      },
      methods: {
        click: 'alert("ab11c")'
      },
      components: {
        component3: {
          template: `<button @click="reverse">{{ msg }}</button>`,
          data: {
            msg: `I'm the third one!`
          },
          methods: {
            reverse: `this.msg = this.msg.split('').reverse().join('')`
          }
        }
      }
    }
  }
}]
```

Of course, if you are passing a normal Vue components, it will also work.

*Hope it will be useful to you, and if it occurs any problem, please notice me through [issue](https://github.com/JounQin/vue-dynamic/issues).*
