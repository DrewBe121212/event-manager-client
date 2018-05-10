import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const NavigationMenuItemComponent = (props) => {
  const { link, activeLink, handleNavigationMenuItemClick, children, classes } = props;

  function handleClick() {
    handleNavigationMenuItemClick(link);
  }

  return (
    <MenuItem 
      onClick={handleClick}
      className={classNames({[classes.nested]: link.position.length > 1 })}
      selected={link.position === activeLink}
      > 
        {children}
    </MenuItem>
  );
};

export const NavigationMenuItem = withStyles(
  styles
)(NavigationMenuItemComponent);
