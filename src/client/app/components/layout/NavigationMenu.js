import React from 'react';
import {MenuList} from 'material-ui/Menu';
import {ListItemIcon, ListItemText} from 'material-ui/List';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';
import ScheduleIcon from 'material-ui-icons/Schedule';

import {NavigationMenuItem} from './NavigationMenuItem';
import {Can} from 'libs/abilities';

const NavigationMenu = (props) => {

  const {isActiveMenu, handleNavigationMenuItemClick} = props;

  return (
    <MenuList>
      <Can perform="login" on="guest">
        <NavigationMenuItem url="/user/sign-in" isActiveMenu={isActiveMenu} handleNavigationMenuItemClick={handleNavigationMenuItemClick}>
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Account Login" />
        </NavigationMenuItem>
      </Can>
      <Can perform="view" on="daily_schedule">
        <NavigationMenuItem url="/" isActiveMenu={isActiveMenu} handleNavigationMenuItemClick={handleNavigationMenuItemClick}>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Daily Schedule" />
        </NavigationMenuItem>
      </Can>
    </MenuList>
  );
}

export {NavigationMenu};
