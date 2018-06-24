import Dynamic from './dynamic'

let installed = false

const VueDynamic = {
  install(Vue, options = {}) {
    if (installed) return
    installed = true
    Vue.component(options.name || 'Dynamic', Dynamic)
  },
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueDynamic)
}

export default VueDynamic
