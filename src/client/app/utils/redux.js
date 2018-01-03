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
  })

  return normalizedData;
}

const test = [
  {idx: 1, 'text': 'bob'},
  {idx: 2, 'text': 'tom'},
  {idx: 3, 'text': 'frank'},
  {idx: 4, 'text': 'sara'},
  {idx: 5, 'text': 'sam'}
];

console.log( normalizeData(test, 'idx'));

export {createReducer, normalizeData};
