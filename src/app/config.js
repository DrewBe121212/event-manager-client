import * as baseConfig from 'config/config';
import * as envConfig from 'env-config';
import deepFreeze from 'utils/deepFreeze';

let config = { ...baseConfig.default, ...envConfig.default };

config.APPLICATION.ENV = process.env.NODE_ENV;
config.APPLICATION.VERSION = process.env.APP_VERSION;

deepFreeze(config);

export default config;
