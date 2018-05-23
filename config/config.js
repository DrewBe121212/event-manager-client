const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const CONFIG_PATH = path.resolve(ROOT_PATH, 'config');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const TMP_PATH = path.resolve(ROOT_PATH, '.tmp');
const PUBLIC_PATH = path.resolve(ROOT_PATH, 'public');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');
const APP_TEMPLATE_FILE = path.resolve(SRC_PATH, 'index.html');
const APP_PATH = path.resolve(SRC_PATH, 'app');
const ASSETS_PATH = path.resolve(SRC_PATH, 'assets');
const CSS_PATH = path.resolve(ASSETS_PATH, 'css');

module.exports = {
  APPLICATION: {
    NAME: "Event Management"
  },
  PATHS: {
    ROOT: ROOT_PATH,
    CONFIG: CONFIG_PATH,
    SRC: SRC_PATH,
    TMP: TMP_PATH,
    PUBLIC: PUBLIC_PATH,
    BUILD: BUILD_PATH,
    APP: APP_PATH,
    ASSETS: ASSETS_PATH,
    CSS: CSS_PATH,
    APP_TEMPLATE_FILE,
    NODE_MODULES: NODE_MODULES_PATH
  }
};
