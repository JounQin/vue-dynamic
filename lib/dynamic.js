import {isArray, isFunction, isObject, warn} from '../utils'

const objCompsToArr = objComponents => {
  const components = []
  for (const [key, value] of Object.entries(objComponents)) {
    isObject(value) && components.push(Object.assign(value, {name: key}))
  }
  return components
}

const invalidMsg = msg => warn(`invalid ${msg} will be ignored!`)
const nonMsg = msg => warn(`no ${msg} found thus it will be ignored!`)

const buildComponent = (comps, notFirst) => {
  if (!comps) return

  if (isObject(comps)) {
    comps = objCompsToArr(comps)
  } else if (!isArray(comps)) return invalidMsg('components')
  if (!comps.length) return nonMsg('components')

  let wrapTemp = ''
  const wrapComp = {}
  let count = 0

  comps.forEach((comp, index) => {
    const {name = `_${index}`, template, data, methods, components} = comp

    if (!template) return nonMsg('template')

    wrapTemp += `<${name}/>`
    const component = (wrapComp[name] = {template})

    if (isObject(methods)) {
      const wrapMethods = {}
      for (const [methodName, method] of Object.entries(methods)) {
        wrapMethods[methodName] = isFunction(method)
          ? method
          : Function[isArray(method) ? 'apply' : 'call'](null, method)
      }
      component.methods = wrapMethods
    } else if (methods) return invalidMsg('methods')
    if (data) component.data = isFunction(data) ? data : () => data
    if (components) component.components = buildComponent(components, true)

    count++
  })

  if (!count) return

  return notFirst
    ? wrapComp
    : {
        name: 'Dynamic--Root',
        template: count === 1 ? wrapTemp : `<div>${wrapTemp}</div>`,
        components: wrapComp
      }
}

export default {
  name: 'vue-dynamic',
  template: `<comment :is="view"/>`,
  props: {
    comps: {
      validator: value => !value || isArray(value) || isObject(value)
    },
    emptyView: {
      required: true,
      validator: value => isObject(value)
    }
  },
  data() {
    return {
      view: this.emptyView
    }
  },
  created() {
    this.reBuild()
  },
  watch: {
    comps() {
      this.reBuild()
    }
  },
  methods: {
    reBuild() {
      const component = buildComponent(this.comps)
      this.view = component || this.emptyView
    }
  }
}
