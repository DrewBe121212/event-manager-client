import {
  TOGGLE_DRAWER
} from '../constants/navigation';

const toggleDrawer = (open) => ({
  type: TOGGLE_DRAWER,
  payload: open
});

export {toggleDrawer};
