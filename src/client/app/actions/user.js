import {
  SET_USER,
  RESET_USER,
  SET_USER_AUTHORIZATION,
  RESET_USER_AUTHORIZATION
} from 'constants/user';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const resetUser = () => ({
  type: RESET_USER
});

const setUserAuthorization = (authorization) => ({
  type: SET_USER_AUTHORIZATION,
  payload: authorization
});

const resetUserAuthorization = () => ({
  type: RESET_USER_AUTHORIZATION
});

export {setUser, resetUser, setUserAuthorization, resetUserAuthorization};
