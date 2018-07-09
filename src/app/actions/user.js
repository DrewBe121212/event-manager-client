import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESSFUL,
  AUTHENTICATE_USER_FAILURE,
  RESET_AUTHENTICATE_USER,
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESSFUL,
  FETCH_USER_PROFILE_FAILURE
} from 'constants/user';
import { SessionService } from 'api';
import { pundit } from 'libs/pundit';

export const authenticateUser = (username, password) => ({
  types: [
    AUTHENTICATE_USER,
    AUTHENTICATE_USER_SUCCESSFUL,
    AUTHENTICATE_USER_FAILURE
  ],
  service: () => SessionService.authenticate(username, password),
  loader: true
});

export const resetAuthenticateUser = () => ({
  type: RESET_AUTHENTICATE_USER
});

export const fetchUserProfile = () => ({
  types: [
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_SUCCESSFUL,
    FETCH_USER_PROFILE_FAILURE
  ],
  service: () => {
    const profile = SessionService.profile();
    profile.promise.then((response) => {
      if (response && response.data && response.data.policies) {
        pundit.setPolicies(response.data.policies);
      }
    }).catch((error) => {
      throw error;
    });
    return profile;
  },
  loader: true
});
