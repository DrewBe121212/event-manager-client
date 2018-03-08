import {takeEvery, put, call} from 'redux-saga/effects';
import {
  AUTHENTICATE_USER
} from 'constants/user';

import {authenticateUserSuccessful, authenticateUserFailure} from 'actions/user';
import {UserService} from 'api';

function* authenticateUser({type, payload}) {
  try {
    const response = yield call([UserService, 'authenticate'],
      payload.user,
      payload.password
    );

    yield put(authenticateUserSuccessful(response.data));

  } catch(error) {
    yield put(authenticateUserFailure(error));
  }

}

export function* watchAuthenticateUser() {
  yield takeEvery(AUTHENTICATE_USER, authenticateUser);
}
