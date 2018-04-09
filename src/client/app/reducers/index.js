import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { navigationReducer } from './navigation';
import { userReducer } from './user';

export const reducers = combineReducers({
  router: routerReducer,
  navigation: navigationReducer,
  user: userReducer
});
