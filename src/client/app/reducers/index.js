import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { routerReducer } from 'react-router-redux';
import { applicationReducer } from './application';
import { navigationReducer } from './navigation';
import { userReducer } from './user';

const keyPrefix = 'event-manager:';

const navigationPersistConfig = {
  keyPrefix,
  key: 'navigation',
  whitelist: ['drawer'],
  storage
};

const userPersistConfig = {
  keyPrefix,
  key: 'user',
  whitelist: ['authentication'],
  storage
}

export const rootReducer = combineReducers({
  router: routerReducer,
  application: applicationReducer,
  navigation: persistReducer(navigationPersistConfig, navigationReducer),
  user: persistReducer(userPersistConfig, userReducer)
});