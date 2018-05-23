const CONFIG = require('../config');
const PATHS = CONFIG.PATHS;

module.exports = {
  extensions: ['.js', '.jsx'],
  modules: [
    PATHS.ROOT,
    PATHS.APP,
    PATHS.ASSETS,
    PATHS.NODE_MODULES
  ]
};