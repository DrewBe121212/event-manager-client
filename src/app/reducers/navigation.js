import { createReducer } from 'utils/redux';
import {
  TOGGLE_DRAWER,
  TOGGLE_DRAWER_MENU,
  SET_MENU_ACTIVE,
  FETCH_MENU,
  FETCH_MENU_SUCCESSFUL,
  FETCH_MENU_FAILURE
} from 'constants/navigation';

const mapMenus = (menus, position = [], activeId = null) => {
  let mapping = {};

  menus.forEach((menu, index) => {
    const menuIndex = [
      ...position, index
    ];
    menu.position = [
      ...menuIndex
    ];
    menu.menu_title = menu.title.split(':').slice(-1)[0].trim();

    if (activeId === null) {
      menu.activeId = menu.id;
    } else {
      menu.activeId = activeId;
    }
    menu.visibleChildren = menu.children.length;
        
    mapping[menu.url] = menuIndex.join(':');

    if (menu.visibleChildren > 0) {
      // calculate how many menu items are actually visible
      menu.visibleChildren = menu.children.filter((menu) => menu.visible).length;

      mapping = Object.assign(mapping, mapMenus(menu.children, menuIndex));
    }
  });

  return mapping;
}


const initialState = {
  menu: {
    loading: false,
    loaded: false,
    active: {
      id: null,
      title: null
    },
    menus: [],
    mapping: {},
    error: null
  },
  drawer: {
    open: false,
    openMenus: []
  }
};

export const navigationReducer = createReducer(initialState, {
  [TOGGLE_DRAWER]: (state, payload) => ({
    ...state,
    drawer: Object.assign({}, state.drawer, {
      open: payload
    })
  }),
  [TOGGLE_DRAWER_MENU]: (state, payload) => {
    return {
      ...state,
      drawer: Object.assign({}, state.drawer, {
        openMenus: payload
      })
    };
  },
  [FETCH_MENU]: (state) => ({
    ...state,
    menu: Object.assign({}, state.menu, {
      loading: true,
      loaded: false
    })
  }),
  [FETCH_MENU_FAILURE]: (state, payload) => ({
    ...state,
    menu: Object.assign({}, initialState.menu, {
      loading: false,
      loaded: true,
      error: payload.error
    })
  }),
  [FETCH_MENU_SUCCESSFUL]: (state, payload) => ({
    ...state,
    menu: Object.assign({}, initialState.menu, {
      loading: false,
      loaded: true,
      menus: payload,
      mapping: mapMenus(payload)
    })
  }),
  [SET_MENU_ACTIVE]: (state, payload) => ({
    ...state,
    menu: Object.assign({}, state.menu, {
      active: {...payload}
    })
  })
});
