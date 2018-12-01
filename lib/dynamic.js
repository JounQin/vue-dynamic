import { isArray, isFunction, isObject, warn } from './utils'

const objCompsToArr = objComponents => {
  const components = []
  for (const [key, value] of Object.entries(objComponents)) {
    isObject(value) && components.push(Object.assign(value, { name: key }))
  }
  return components
}

const invalidMsg = msg => warn(`invalid ${msg} will be ignored!`)
const nonMsg = msg => warn(`no ${msg} found thus it will be ignored!`)

const generateField = (comp, component, type) => {
  const field = comp[type]
  if (isObject(field)) {
    const wrappedField = {}
    for (const [fieldName, method] of Object.entries(field)) {
      wrappedField[fieldName] = isFunction(method)
        ? method
        : Function[isArray(method) ? 'apply' : 'call'](null, method)
    }
    component[type] = wrappedField
  } else if (field) return invalidMsg(type)
  return true
}

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
    const { name = `Dynamic__${index}`, template, data, components } = comp

    if (!template) return nonMsg('template')

    wrapTemp += `<${name}${notFirst ? '' : ' v-on="$parent.$listeners"'} />`
    const component = (wrapComp[name] = { template })

    if (
      !generateField(comp, component, 'filters') ||
      !generateField(comp, component, 'methods')
    ) {
      return
    }

    if (data) {
      component.data = isFunction(data) ? data : () => ({ ...data })
    }

    if (components) {
      component.components = buildComponent(components, true)
    }

    count++
  })

  if (!count) return

  return notFirst
    ? wrapComp
    : {
        name: 'Dynamic__Root',
        template: count === 1 ? wrapTemp : `<div>${wrapTemp}</div>`,
        components: wrapComp,
      }
}

export default {
  name: 'vue-dynamic',
  template: `<component :is="view" />`,
  props: {
    comps: {
      validator: value => !value || isArray(value) || isObject(value),
    },
    emptyView: {
      required: true,
      validator: value => isObject(value),
    },
  },
  data() {
    return {
      view: this.emptyView,
    }
  },
  created() {
    this.reBuild()
  },
  watch: {
    comps() {
      this.reBuild()
    },
  },
  methods: {
    reBuild() {
      const component = buildComponent(this.comps)
      this.view = component || this.emptyView
    },
  },
}
