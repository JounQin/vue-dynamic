const EMPTY_FUNC = () => {}

// eslint-disable-next-line no-return-assign
['error', 'log', 'warn'].forEach(log => module.exports[log] = process.env.NODE_ENV === 'development'
  ? console[log] : EMPTY_FUNC)
