import Vue from 'vue'

const { toString } = Object.prototype

export const isFunction = (arg: unknown) => typeof arg === 'function'

export const isObject = (arg: unknown) =>
  toString.call(arg) === '[object Object]'

export const { warn } = Vue.util
