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
  [SET_APP_LOADING]: (state, payload) => ({
    ...state,
    loader: Object.assign({}, state.loader, {
      active: payload,
      loading: payload > 0 ? true : false
    })
  })
});