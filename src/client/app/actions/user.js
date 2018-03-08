import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESSFUL,
  AUTHENTICATE_USER_FAILURE,
  SET_USER,
  RESET_USER,
  SET_USER_AUTHORIZATION,
  RESET_USER_AUTHORIZATION
} from 'constants/user';


export const authenticateUser = (user, password) => ({
  type: AUTHENTICATE_USER,
  payload: {
    user,
    password
  }
});

export const authenticateUserSuccessful = (user) => ({
  type: AUTHENTICATE_USER_SUCCESSFUL,
  payload: user
});

export const authenticateUserFailure = (error) => ({
  type: AUTHENTICATE_USER_FAILURE,
  payload: error
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
