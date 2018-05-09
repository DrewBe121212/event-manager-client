import {
  TOGGLE_DRAWER,
  TOGGLE_DRAWER_MENU,
  SET_MENU_TITLE,
  SET_MENU_ACTIVE
} from 'constants/navigation';

export const toggleDrawer = (openDrawer) => (dispatch, getState) => {
  let open;

  if (typeof openDrawer === 'boolean') {
    open = openDrawer ? true : false;
  } else {
    open = getState().navigation.drawer.open ? false : true;
  }
  
  dispatch({
    type: TOGGLE_DRAWER,
    payload: open
  });
};

export const toggleDrawerMenu = (menu, openDrawerMenu) => (dispatch, getState) => {
  let open;

  if (typeof openDrawerMenu === 'boolean') {
    open = openDrawerMenu ? true : false;
  } else {
    open = getState().navigation.drawer.openMenus.indexOf(menu) >= 0 ? false : true;
  }

  dispatch({
    type: TOGGLE_DRAWER_MENU,
    payload: {
      menu,
      open
    }
  });
};

export const setMenuTitle = (title) => ({
  type: SET_MENU_TITLE,
  payload: title
});

export const setMenuActive = (active) => ({
  type: SET_MENU_ACTIVE,
  payload: active
});
