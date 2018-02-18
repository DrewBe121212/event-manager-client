import {all, fork} from 'redux-saga/effects';
import {refreshAbilities, watchUserUpdates} from './ability';

function* rootSaga() {
  yield all([
    fork(refreshAbilities),
    fork(watchUserUpdates)
  ]);
}

export {rootSaga};
