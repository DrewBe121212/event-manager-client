import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {formsReducer} from 'reducers/forms';
import {navigationReducer} from 'reducers/navigation';
import {userReducer} from 'reducers/user';

export const reducers = combineReducers({
  forms: formsReducer,
  router: routerReducer,
  navigation: navigationReducer,
  user: userReducer
});
