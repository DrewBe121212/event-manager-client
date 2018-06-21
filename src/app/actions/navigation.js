import {
  TOGGLE_DRAWER,
  TOGGLE_DRAWER_MENU,
  SET_MENU_ACTIVE,
  FETCH_MENU,
  FETCH_MENU_SUCCESSFUL,
  FETCH_MENU_FAILURE
} from 'constants/navigation';

import { MenuService } from 'api';

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

export const toggleDrawerMenu = (menuId, openDrawerMenu) => (dispatch, getState) => {
  const { openMenus } = getState().navigation.drawer;
  const currentlyOpenIndex = openMenus.indexOf(menuId);
  const currentlyOpen = currentlyOpenIndex >= 0;
  let open;

  if (typeof openDrawerMenu === 'boolean') {
    open = openDrawerMenu ? true : false;
  } else {
    open = currentlyOpen ? false : true;
  }

  if (!currentlyOpen && open) {
    openMenus.push(menuId);
  } else if (currentlyOpen && !open) {
    openMenus.splice(currentlyOpenIndex, 1);
  }

  dispatch({
    type: TOGGLE_DRAWER_MENU,
    payload: openMenus
  });  

};

export const fetchMenu = () => ({
  types: [
    FETCH_MENU,
    FETCH_MENU_SUCCESSFUL,
    FETCH_MENU_FAILURE
  ],
  service: () => MenuService.get(),
  loader: true
});

export const setMenuActive = (id, title) => ({
  type: SET_MENU_ACTIVE,
  payload: {
    id,
    title
  }
});


