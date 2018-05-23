import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESSFUL,
  AUTHENTICATE_USER_FAILURE,
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESSFUL,
  FETCH_USER_PROFILE_FAILURE
} from 'constants/user';
import { setAppLoading } from './application';
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
      dispatch(authenticateUserFailure(error));
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

export const fetchUserProfile = () => (dispatch) => {
  dispatch({
    type: FETCH_USER_PROFILE
  });

  dispatch(setAppLoading());

  return SessionService.profile()
    .then((response) => {
      dispatch(fetchUserProfileSuccessful(response.data));
    })
    .catch((error) => {
      dispatch(fetchUserProfileFailure(error));
    })
    .finally(() => {
      dispatch(setAppLoading(false));
    });
};

const fetchUserProfileSuccessful = (payload) => {
  payload.abilities = formatAbilities(payload.abilities);

  return {
    type: FETCH_USER_PROFILE_SUCCESSFUL,
    payload
  };
};

const fetchUserProfileFailure = (error) => ({
  type: FETCH_USER_PROFILE_FAILURE,
  payload: error
});