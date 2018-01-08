import {
  USER_SET,
  USER_RESET,
  USER_AUTHORIZATION_SET,
  USER_AUTHORIZATION_RESET
} from 'constants/user';

const setUser = (user) => ({
  type: USER_SET,
  payload: user
});

const resetUser = () => ({
  type: USER_RESET
});

const setUserAuthorization = (authorization) => ({
  type: USER_AUTHORIZATION_SET,
  payload: authorization
});

const resetUserAuthorization = () => ({
  type: USER_AUTHORIZATION_RESET
});

export {setUser, resetUser, setUserAuthorization, resetUserAuthorization};
