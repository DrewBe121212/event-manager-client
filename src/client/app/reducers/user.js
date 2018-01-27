import {createReducer} from 'utils/redux';

import {
  USER_SET,
  USER_RESET
} from 'constants/user';

const initialState = {
  authenticated: false,
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
  }
});

export {user};
