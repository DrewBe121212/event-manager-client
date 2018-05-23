import {
  SET_APP_LOADING
} from 'constants/application';

export const setAppLoading = (loading = true) => ({
  type: SET_APP_LOADING,
  payload: loading
});
