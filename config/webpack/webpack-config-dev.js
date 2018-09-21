const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAutoInjectVersion = require('webpack-auto-inject-version');

const resolve = require('./webpack.resolve');
const rules = require('./webpack.rules');
const CONFIG = require('../config');
const PATHS = CONFIG.PATHS;

module.exports = {
  entry: {
    app: [
      '@babel/polyfill',
      PATHS.SRC + '/application.js'
    ]
  },
  output: {
    publicPath: '/',
    path: PATHS.PUBLIC,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  resolve: {
    ...resolve
  },
  externals: {
    'env-config': JSON.stringify(require(PATHS.CONFIG + '/env/env-config-dev.json'))
  },
  module: {
    rules
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_VERSION': JSON.stringify(require(PATHS.ROOT + '/package.json').version)
    }),
    new WebpackAutoInjectVersion({
      SILENT: true
    }),
    new HtmlWebpackPlugin({
      template: PATHS.APP_TEMPLATE_FILE,
      xhtml: true
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: PATHS.PUBLIC,
    host: 'localhost',
    port: 8080,
    inline: true,
    hot: false,
    hotOnly: false,
    overlay: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
}
