import * as ability from './ability';

 /* Ability Sagas should always be first, it determines permissions for everything else */
const sagaGenerators = {
  ...ability
};

const sagas = Object.values(sagaGenerators);

export {sagas};
