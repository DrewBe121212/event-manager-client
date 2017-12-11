const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const CLIENT_PATH = path.resolve(SRC_PATH, 'client');

const TMP_DIR = path.resolve(ROOT_PATH, '.tmp');
const BUILD_DIR = path.resolve(ROOT_PATH, 'dist');
const APP_DIR = path.resolve(CLIENT_PATH, 'app');

const APP_TEMPLATE = path.resolve(SRC_PATH, 'index.html');

module.exports = {
  PATHS: {
    ROOT_DIR: ROOT_PATH,
    SRC_DIR: SRC_PATH,
    CLIENT_DIR: CLIENT_PATH,
    TMP_DIR,
    BUILD_DIR: BUILD_DIR,
    APP_DIR: APP_DIR,
    APP_TEMPLATE: APP_TEMPLATE
  }
};
