/**
 * 获取输入值的真实类型
 *
 * @param value       需要判断的值
 * @returns {string}  类型字符串
 */
const trueType = value => [].slice.call({}.toString.call(value), 8, -1).join('')

const trueTypeFunc = type => value => type === trueType(value);

/**
 * 一些类型判断方法, 例: utils.isArray(1)
 */
['Array', 'Function', 'Object'].forEach(type => (module.exports[`is${type}`] = trueTypeFunc(type)))
