import { createReducer } from 'utils/redux';
import {
  SET_APP_LOADING
} from 'constants/application';

const initialState = {
  loader: {
    active: 0,
    loading: false
  }
};

export const applicationReducer = createReducer(initialState, {
  [SET_APP_LOADING]: (state, payload) => {
    let count = state.loader.active + (payload ? +1 : -1);

    if (count < 0) {
      count = 0;
    }

    return Object.assign({}, state, {
      loader: {
        active: count,
        loading: count > 0
      }
    });
  }
});