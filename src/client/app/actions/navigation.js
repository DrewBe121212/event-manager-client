import {
  NAVIGATION_TOGGLE_DRAWER,
  NAVIGATION_SET_MENU_TITLE
} from 'constants/navigation';

const toggleDrawer = (open) => ({
  type: NAVIGATION_TOGGLE_DRAWER,
  payload: open
});

const setMenuTitle = (title) => ({
  type: NAVIGATION_SET_MENU_TITLE,
  payload: title
});

export {toggleDrawer, setMenuTitle};
