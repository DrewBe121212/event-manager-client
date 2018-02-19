import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import {ListItemIcon, ListItemText} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import {MenuList} from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';
import ScheduleIcon from 'material-ui-icons/Schedule';

import {NavigationMenuItem} from './NavigationMenuItem';
import {config} from 'config';
import {Can} from 'libs/abilities';

const styles = (theme) => ({
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

class NavigationComponent extends React.Component {

  static propTypes = {
    drawer: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired
  };

  closeDrawer = () => {
    this.props.handleDrawerToggle(false);
  }

  render() {
    const {drawer, classes} = this.props;

    return (
      <Drawer variant="persistent" open={drawer.open} classes={{paper: classes.drawerPaper}}>
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <div>
              <div>
                <Typography variant="title" gutterBottom>{config.APPLICATION.NAME}</Typography>
              </div>
              <div>
                <Typography variant="caption" align="right">Version {config.APPLICATION.VERSION}</Typography>
              </div>
            </div>
            <IconButton onClick={this.closeDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <MenuList>
            <Can perform="login" on="guest">
              <NavigationMenuItem url="/user/sign-in">
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Account Login" />
              </NavigationMenuItem>
            </Can>
            <Can perform="view" on="daily_schedule">
              <NavigationMenuItem url="/">
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText primary="Daily Schedule" />
              </NavigationMenuItem>
            </Can>
          </MenuList>
        </div>
      </Drawer>
    );
  }
}

const Navigation = withStyles(
  styles
)(NavigationComponent);

export {Navigation};
