import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui-icons/Menu';

const styles = (theme) => ({
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create([
      'margin', 
      'width'
    ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: theme.drawer.width,
    width: `calc(100% - ${theme.drawer.width}px)`,
    transition: theme.transitions.create([
      'margin', 
      'width'
    ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerButton: {
    marginLeft: 12,
    marginRight: 20
  }
});

class ApplicationBarComponent extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    drawer: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired
  };

  openDrawer = () => {
    this.props.handleDrawerToggle(true);
  }

  handleUserMenuClick = () => {
    alert('popup user menu');
  }

  render() {
    const {title, drawer, classes} = this.props;

    return (
      <AppBar className={classNames(classes.appBar, {[classes.appBarShift]: drawer.open})}>
        <Toolbar disableGutters={!drawer.open}>
          <IconButton onClick={this.openDrawer} className={classNames(classes.drawerButton, {hidden: drawer.open})} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );

  }

}

const ApplicationBar = withStyles(
  styles
)(ApplicationBarComponent);

export {ApplicationBar};
