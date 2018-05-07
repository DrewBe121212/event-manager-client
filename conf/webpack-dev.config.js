process.env.NODE_ENV = 'development';

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
      PATHS.ROOT,
      PATHS.APP,
      PATHS.ASSETS,
      PATHS.NODE_MODULES
    ]
  },
  externals: {
    'env-config': JSON.stringify(require('./env-config-dev.json'))
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include : PATHS.SRC,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        include : PATHS.CSS,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: "css-loader",
          },
          {
            loader: 'sass-loader'
          }         
        ]
      },
      {
        test: /.json$/,
        include : PATHS.SRC,
        use: {
          loader: 'json'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_VERSION': JSON.stringify(require('../package.json').version)
    }),
    new HtmlWebpackPlugin({
      template: PATHS.APP_TEMPLATE_FILE,
      xhtml: true
    }),
    new WebpackAutoInjectVersion({
      SILENT: true
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
