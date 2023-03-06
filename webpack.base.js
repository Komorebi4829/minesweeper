var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var WebpackBar = require('webpackbar')
var tailwindcss = require('tailwindcss')
const ReactRefreshTypeScript = require('react-refresh-typescript')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: {
    entrypoints: false,
    children: false,
  },
  entry: {
    index: path.resolve(__dirname, './src/index'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash:10].bundle.js',
    globalObject: 'window',
    assetModuleFilename: 'static/[name].[contenthash:8][ext]',
    clean: true,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
              }),
              transpileOnly: isDev,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              // modifyVars: getThemeVariables({
              //   dark: true,
              // }),
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /\.html?$/,
        type: 'asset/resource', // 相当于 file-loader 的效果
        generator: {
          filename: '[name].[ext]',
        },
      },
      {
        test: /.(png|jpe?g|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource', // 相当于 file-loader 的效果
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'static/media/[name][ext]',
        },
      },
    ],
  },
  plugins: [new WebpackBar()],
  cache: {
    type: 'filesystem',
  },
}
