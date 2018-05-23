switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./config/webpack/webpack-config-dist');
    break;

  default:
    module.exports = require('./config/webpack/webpack-config-dev');
}