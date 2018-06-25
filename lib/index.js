import Dynamic from './dynamic'

const VueDynamic = (Vue, options = {}) =>
  Vue.component(options.name || 'Dynamic', Dynamic)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueDynamic)
}

export default VueDynamic

export const install = VueDynamic

export { Dynamic }
