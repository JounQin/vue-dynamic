import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'

import { version } from './package.json'

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'

const plugins = [
  buble({
    objectAssign: 'Object.assign',
    transforms: {
      dangerousForOf: true,
    },
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
]

if (isProd) {
  plugins.push(
    uglify({
      output: {
        comments: /^!/,
      },
    }),
  )
}

export default {
  input: 'lib/index.js',
  output: {
    banner: `/*!
  * vue-dynamic -- Load stringified or normal Vue components dynamically!
  * Version ${version}
  *
  * Copyright (C) 2016-present JounQin <admin@1stg.me>
  * Released under the MIT license
  *
  * Github: https://github.com/JounQin/vue-dynamic
  */`,
    exports: 'named',
    file: `dist/vue-dynamic${isProd ? '.min' : ''}.js`,
    format: 'umd',
    name: 'VueDynamic',
  },
  plugins,
}
