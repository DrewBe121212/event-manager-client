import {
  USER_SET,
  USER_RESET,
  USER_SET_AUTHORIZATION,
  USER_RESET_AUTHORIZATION
} from 'constants/user';

const setUser = (user) => ({
  type: USER_SET,
  payload: user
});

const resetUser = () => ({
  type: USER_RESET
});

const setUserAuthorization = (authorization) => ({
  type: USER_SET_AUTHORIZATION,
  payload: authorization
});

const resetUserAuthorization = () => ({
  type: USER_RESET_AUTHORIZATION
});

export {setUser, resetUser, setUserAuthorization, resetUserAuthorization};
