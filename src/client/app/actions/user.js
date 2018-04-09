import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESSFUL,
  AUTHENTICATE_USER_FAILURE,
  SET_USER,
  RESET_USER,
  SET_USER_AUTHORIZATION,
  RESET_USER_AUTHORIZATION
} from 'constants/user';

import {SessionService} from 'api';

export const authenticateUser = (username, password) => (dispatch, getState) => {
  dispatch({
    type: AUTHENTICATE_USER,
    payload: {
      username,
      password
    },
    meta: {
      form: {
        success: AUTHENTICATE_USER_SUCCESSFUL,
        failure: AUTHENTICATE_USER_FAILURE
      }
    }
  });

  return SessionService.authenticate(username, password)
    .then((response) => {
      console.log(response);
      if (response.data.errors) { 
        dispatch(authenticateUserFailure(response.data.errors));
      } else {
        dispatch(authenticateUserSuccessful());
        dispatch(setUser(response.data));
      }
    })
    .catch((error) => {
      dispatch(authenticateUserFailure(error.response.data));
    });
};

export const authenticateUserSuccessful = (user) => ({
  type: AUTHENTICATE_USER_SUCCESSFUL,
  payload: user
});

export const authenticateUserFailure = (error) => ({
  type: AUTHENTICATE_USER_FAILURE,
  payload: {
    ...error
  }
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const resetUser = () => ({
  type: RESET_USER
});

export const setUserAuthorization = (authorization) => ({
  type: SET_USER_AUTHORIZATION,
  payload: authorization
});

export const resetUserAuthorization = () => ({
  type: RESET_USER_AUTHORIZATION
});
