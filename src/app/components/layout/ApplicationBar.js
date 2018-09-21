import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

const styles = (theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      transition: theme.transitions.create([
        'margin',
        'width'
      ], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  },
  appBarShift: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.drawer.width,
      width: `calc(100% - ${theme.drawer.width}px)`,
      transition: theme.transitions.create([
        'margin',
        'width'
      ], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  },
  drawerButton: {
    marginLeft: 12,
    marginRight: 20,
    transition: theme.transitions.create([
      'margin'
    ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })    
  },
  titleShift: {
    marginLeft: 5,
    [theme.breakpoints.only('sm')]: {
      marginLeft: theme.drawer.width + theme.spacing.unit,
      transition: theme.transitions.create([
        'margin'
      ], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })      
    }
  }
});

class ApplicationBar extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    navigationMenu: PropTypes.object.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    handleToggleDrawer: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  openDrawer = () => {
    this.props.handleToggleDrawer(true);
  }

  handleUserMenuClick = () => {
    alert('popup user menu');
  }

  render() {
    const { title, navigationMenu, drawerOpen, classes } = this.props;

    return (
      <AppBar className={classNames(classes.appBar, { [classes.appBarShift]: drawerOpen })}>
        <Toolbar disableGutters={!drawerOpen}>
          <IconButton disabled={!navigationMenu.loaded || navigationMenu.error !== null} onClick={this.openDrawer} className={classNames(classes.drawerButton, { hidden: drawerOpen })} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classNames({ [classes.titleShift]: drawerOpen })} variant="title" color="inherit" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(ApplicationBar);
