import {select, takeEvery, put, call} from 'redux-saga/effects';
import {
  USER_SET,
  USER_RESET
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
    USER_SET, USER_RESET
  ], refreshAbilities);
}

export {refreshAbilities, watchUserUpdates};
