const CONFIG = require('../config');
const PATHS = CONFIG.PATHS;

module.exports = [
  {
    test: /\.jsx?$/,
    include: PATHS.SRC,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.(css|scss)$/,
    include: PATHS.CSS,
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
    include: PATHS.SRC,
    use: {
      loader: 'json'
    }
  }
];