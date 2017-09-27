const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CLIENT_PATH = path.resolve(__dirname, 'src/client');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(CLIENT_PATH, 'app');

module.exports = {
  entry: [
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'js/[name]-[hash].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /.json$/,
        include : APP_DIR,
        loaders: ['json']
      },
      {
        test: /\.jsx?$/,
        include : APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        include : APP_DIR,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(APP_DIR, 'index.html')
    })
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    inline: true,
    hot: false,
    historyApiFallback: true,
    contentBase: BUILD_DIR
  }
}
