import Vue from 'vue'

declare module 'vue/types/vue' {
  interface VueConstructor {
    util: {
      warn: (...args: unknown[]) => void
    }
  }
}
