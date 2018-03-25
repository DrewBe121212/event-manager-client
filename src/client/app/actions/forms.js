import {
  LOAD_FORM,
  LOAD_FORM_SUCCESSFUL,
  LOAD_FORM_FAILURE,
  SAVE_FORM,
  SAVE_FORM_SUCCESSFUL,
  SAVE_FORM_FAILURE
} from 'constants/forms';
import {isPromise} from 'utils/isPromise';

export const loadForm = (data) => (dispatch) => {

  let formData = {};
  let promises = [];
  let mapPromiseIndexToKey = {};

  dispatch({
    type: LOAD_FORM
  });

  if (data) {
    for (let key in data) {
      if (isPromise(data[key])) {
        mapPromiseIndexToKey[promises.push(data[key])-1] = key;
      } else {
        formData[key] = data[key];
      }
    }
  }

  return Promise.all(promises)
    .then((response) => {
      Array.forEach(response, (item, index) => {
        if (item.data) {
          formData[mapPromiseIndexToKey[index]] = item.data;
        }
      });

      dispatch({
        type: LOAD_FORM_SUCCESSFUL,
        payload: formData
      });
    })
    .catch((error) => {
      dispatch({
        type: LOAD_FORM_FAILURE,
        payload: {
         overall: error 
        }
      });
    });
};

export const saveForm = (method, ...args) => (dispatch) => {
  
  dispatch({
    type: SAVE_FORM
  });

  const nextAction = method(...args);

  console.log(nextAction);

  return nextAction;
}

export const saveFormSuccessful = (payload) => ({
  type: SAVE_FORM_SUCCESSFUL,
  payload: payload.data
});

export const saveFormFailure = (error) => ({
  type: SAVE_FORM_FAILURE,
  payload: {
    overall: error
  }
});

