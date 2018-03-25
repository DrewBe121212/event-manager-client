import {all, fork} from 'redux-saga/effects';
import {refreshAbilities, watchUserUpdates} from './ability';
import {watchSaveForm} from './forms';

export function* rootSaga() {
  yield all([
    fork(refreshAbilities),
    fork(watchUserUpdates),
    fork(watchSaveForm)
  ]);
}
