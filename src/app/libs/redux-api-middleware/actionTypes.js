const SUCCESS_SUFFIX = '_SUCCESS';
const ERROR_SUFFIX = '_FAILURE';

export const getActionTypes = (action) => {
  let types = [];

  if (action.type) {
    const { type } = action;
    types = [type, `${type}${SUCCESS_SUFFIX}`, `${type}${ERROR_SUFFIX}`];
  } else if (action.types) {
    types = action.types;
  } else {
    throw new Error('Action that matched redux-api-middleware needs to have "type" or "types" key');
  }

  return types;
}
