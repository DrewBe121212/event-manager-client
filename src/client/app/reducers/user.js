import { createReducer } from 'utils/redux';

import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_FAILURE,
  AUTHENTICATE_USER_SUCCESSFUL,
  FETCH_USER,
  FETCH_USER_SUCCESSFUL,
  FETCH_USER_FAILURE
} from 'constants/user';

const initialAbilities = {
  can: {},
  cannot: {}
};

const initialState = {
  loading: false,
  loaded: false,
  token: null,
  authenticating: false,
  authenticated: false,
  errors: {},
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
  abilities: initialAbilities
};

export const userReducer = createReducer(initialState, {
  [AUTHENTICATE_USER]: (state) => (
    Object.assign({}, state, {
      authenticating: true
    })
  ),
  [AUTHENTICATE_USER_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      errors: payload
    })
  ),
  [AUTHENTICATE_USER_SUCCESSFUL]: (state, payload) => (
    Object.assign({}, state, {
      authenticating: true,
      authenticated: true
    })
  ),
  [FETCH_USER]: (state) => {
    return Object.assign({}, initialState, {
      loading: true
    })
  },
  [FETCH_USER_SUCCESSFUL]: (state, payload) => {
    return Object.assign({}, state, {
      loading: false,
      loaded: true,
      token: payload.token || state.token,
      authenticated: payload.authenticated || state.authenticated,
      id: payload.id || state.id,
      username: payload.username || state.username,
      email: payload.email || state.email,
      first_name: payload.first_name || state.first_name,
      middle_name: payload.middle_name || state.middle_name,
      last_name: payload.last_name || state.last_name,
      sso: payload.sso || state.sso,
      active: payload.active || state.active,
      reset_password_sent_at: payload.reset_password_sent_at || state.reset_password_sent_at,
      current_sign_in_at: payload.current_sign_in_at || state.current_sign_in_at,
      last_sign_in_at: payload.last_sign_in_at || state.last_sign_in_at,
      confirmed_at: payload.confirmed_at || state.confirmed_at,
      confirmation_sent_at: payload.confirmation_sent_at || state.confirmation_sent_at,
      unconfirmed_email: payload.unconfirmed_email || state.unconfirmed_email,
      created_at: payload.created_at || state.created_at,
      updated_at: payload.updated_at || state.updated_at,
      roles: payload.roles || state.roles,
      abilities: payload.abilities || state.abilities
    })
  },
  [FETCH_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, initialState, {
      loaded: true,
      errors: payload
    })
  }
});
