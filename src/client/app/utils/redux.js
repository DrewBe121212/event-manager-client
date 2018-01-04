function createReducer(initialState, handlers) {
  return function reducer(state=initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action.payload, action.meta);
    } else {
      return state;
    }
  };
}

function normalizeData(data = [], id) {

  let normalizedData = {};

  if (typeof id === undefined) {
    return;
  }

  data.forEach((obj) => {
    if (obj[id] !== undefined) {
      normalizedData['_' + obj[id].toString()] = obj;
    }
  });

  return normalizedData;
}

export {createReducer, normalizeData};
