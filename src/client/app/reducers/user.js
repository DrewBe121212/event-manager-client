import {createReducer} from 'utils/redux';

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
  authenticating: false,
  authenticated: false,
  authorization: initialAuthorization,
  roles: [
    'guest'
  ],
  username: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  email: ''
};

export const userReducer = createReducer(initialState, {
  [AUTHENTICATE_USER]: (state) => (
    Object.assign({}, state, {
      authenticating: true,
      authenticated: false
    })
  ),
  [AUTHENTICATE_USER_FAILURE]: (state) => (
    Object.assign({}, state, {
      authenticating: false,
      authenticated: false
    })
  ),
  [AUTHENTICATE_USER_SUCCESSFUL]: (state) => (
    Object.assign({}, state, {
      authenticating: true,
      authenticated: true
    })
  ),
  [SET_USER]: (state, payload) => {

    let roles = payload.roles ? payload.roles.concat() : [];

    if (authenticated) {
      if (roles.indexOf('user') === -1) {
        roles.push('user');
      }
    } else {
      if (roles.indexOf('guest') === -1) {
        roles.push('guest');
      }
    }

    return ({...state,
      roles: roles,
      username: payload.username || state.username,
      first_name: payload.first_name || state.first_name,
      middle_name: payload.middle_name || state.middle_name,
      last_name: payload.last_name || state.last_name,
      email: payload.email || state.email
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
