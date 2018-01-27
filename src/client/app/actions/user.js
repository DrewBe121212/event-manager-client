import {
  USER_SET,
  USER_RESET
} from 'constants/user';

const setUser = (user) => ({
  type: USER_SET,
  payload: user
});

const resetUser = () => ({
  type: USER_RESET
});

export {setUser, resetUser};
