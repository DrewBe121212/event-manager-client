import {
  TOGGLE_DRAWER,
  SET_MENU_TITLE
} from 'constants/navigation';

export const toggleDrawer = (open) => ({
  type: TOGGLE_DRAWER,
  payload: open
});

export const setMenuTitle = (title) => ({
  type: SET_MENU_TITLE,
  payload: title
});
