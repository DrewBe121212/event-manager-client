import { all } from 'redux-saga/effects';
import {watchUserUpdates} from './ability';

function* rootSaga() {
  yield all([
    watchUserUpdates
  ]);
}

export {rootSaga};
export {refreshAbilities} from './ability';
