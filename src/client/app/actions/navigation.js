import {
  TOGGLE_DRAWER,
  TOGGLE_DRAWER_MENU,
  SET_APP_LOADING,
  SET_MENU_TITLE,
  SET_MENU_ACTIVE
} from 'constants/navigation';

export const toggleDrawer = (open) => ({
  type: TOGGLE_DRAWER,
  payload: open
});

export const toggleDrawerMenu = (menu, open) => ({
  type: TOGGLE_DRAWER_MENU,
  payload: {
    menu,
    open
  }
});

export const setAppLoading = (loading = true) => ({
  type: SET_APP_LOADING,
  payload: loading
});

export const setMenuTitle = (title) => ({
  type: SET_MENU_TITLE,
  payload: title
});

export const setMenuActive = (active) => ({
  type: SET_MENU_ACTIVE,
  payload: active
});
