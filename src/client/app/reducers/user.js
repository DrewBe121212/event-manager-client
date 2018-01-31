import {createReducer} from 'utils/redux';

import {
  USER_SET,
  USER_RESET,
  USER_SET_AUTHORIZATION,
  USER_RESET_AUTHORIZATION
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
  [USER_SET]: (state, payload) => {

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
  [USER_RESET]: (state) => {
    return({...state, ...initialState});
  },
  [USER_SET_AUTHORIZATION]: (state, payload) => {
    return ({...state,
      authorization: payload
    });
  },
  [USER_RESET_AUTHORIZATION]: (state) => {
    return({...state,
      authorization: initialAuthorization
    });
  }
});

export {user};
