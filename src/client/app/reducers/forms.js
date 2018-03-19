import {createReducer} from 'utils/redux';
import {
  LOAD_FORM,
  LOAD_FORM_SUCCESSFUL,
  LOAD_FORM_FAILURE
} from 'constants/forms';

const initialState = {
  forms: {}
};

const initialFormState = {
  data: {},
  object: {},
  errors: [],
  loading: false,
  loaded: false
};

const mergeWithState = (state, form, payload) => (
  Object.assign({}, state, {
    [form]: payload
  })
);

export const formsReducer = createReducer(initialState, {
  [LOAD_FORM]: (state, form, payload) => (
    mergeWithState(state, form,
      Object.assign({}, initialFormState, {
        loading: true
      })
    )
  ),
  [LOAD_FORM_SUCCESSFUL]: (state, form, payload) => (
    mergeWithState(state, form,
      Object.assign({}, {
        loading: false,
        loaded: true
      })
    )
  ),
  [LOAD_FORM_FAILURE]: (state, form, payload) => (
    mergeWithState(state, form,
      Object.assign({}, {
        loading: false,
        loaded: false,
        errors: payload
      })
    )
  )
});
