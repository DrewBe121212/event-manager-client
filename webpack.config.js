const path = require('path');
const webpack = require('webpack');

const CLIENT_PATH = path.resolve(__dirname, 'src/client');

const BUILD_DIR = path.resolve(CLIENT_PATH, 'public');
const APP_DIR = path.resolve(CLIENT_PATH, 'app');

module.exports = {
  entry: [
    APP_DIR + '/index.js'
  ],
  output: {
    path: path.resolve(BUILD_DIR, 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include : APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap&sourceComments',
        ],
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    inline: true,
    hot: false,
    historyApiFallback: true,
    contentBase: BUILD_DIR
  }
}
