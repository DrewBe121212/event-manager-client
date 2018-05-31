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
import { formatAbilities } from 'libs/abilities';

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
  service: () => SessionService.profile().then((response) => {
    if (response && response.data && response.data.abilities) {
      response.data.abilities = formatAbilities(response.data.abilities);
    }
    return response;
  }),
  loader: true
});
