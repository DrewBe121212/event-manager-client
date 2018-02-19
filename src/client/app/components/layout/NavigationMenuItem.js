import React from 'react';
import {withRouter} from 'react-router-dom';
import {MenuItem} from 'material-ui/Menu';

const NavigationMenuItemComponent = (props) => {
  const {children, url, history, location} = props;

  function handleClick() {
    if (url !== location.pathname) {
      history.push(url);
    }
  }

  return(
    <MenuItem selected={url === location.pathname} onClick={handleClick}>
      {children}
    </MenuItem>
  );
};

const NavigationMenuItem = withRouter(NavigationMenuItemComponent);

export {NavigationMenuItem};
