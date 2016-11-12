import webpack from 'webpack'
import pkg from '../package.json'

const isProduction = process.env.NODE_ENV === 'production'

const plugins = [new webpack.BannerPlugin({
  banner: `${pkg.name} -- ${pkg.description}
Version ${pkg.version}\n
Copyright (C) 2016 ${pkg.author}
Released under the ${pkg.license} license\n
Github: ${pkg.repository.url}`,
  entryOnly: true
})]

isProduction && plugins.push(new webpack.optimize.UglifyJsPlugin())

export default {
  target: 'web',
  entry: {
    dynamic: './lib/dynamic.js',
    'vue-dynamic': './lib/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  },
  output: {
    path: 'dist',
    filename: `[name]${isProduction ? '.min' : ''}.js`,
    libraryTarget: 'umd',
    library: 'VueDynamic'
  },
  plugins
}
