import { setAppLoading } from 'actions/application';
import { getActionTypes } from './actionTypes';

export const reduxApiMiddleware = store => next => action => {
  const service = action.service;

  if (service) {
    const actionTypes = getActionTypes(action);
    const loader = action.loader || false;
    const REQUEST = actionTypes[0];
    const REQUEST_SUCCESS = actionTypes[1];
    const REQUEST_FAILURE = actionTypes[2];

    next({type: REQUEST, payload: action.payload});
    
    if (loader) {
      store.dispatch(setAppLoading(true));
    }
    
    return service()
      .then((response) => {
        if (response.data.errors) {
          store.dispatch({
            type: REQUEST_FAILURE,
            payload: {
              ...response.data.errors
            }
          });
        } else {
          store.dispatch({
            type: REQUEST_SUCCESS,
            payload: response.data
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          store.dispatch({
            type: REQUEST_FAILURE,
            payload: {
              ...error.response.data
            }
          });          
        } else {
          store.dispatch({
            type: REQUEST_FAILURE,
            payload: {
              error: error.message
            }
          });            
        }
      })
      .finally(() => {
        if (loader) {
          store.dispatch(setAppLoading(false));
        }
      });
  } else {
    next(action);
  }
}


