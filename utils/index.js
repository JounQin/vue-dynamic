const modulesContext = require.context('.', false, /\.js$/)

export default modulesContext.keys().reduce((modules, key) => Object.assign(modules, modulesContext(key)), {})
