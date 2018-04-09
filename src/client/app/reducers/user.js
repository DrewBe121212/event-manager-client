import { createReducer } from 'utils/redux';

import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_FAILURE,
  AUTHENTICATE_USER_SUCCESSFUL,
  SET_USER,
  RESET_USER,
  SET_USER_AUTHORIZATION,
  RESET_USER_AUTHORIZATION
} from 'constants/user';

const initialAuthorization = {};
const initialState = {
  token: null,
  authenticating: false,
  authenticated: false,
  errors: {},
  authorization: initialAuthorization,
  roles: [
    'guest'
  ],
  email: '',
  username: '',
  first_name: '',
  middle_name: '',
  last_name: ''
};

export const userReducer = createReducer(initialState, {
  [AUTHENTICATE_USER]: (state) => (
    Object.assign({}, initialState, {
      authenticating: true
    })
  ),
  [AUTHENTICATE_USER_FAILURE]: (state, payload) => (
    Object.assign({}, initialState, {
      errors: payload
    })
  ),
  [AUTHENTICATE_USER_SUCCESSFUL]: (state, payload) => (
    Object.assign({}, initialState, {
      authenticating: true,
      authenticated: true
    })
  ),
  [SET_USER]: (state, payload) => {

    let roles = payload.roles ? payload.roles.concat() : [];

    if (state.authenticated) {
      if (roles.indexOf('user') === -1) {
        roles.push('user');
      }
    } else {
      if (roles.indexOf('guest') === -1) {
        roles.push('guest');
      }
    }

    return Object.assign({}, state, {
      email: payload.email || state.email,
      roles: roles,
      username: payload.username || state.username,
      first_name: payload.first_name || state.first_name,
      middle_name: payload.middle_name || state.middle_name,
      last_name: payload.last_name || state.last_name
    });
  },
  [RESET_USER]: () => (
    Object.assign({}, initialState)
  ),
  [SET_USER_AUTHORIZATION]: (state, payload) => (
    Object.assign({}, state, {
      authorization: payload
    })
  ),
  [RESET_USER_AUTHORIZATION]: (state) => (
    Object.assign({}, state, {
      authorization: initialAuthorization
    })
  )
});
