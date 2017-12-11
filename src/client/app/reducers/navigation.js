import {createReducer} from '../utils/redux';
import {
  TOGGLE_DRAWER
} from '../constants/navigation';


const initialState = {
  drawer: {
    open: false
  }
};

const navigation = createReducer(initialState, {
  [TOGGLE_DRAWER]: (state, payload) => {

    let open = state.drawer.open;

    if (typeof payload === 'boolean') {
      open = payload ? true : false;
    } else {
      open = open ? false : true;
    }

    return ({...state,
      drawer: {
        open: open
      }
    });
  }
});

export {navigation};
