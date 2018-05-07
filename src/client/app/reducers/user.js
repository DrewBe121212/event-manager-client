import { createReducer } from 'utils/redux';

import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_FAILURE,
  AUTHENTICATE_USER_SUCCESSFUL,
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
    sso: false,
    active: false,
    reset_password_sent_at: null,
    current_sign_in_at: null,
    last_sign_in_at: null,
    confirmed_at: null,
    confirmation_sent_at: null,
    unconfirmed_email: null,
    created_at: null,
    updated_at: null,
    roles: [],
    errors: {}
  },
  authentication: {
    authenticating: false,
    authenticated: false,
    token: null,
    errors: {}
  },
  authorization: {
    abilities: {
      can: {},
      cannot: {}
    }
  }
};

export const userReducer = createReducer(initialState, {
  [AUTHENTICATE_USER]: (state) => ({
    ...state,
    authentication: {
      authenticating: true
    }
  }),
  [AUTHENTICATE_USER_FAILURE]: (state, payload) => ({
    ...state,
    authentication: {
      errors: payload
    }
  }),
  [AUTHENTICATE_USER_SUCCESSFUL]: (state, payload) => {
    const authenticated = payload.authenticated && payload.token ? true : false;
    const token = authenticated && payload.token;

    return {
      ...state,
      authentication: {
        authenticating: false,
        authenticated: authenticated || state.authentication.authenticated,
        token: token || state.authentication.token
      }
    };
  },
  [FETCH_USER_PROFILE]: (state) => ({
    ...state,
    profile: Object.assign({}, state.profile, {
      loading: true
    })
  }),
  [FETCH_USER_PROFILE_FAILURE]: (state, payload) => ({
    ...state,
    profile: Object.assign({}, state.profile, {
      loading: false,
      loaded: false,
      errors: payload.message
    })
  }),  
  [FETCH_USER_PROFILE_SUCCESSFUL]: (state, payload) => ({
    ...state,
    profile: Object.assign({}, state.profile, {
      loading: false,
      loaded: true,
      id: payload.id || state.profile.id,
      username: payload.username || state.profile.username,
      email: payload.email || state.profile.email,
      first_name: payload.first_name || state.profile.first_name,
      middle_name: payload.middle_name || state.profile.middle_name,
      last_name: payload.last_name || state.profile.last_name,
      sso: payload.sso || state.profile.sso,
      active: payload.active || state.profile.active,
      reset_password_sent_at: payload.reset_password_sent_at || state.profile.reset_password_sent_at,
      current_sign_in_at: payload.current_sign_in_at || state.profile.current_sign_in_at,
      last_sign_in_at: payload.last_sign_in_at || state.profile.last_sign_in_at,
      confirmed_at: payload.confirmed_at || state.profile.confirmed_at,
      confirmation_sent_at: payload.confirmation_sent_at || state.profile.confirmation_sent_at,
      unconfirmed_email: payload.unconfirmed_email || state.profile.unconfirmed_email,
      created_at: payload.created_at || state.profile.created_at,
      updated_at: payload.updated_at || state.profile.updated_at,
      roles: payload.roles || state.profile.roles
    }),
    authorization: Object.assign({}, state.authorization, {
      abilities: payload.abilities || state.authorization.abilities
    })
  })
});
