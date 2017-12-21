import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import {ApplicationBarButtons} from './ApplicationBarButtons';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%'
  },
  flex: {
    flex: 1
  },
  drawerButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class ApplicationBarComponent extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
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
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <IconButton onClick={this.openDrawer} className={classes.drawerButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {this.props.title}
            </Typography>
            <ApplicationBarButtons />
            <IconButton onClick={this.handleUserMenuClick} color="contrast">
              <AccountCircle />
            </IconButton>
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
