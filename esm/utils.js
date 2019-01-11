export var isArray = Array.isArray || (function (arg) { return arg instanceof Array; })

export var isFunction = function (arg) { return typeof arg === 'function'; }

export var isObject = function (arg) { return Object.prototype.toString.call(arg) === '[object Object]'; }

export var warn = function (msg) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    typeof console === 'function' && console.error(msg)
  }
}
