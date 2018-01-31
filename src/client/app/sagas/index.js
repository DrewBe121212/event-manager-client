import * as ability from './ability';

const sagaGenerators = {
  ...ability
};

const sagas = Object.values(sagaGenerators);

export {sagas};
