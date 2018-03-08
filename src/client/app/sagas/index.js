import {all, fork} from 'redux-saga/effects';
import {refreshAbilities, watchUserUpdates} from './ability';
import {watchAuthenticateUser} from './user';

export function* rootSaga() {
  yield all([
    fork(refreshAbilities),
    fork(watchUserUpdates),
    fork(watchAuthenticateUser)
  ]);
}
