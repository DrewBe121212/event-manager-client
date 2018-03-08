const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const CONF_PATH = path.resolve(ROOT_PATH, 'conf');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const TMP_PATH = path.resolve(ROOT_PATH, '.tmp');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');
const CLIENT_PATH = path.resolve(SRC_PATH, 'client');
const APP_TEMPLATE_FILE = path.resolve(SRC_PATH, 'index.html');
const APP_PATH = path.resolve(CLIENT_PATH, 'app');
const ASSETS_PATH = path.resolve(APP_PATH, 'assets');
const CSS_PATH = path.resolve(ASSETS_PATH, 'css');

module.exports = {
  APPLICATION: {
    NAME: "Event Management"
  },
  PATHS: {
    ROOT: ROOT_PATH,
    CONF: CONF_PATH,
    SRC: SRC_PATH,
    CLIENT: CLIENT_PATH,
    TMP: TMP_PATH,
    BUILD: BUILD_PATH,
    APP: APP_PATH,
    ASSETS: ASSETS_PATH,
    CSS: CSS_PATH,
    APP_TEMPLATE_FILE,
    NODE_MODULES: NODE_MODULES_PATH
  }
};
