import {createReducer} from 'utils/redux';

import {
  USER_SET,
  USER_RESET,
  USER_AUTHORIZATION_SET,
  USER_AUTHORIZATION_RESET
} from 'constants/user';

const initialAuthorization = {};

const initialState = {
  authenticated: false,
  authorization: initialAuthorization,
  user: {
    username: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    email: ''
  },
  roles: []
};

const user = createReducer(initialState, {
  [USER_SET]: (state, payload) => {
    return ({...state,
      authenticated: true,
      user: {
        username: payload.username,
        first_name: payload.first_name,
        middle_name: payload.middle_name,
        last_name: payload.last_name,
        email: payload.email
      },
      roles: payload.roles
    });
  },
  [USER_RESET]: (state) => {
    return({...state, ...initialState});
  },
  [USER_AUTHORIZATION_SET]: (state, payload) => {
    return ({...state,
        authorization: payload
    });
  },
  [USER_AUTHORIZATION_RESET]: (state) => {
    return({...state, ...{authorization: initialAuthorization}
    });
  }
});

export {user};
