import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {navigationReducer} from 'reducers/navigation';
import {userReducer} from 'reducers/user';

export const reducers = combineReducers({
  router: routerReducer,
  navigation: navigationReducer,
  user: userReducer
});
