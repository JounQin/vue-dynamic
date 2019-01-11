import Dynamic from './dynamic'

var VueDynamic = function (Vue, options) {
    if ( options === void 0 ) options = {};

    return Vue.component(options.name || 'Dynamic', Dynamic);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueDynamic)
}

export default VueDynamic

export var install = VueDynamic

export { Dynamic }
