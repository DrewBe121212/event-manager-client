import {createReducer} from 'utils/redux';
import {
  TOGGLE_DRAWER,
  SET_MENU_TITLE
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
  [TOGGLE_DRAWER]: (state, payload) => {

    let open = state.drawer.open;

    if (typeof payload === 'boolean') {
      open = payload ? true : false;
    } else {
      open = open ? false : true;
    }

    return Object.assign({}, state, {
      drawer: {
        open
      }
    });
  },
  [SET_MENU_TITLE]: (state, title) => (
    Object.assign({}, state, {
      menu: {
        title
      }
    })
  )
});

export {navigation};
