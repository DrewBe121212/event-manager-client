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

NavigationMenuItem.propTypes = {
  link: PropTypes.object.isRequired,
  activeLink: PropTypes.string.isRequired,
  handleNavigationMenuItemClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavigationMenuItem);
