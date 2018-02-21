import React from 'react';
import {MenuItem} from 'material-ui/Menu';

const NavigationMenuItem = (props) => {
  const {children, url, isActiveMenu, handleNavigationMenuItemClick} = props;

  function handleClick() {
    handleNavigationMenuItemClick(url);
  }

  return(
    <MenuItem selected={isActiveMenu(url)} onClick={handleClick}>
      {children}
    </MenuItem>
  );
};

export {NavigationMenuItem};
