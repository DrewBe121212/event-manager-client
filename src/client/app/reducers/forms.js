import {createReducer} from 'utils/redux';
import {
  LOAD_FORM,
  LOAD_FORM_SUCCESSFUL,
  LOAD_FORM_FAILURE,
  SAVE_FORM,
  SAVE_FORM_SUCCESSFUL,
  SAVE_FORM_FAILURE
} from 'constants/forms';

const initialState = {
  data: {},
  errors: {
    fields: {},
    overall: []
  },
  loading: false,
  loaded: false,
  saving: false,
  saved: false
};

export const formsReducer = createReducer(initialState, {
  [LOAD_FORM]: (state) => (
    Object.assign({}, state, {
      loading: true
    })
  ),
  [LOAD_FORM_SUCCESSFUL]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      loaded: true,
      data: payload
    })
  ),
  [LOAD_FORM_FAILURE]: (state, {fields, overall}) => (
    Object.assign({}, state, {
      loading: false,
      loaded: false,
      errors: {
        fields: Object.assign({}, state.errors.fields, fields),
        overall: state.errors.overall.concat(overall)
       }
    })
  ),
  [SAVE_FORM]: (state) => (
    Object.assign({}, state, {
      saving: true,
    })
  ),
  [SAVE_FORM_SUCCESSFUL]: (state, payload) => (
    Object.assign({}, state, {
      saving: false,
      saved: true,
      data: payload
    })
  ),
  [SAVE_FORM_FAILURE]: (state, {fields, overall}) => (
    Object.assign({}, state, {
      saving: false,
      saved: false,
      errors: {
       fields: Object.assign({}, state.errors.fields, fields),
       overall: state.errors.overall.concat(overall)
      }
    })
  ),
});
