var baseConfig = require('./webpack.base')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path')
var { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')

const PORT = 7000

const createPages = (pages) => {
  return pages.map(({ filename, template, chunk }) => {
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: 'body',
      chunks: chunk,
      minify: false,
    })
  })
}

for (const key in baseConfig.entry) {
  if (Array.isArray(baseConfig.entry[key])) {
    baseConfig.entry[key].push(
      require.resolve('webpack/hot/dev-server'),
      `${require.resolve('webpack-dev-server/client')}?http://localhost:${PORT}`,
    )
  }
}

module.exports = merge(baseConfig, {
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    ...createPages([
      {
        filename: 'index.html',
        template: path.resolve(__dirname, './src/template.ejs'),
        chunk: ['index'],
      },
    ]),
    ...[new ReactRefreshWebpackPlugin()].filter(Boolean),
  ],
  devServer: {
    host: '0.0.0.0',
    open: false,
    port: PORT,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    compress: false,
    hot: true,
    static: path.resolve(__dirname, './public'),
    // watchContentBase: false,
    // liveReload: true,
  },
})
