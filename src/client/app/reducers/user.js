import {createReducer} from 'utils/redux';

import {
  SET_USER,
  RESET_USER,
  SET_USER_AUTHORIZATION,
  RESET_USER_AUTHORIZATION
} from 'constants/user';

const initialAuthorization = {};
const initialState = {
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

const user = createReducer(initialState, {
  [SET_USER]: (state, payload) => {

    const authenticated = payload.authenticated || state.authenticated;
    let roles = payload.roles ? [
      ...payload.roles
    ] : [];

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
      authenticated: authenticated,
      roles: roles,
      username: payload.username || state.username,
      first_name: payload.first_name || state.first_name,
      middle_name: payload.middle_name || state.middle_name,
      last_name: payload.last_name || state.last_name,
      email: payload.email || state.email
    });
  },
  [RESET_USER]: (state) => {
    return({...state, ...initialState});
  },
  [SET_USER_AUTHORIZATION]: (state, payload) => {
    return ({...state,
      authorization: payload
    });
  },
  [RESET_USER_AUTHORIZATION]: (state) => {
    return({...state,
      authorization: initialAuthorization
    });
  }
});

export {user};
