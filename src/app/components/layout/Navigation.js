import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NavigationMenu from './NavigationMenu';
import config from 'config';

const styles = (theme) => ({
  title: {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light
    }
  },
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
  const { navigationMenu, navigationDrawer, drawerOpen, classes, handleToggleDrawer, handleNavigationMenuItemClick } = props;

  const drawerClasses = {
    paper: classes.drawerPaper
  };
  
  function handleCloseDrawer() {
    handleToggleDrawer(false);
  }

  const drawer = (
    <div className={classes.drawerInner}>
      <div className={classes.drawerHeader}>
        <div>
          <div>
            <Link className={classes.title} to="/">
              <Typography noWrap variant="subheading" color="inherit">
                {config.APPLICATION.NAME}
              </Typography>
            </Link>
          </div>
          <div>
            <Typography variant="caption" noWrap align="right" className={classes.environment}>
              Version {config.APPLICATION.VERSION}
            </Typography>
          </div>
        </div>
        <IconButton onClick={handleCloseDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <NavigationMenu
        navigationMenu={navigationMenu}
        handleNavigationMenuItemClick={handleNavigationMenuItemClick}
        navigationDrawerOpenMenus={navigationDrawer.openMenus}
      />
    </div>
  );

  return (
    <React.Fragment>
      <Hidden smDown>
        <Drawer variant="persistent" open={drawerOpen} classes={drawerClasses}>
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer variant="temporary" open={drawerOpen} onClose={handleCloseDrawer} ModalProps={{ keepMounted: true }}>
          {drawer}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

Navigation.propTypes = {
  navigationMenu: PropTypes.object.isRequired,
  navigationDrawer: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
  handleNavigationMenuItemClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Navigation);
