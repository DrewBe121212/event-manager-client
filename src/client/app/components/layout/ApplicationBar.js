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
  root: {
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden'
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create([
      'margin', 'width'
    ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${theme.drawer.width}px)`,
    marginLeft: theme.drawer.width,
    transition: theme.transitions.create([
      'margin', 'width'
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
    this.props.handleDrawerToggle();
  }

  handleUserMenuClick = () => {
    alert('popup user menu');
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classNames(classes.appBar, {[classes.appBarShift]: this.props.drawer.open})}>
          <Toolbar disableGutters={!this.props.drawer.open}>
            <IconButton onClick={this.openDrawer} className={classNames(classes.drawerButton, {hidden: this.props.drawer.open})} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" noWrap>
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );

  }

}

const ApplicationBar = withStyles(
  styles
)(ApplicationBarComponent);

export {ApplicationBar};
