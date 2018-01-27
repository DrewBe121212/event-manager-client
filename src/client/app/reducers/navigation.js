import {createReducer} from 'utils/redux';
import {
  NAVIGATION_TOGGLE_DRAWER,
  NAVIGATION_SET_MENU_TITLE
} from 'constants/navigation';

const initialState = {
  menu: {
    title: ''
  },
  drawer: {
    open: false
  }
};

const navigation = createReducer(initialState, {
  [NAVIGATION_TOGGLE_DRAWER]: (state, payload) => {

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

  },
  [NAVIGATION_SET_MENU_TITLE]: (state, title) => {
    return ({...state,
      menu: {
        title: title
      }
    });

  }
});

export {navigation};
