import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NavigationMenu from './NavigationMenu';
import config from 'config';

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

const Navigation = (props) => {
  const { links, activeLink, navigationDrawer, drawerOpen, classes, handleToggleDrawer, handleNavigationMenuItemClick } = props;

  const drawerClasses = {
    paper: classes.drawerPaper
  };

  function closeDrawer() {
    handleToggleDrawer(false);
  }

  return (
    <Drawer variant="persistent" open={drawerOpen} classes={drawerClasses}>
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
        <NavigationMenu
          links={links}
          activeLink={activeLink}
          handleNavigationMenuItemClick={handleNavigationMenuItemClick}
          navigationDrawerOpenMenus={navigationDrawer.openMenus}
        />
      </div>
    </Drawer>
  );
};

Navigation.propTypes = {
  links: PropTypes.array.isRequired,
  activeLink: PropTypes.string.isRequired,
  navigationDrawer: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
  handleNavigationMenuItemClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Navigation);
