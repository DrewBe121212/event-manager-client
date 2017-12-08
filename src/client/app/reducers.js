import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {navigation} from './reducers/navigation';

const reducers = combineReducers({
  routerReducer,
  navigation
});

export {reducers}; 
