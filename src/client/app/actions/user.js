import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESSFUL,
  AUTHENTICATE_USER_FAILURE,
  FETCH_USER,
  FETCH_USER_SUCCESSFUL,
  FETCH_USER_FAILURE
} from 'constants/user';

import { SessionService } from 'api';
import { formatAbilities } from 'libs/abilities';

export const authenticateUser = (username, password) => (dispatch, getState) => {
  dispatch({
    type: AUTHENTICATE_USER
  });

  return SessionService.authenticate(username, password)
    .then((response) => {
      if (response.data.errors) {
        dispatch(authenticateUserFailure(response.data.errors));
      } else {
        dispatch(authenticateUserSuccessful());
      }
    })
    .catch((error) => {
      dispatch(authenticateUserFailure(error.response.data));
    });
};

const authenticateUserSuccessful = (user) => ({
  type: AUTHENTICATE_USER_SUCCESSFUL,
  payload: user
});

const authenticateUserFailure = (error) => ({
  type: AUTHENTICATE_USER_FAILURE,
  payload: {
    ...error
  }
});

export const fetchUser = () => (dispatch) => {
  dispatch({
    type: FETCH_USER
  });

  return SessionService.profile()
    .then((response) => {
      dispatch(fetchUserSuccessful(response.data));
    }).catch((error) => {
      dispatch(fetchUserFailure(error.response.message));
    })
};

const fetchUserSuccessful = (payload) => {
  
  payload.abilities = formatAbilities(payload.abilities);

  return {
    type: FETCH_USER_SUCCESSFUL,
    payload
  };
};

const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error
});