import {
  SET_APP_LOADING
} from 'constants/application';

export const setAppLoading = (loading = true) =>  (dispatch, getState) => {
  const { active } = getState().application.loader;
  let activeAdjusted = loading ? active + 1 : active - 1;

  if (activeAdjusted < 0) {
    activeAdjusted = 0;
  }

  dispatch({
    type: SET_APP_LOADING,
    payload: activeAdjusted
  });
};
