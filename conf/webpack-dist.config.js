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
    path: PATHS.BUILD,
    filename: 'js/[name]-[hash].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      PATHS.ROOT,
      PATHS.APP,
      PATHS.ASSETS,
      PATHS.NODE_MODULES
    ]
  },
  externals: {
    'env-config': JSON.stringify(require('./env-config-dist.json'))
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
      'process.env.NODE_ENV': '"production"',
      'process.env.APP_VERSION': JSON.stringify(require('../package.json').version)
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
      template: PATHS.APP_TEMPLATE_FILE,
      xhtml: true
    })
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    inline: true,
    hot: false,
    historyApiFallback: true,
    contentBase: PATHS.BUILD
  }
}
