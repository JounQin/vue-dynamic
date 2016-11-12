/**
 * 获取输入值的真实类型
 *
 * @param value       需要判断的值
 * @returns {string}  类型字符串
 */
export const trueType = value => [].slice.call({}.toString.call(value), 8, -1).join('')

export const trueTypeFunc = type => value => type === trueType(value);

/**
 * 一些类型判断方法, 例: utils.isArray(1)
 */
['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'Function', 'Map',
  'Null', 'Object', 'RegExp', 'Set', 'String', 'Symbol', 'Undefined']
  .forEach(type => (module.exports[`is${type}`] = trueTypeFunc(type)))
