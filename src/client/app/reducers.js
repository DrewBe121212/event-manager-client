import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {navigation} from 'reducers/navigation';
import {user} from 'reducers/user';

const reducers = combineReducers({
  routerReducer,
  navigation,
  user
});

export {reducers};
