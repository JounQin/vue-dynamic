import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'

import { version } from './package.json'

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'

const entries = {
  dynamic: {
    input: 'lib/dynamic.js',
    output: {
      file: `dist/dynamic${isProd ? '.min' : ''}.js`,
      name: 'Dynamic',
    },
  },
  'vue-dynamic': {
    input: 'lib/index.js',
    output: {
      file: `dist/vue-dynamic${isProd ? '.min' : ''}.js`,
      name: 'VueDynamic',
    },
  },
}

const entry = entries[process.env.ENTRY || 'vue-dynamic']

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
  input: entry.input,
  output: {
    ...entry.output,
    banner: `/*!
  * vue-dynamic -- Load stringified or normal Vue components dynamically!
  * Version ${version}
  *
  * Copyright (C) 2016-present JounQin <admin@1stg.me>
  * Released under the MIT license
  *
  * Github: https://github.com/JounQin/vue-dynamic
  */`,
    format: 'umd',
  },
  plugins,
}
