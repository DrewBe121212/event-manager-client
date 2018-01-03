const baseConfig = require('conf/config');
const envConfig = require('env-config');

import {deepFreeze} from 'utils/deepFreeze';

let config = {...baseConfig, ...envConfig};

config.APPLICATION.ENV = process.env.NODE_ENV;
config.APPLICATION.VERSION = process.env.APP_VERSION;

deepFreeze(config);

export {config};
