const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAutoInjectVersion = require('webpack-auto-inject-version');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const resolve = require('./webpack.resolve');
const rules = require('./webpack.rules');
const CONFIG = require('../config');
const PATHS = CONFIG.PATHS;

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      PATHS.SRC + '/application.js'
    ]
  },
  output: {
    publicPath: '/',
    path: PATHS.BUILD,
    filename: 'js/[name]-[hash].js' ,
    chunkFilename: 'js/[name].[chunkhash].js'   
  },
  resolve: {
    ...resolve
  },
  externals: {
    'env-config': JSON.stringify(require(PATHS.CONFIG + '/env/env-config-dist.json'))
  },
  module: {
    rules
  },
  plugins: [
    new CleanWebpackPlugin(PATHS.BUILD, {
      root: PATHS.ROOT
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_VERSION': JSON.stringify(require(PATHS.ROOT + '/package.json').version)
    }),
    new MinifyPlugin(),
    new WebpackAutoInjectVersion({
      SILENT: true
    }),
    new HtmlWebpackPlugin({
      template: PATHS.APP_TEMPLATE_FILE,
      xhtml: true
    })
  ],
  devServer: {
    contentBase: PATHS.BUILD,
    host: 'localhost',
    port: 8080,
    inline: true,
    hot: false,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
}
