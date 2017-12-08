import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  TOGGLE_DRAWER
} from '../constants/navigation';

const initialState = {
  drawer: {
    open: false
  }
};

const navigation = function(state = initialState, action) {
  switch(action.type) {

    case OPEN_DRAWER:
      return Object.assign(state, {drawer: {open: true}});

    case CLOSE_DRAWER:
      return Object.assign(state, {drawer: {open: false}});

    case TOGGLE_DRAWER:
      return Object.assign(state, {drawer: {open: !state.drawer.open}});

    default:
      return state;

  }
}

export {navigation};
