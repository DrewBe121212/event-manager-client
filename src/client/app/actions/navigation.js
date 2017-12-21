import {
  TOGGLE_DRAWER,
  SET_MENU_TITLE
} from 'constants/navigation';

const toggleDrawer = (open) => ({
  type: TOGGLE_DRAWER,
  payload: open
});

const setMenuTitle = (title) => ({
  type: SET_MENU_TITLE,
  payload: title
})

export {toggleDrawer, setMenuTitle};
