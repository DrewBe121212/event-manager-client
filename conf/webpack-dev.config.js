const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAutoInjectVersion = require('webpack-auto-inject-version');

const CONFIG = require('./config');
const PATHS = CONFIG.PATHS;

module.exports = {
  entry: [
    PATHS.APP_DIR + '/index.js'
  ],
  output: {
    path: PATHS.TMP_DIR,
    filename: 'js/[name].js',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new WebpackAutoInjectVersion({
      SILENT: true
    }),
    new HtmlWebpackPlugin({
      template: PATHS.APP_TEMPLATE,
      xhtml: true
    })
  ],
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 8080,
    inline: true,
    hot: false,
    historyApiFallback: true,
    contentBase: PATHS.TMP_DIR,
  }
}
