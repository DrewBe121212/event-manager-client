import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const styles = (theme) => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

const NavigationMenuItem = (props) => {
  const { menu, activeMenu, handleNavigationMenuItemClick, children, classes } = props;

  function handleClick() {
    handleNavigationMenuItemClick(menu);
  }

  return (
    <MenuItem 
      onClick={handleClick}
      className={classNames({[classes.nested]: menu.position.length > 1 })}
      selected={menu.id === activeMenu.id}
    > 
      {children}
    </MenuItem>
  );
};

NavigationMenuItem.propTypes = {
  menu: PropTypes.object.isRequired,
  activeMenu: PropTypes.object.isRequired,
  handleNavigationMenuItemClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavigationMenuItem);
