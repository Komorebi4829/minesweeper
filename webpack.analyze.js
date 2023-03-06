var prodConfig = require('./webpack.prod')
var path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 引入webpack打包速度分析插件
var { merge } = require('webpack-merge')

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(merge(prodConfig, {}))
