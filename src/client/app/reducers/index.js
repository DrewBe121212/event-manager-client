import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { applicationReducer } from './application';
import { navigationReducer } from './navigation';
import { userReducer } from './user';

export const reducers = combineReducers({
  router: routerReducer,
  application: applicationReducer,
  navigation: navigationReducer,
  user: userReducer
});
