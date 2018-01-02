const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAutoInjectVersion = require('webpack-auto-inject-version');

const CONFIG = require('./config');
const PATHS = CONFIG.PATHS;

module.exports = {
  entry: [
    PATHS.SRC + '/index.js'
  ],
  output: {
    path: PATHS.TMP,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      PATHS.APP,
      PATHS.ASSETS,
      PATHS.NODE_MODULES
    ]
  },
  module: {
    loaders: [
      {
        test: /.json$/,
        include : PATHS.SRC,
        loaders: ['json']
      },
      {
        test: /\.jsx?$/,
        include : PATHS.SRC,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        include : PATHS.CSS,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
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
      template: PATHS.APP_TEMPLATE_FILE,
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
    watchOptions: {
      ignored: /node_modules/
    }
  }
}
