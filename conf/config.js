const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const CLIENT_PATH = path.resolve(ROOT_PATH, 'src/client');

const BUILD_DIR = path.resolve(ROOT_PATH, 'dist');
const APP_DIR = path.resolve(CLIENT_PATH, 'app');

const APP_TEMPLATE = path.resolve(APP_DIR, 'index.html');

module.exports = {
  PATHS: {
    ROOT: ROOT_PATH,
    CLIENT: CLIENT_PATH,
    BUILD_DIR: BUILD_DIR,
    APP_DIR: APP_DIR,
    APP_TEMPLATE: APP_TEMPLATE
  }
};
