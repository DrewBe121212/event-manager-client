const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAutoInjectVersion = require('webpack-auto-inject-version');

const CONFIG = require('./config');
const PATHS = CONFIG.PATHS;

module.exports = {
  entry: [
    PATHS.SRC_DIR + '/index.js'
  ],
  output: {
    path: PATHS.BUILD_DIR,
    filename: 'js/[name]-[hash].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /.json$/,
        include : PATHS.SRC_DIR,
        loaders: ['json']
      },
      {
        test: /\.jsx?$/,
        include : PATHS.SRC_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        include : PATHS.SRC_DIR,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new WebpackAutoInjectVersion({
      SILENT: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: PATHS.APP_TEMPLATE,
      xhtml: true
    })
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    inline: true,
    hot: false,
    historyApiFallback: true,
    contentBase: PATHS.BUILD_DIR
  }
}
