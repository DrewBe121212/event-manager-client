import { createReducer } from 'utils/redux';

import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_FAILURE,
  AUTHENTICATE_USER_SUCCESSFUL,
  RESET_AUTHENTICATE_USER,
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESSFUL,
  FETCH_USER_PROFILE_FAILURE
} from 'constants/user';

const initialState = {
  profile: {
    loading: false,
    loaded: false,
    id: null,
    username: null,
    email: null,
    first_name: null,
    middle_name: null,
    last_name: null,
    current_sign_in_at: null,
    last_sign_in_at: null,
    roles: [],
    error: null
  },
  authentication: {
    authenticating: false,
    authenticated: false,
    token: null,
    errors: {
      error: null,
      fields: {}
    }
  },
  authorization: {
    policies: {}
  }
};

export const userReducer = createReducer(initialState, {
  [AUTHENTICATE_USER]: (state) => ({
    ...state,
    authentication: Object.assign({}, state.authentication, {
      authenticating: true
    })
  }),
  [AUTHENTICATE_USER_FAILURE]: (state, payload) => ({
    ...state,
    authentication: Object.assign({}, state.authentication, {
      authenticating: false,
      errors: Object.assign({}, initialState.authentication.errors, payload)
    })
  }),
  [AUTHENTICATE_USER_SUCCESSFUL]: (state, payload) => {
    const authenticated = payload.authenticated && payload.token ? true : false;
    const token = authenticated && payload.token;

    return {
      ...state,
      authentication: Object.assign({}, state.authentication, {
        authenticating: false,
        authenticated: authenticated || state.authentication.authenticated,
        token: token || state.authentication.token
      })
    };
  },
  [RESET_AUTHENTICATE_USER]: (state) => ({
    ...state,
    authentication: Object.assign({}, initialState.authentication)
  }),
  [FETCH_USER_PROFILE]: (state) => ({
    ...state,
    profile: Object.assign({}, state.profile, {
      loading: true
    })
  }),
  [FETCH_USER_PROFILE_FAILURE]: (state, payload) => ({
    ...state,
    profile: Object.assign({}, initialState.profile, {
      loading: false,
      loaded: true,
      error: payload.error
    })
  }),
  [FETCH_USER_PROFILE_SUCCESSFUL]: (state, payload) => ({
    ...state,
    profile: Object.assign({}, initialState.profile, {
      loading: false,
      loaded: true,
      id: payload.id || state.profile.id,
      username: payload.username || state.profile.username,
      email: payload.email || state.profile.email,
      first_name: payload.first_name || state.profile.first_name,
      middle_name: payload.middle_name || state.profile.middle_name,
      last_name: payload.last_name || state.profile.last_name,
      current_sign_in_at: payload.current_sign_in_at || state.profile.current_sign_in_at,
      last_sign_in_at: payload.last_sign_in_at || state.profile.last_sign_in_at,
      roles: payload.roles || state.profile.roles
    }),
    authorization: Object.assign({}, state.authorization, {
      policies: payload.policies || state.authorization.policies
    })
  })
});
