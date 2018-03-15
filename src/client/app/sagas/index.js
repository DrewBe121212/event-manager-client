import {all, fork} from 'redux-saga/effects';
import {refreshAbilities, watchUserUpdates} from './ability';

export function* rootSaga() {
  yield all([
    fork(refreshAbilities),
    fork(watchUserUpdates)
  ]);
}
