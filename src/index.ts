import { VueConstructor } from 'vue'

import { Dynamic } from './dynamic'

export interface VueDynamicOptions {
  name?: string
}

export const VueDynamic = (
  Vue: VueConstructor<Dynamic>,
  options: VueDynamicOptions,
) => Vue.component(options?.name || 'Dynamic', Dynamic)

if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  window.Vue.use(VueDynamic)
}

export default VueDynamic

export const install = VueDynamic

export { Dynamic }
