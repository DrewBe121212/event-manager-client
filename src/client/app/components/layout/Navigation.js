import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';

import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

import {NavigationMenu} from './NavigationMenu';
import {config} from 'config';

const styles = (theme) => ({
  environment: {
    textTransform: 'capitalize'
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: theme.drawer.width
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

const NavigationComponent = (props) => {
  const {drawer, classes, isActiveMenu, handleDrawerToggle, handleNavigationMenuItemClick} = props;

  function closeDrawer() {
    handleDrawerToggle(false);
  }

  return (
    <Drawer variant="persistent" open={drawer.open} classes={{paper: classes.drawerPaper}}>
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <div>
            <div>
              <Typography variant="subheading" noWrap>{config.APPLICATION.NAME}</Typography>
            </div>
            <div>
              <Typography variant="caption" noWrap align="right" className={classes.environment}>Version {config.APPLICATION.VERSION}</Typography>
            </div>
          </div>
          <IconButton onClick={closeDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <NavigationMenu isActiveMenu={isActiveMenu} handleNavigationMenuItemClick={handleNavigationMenuItemClick} />
      </div>
    </Drawer>
  );
};

NavigationComponent.propTypes = {
  drawer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  isActiveMenu: PropTypes.func.isRequired,
  handleNavigationMenuItemClick: PropTypes.func.isRequired
};

const Navigation = withStyles(
  styles
)(NavigationComponent);

export {Navigation};
