const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.basePlugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: './index.html'
  })
]