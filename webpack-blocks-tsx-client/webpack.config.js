const {
  addPlugins, createConfig, defineConstants, entryPoint, env, performance, setOutput, sourceMaps, webpack
} = require('@webpack-blocks/webpack2')

const babel = require('@webpack-blocks/babel6')
const devServer = require('@webpack-blocks/dev-server2')
const extractText = require('@webpack-blocks/extract-text2')
const typescript = require('@webpack-blocks/typescript')
const plugins = require('./webpack.plugins')

module.exports = createConfig([
  setOutput('./build/bundle.js'),
  babel(),
  typescript(),
  addPlugins(plugins.basePlugins),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV || 'development'
  }),
  env('development', [
    entryPoint('./src/index.js'),
    sourceMaps(),
    devServer(),
    devServer.proxy({
      '/api/*': { target: 'http://localhost:4000' }
    }),
    performance({
      // Increase performance budget thresholds for development mode
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000
    })
  ])
])
