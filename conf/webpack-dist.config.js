const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAutoInjectVersion = require('webpack-auto-inject-version');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const CONFIG = require('./config');
const PATHS = CONFIG.PATHS;

module.exports = {
  entry: [
    PATHS.APP_DIR + '/index.js'
  ],
  output: {
    path: PATHS.BUILD_DIR,
    filename: 'js/[name]-[hash].js',
  },
  module: {
    loaders: [
      {
        test: /.json$/,
        include : PATHS.APP_DIR,
        loaders: ['json']
      },
      {
        test: /\.jsx?$/,
        include : PATHS.APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        include : PATHS.APP_DIR,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.BUILD_DIR], {
      root: PATHS.ROOT,
      exclude: []
    }),
    new WebpackAutoInjectVersion({
      SILENT: true
    }),
    new HtmlWebpackPlugin({
      template: PATHS.APP_TEMPLATE,
      xhtml: true
    })
  ]
}
