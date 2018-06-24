export const isArray = Array.isArray || (arg => arg instanceof Array)

export const isFunction = arg => typeof arg === 'function'

export const isObject = arg =>
  Object.prototype.toString.call(arg) === '[object Object]'

export const warn = msg => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    typeof console === 'function' && console.error(msg)
  }
}
