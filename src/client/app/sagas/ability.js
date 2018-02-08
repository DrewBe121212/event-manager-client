import {select, takeEvery, put, call} from 'redux-saga/effects';
import {
  SET_USER,
  RESET_USER
} from 'constants/user';

import {setUserAuthorization} from 'actions/user';
import {setAbilitiesFromState} from 'libs/abilities';

function* refreshAbilities() {

  const state = yield select();

  const abilities = yield call(setAbilitiesFromState, state);

  yield put(setUserAuthorization(abilities));

}

function* watchUserUpdates() {
  yield takeEvery([
    SET_USER, RESET_USER
  ], refreshAbilities);
}

export {refreshAbilities, watchUserUpdates};
