import {select, takeEvery} from 'redux-saga/effects';
import {
  USER_SET,
  USER_RESET
} from 'constants/user';
import {setAbilitiesFromState} from 'utils/abilities';

export function* refreshAbilities() {
  const state = yield select();

  setAbilitiesFromState(state);
}

export function* watchUserUpdates() {
  yield takeEvery([
    USER_SET, USER_RESET
  ], refreshAbilities);
}
