import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import {MenuList, MenuItem} from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ScheduleIcon from 'material-ui-icons/Schedule';

import {config} from 'config';

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

  constructor(props) {
    super(props);

    this.state = Object.assign({}, {drawer: props.drawer});

  }

  closeDrawer = () => {
    this.props.handleDrawerToggle(false);
  }

  render() {
    const {drawer, classes} = this.props;

    return (
      <Drawer type="persistent" open={drawer.open} classes={{paper: classes.drawerPaper}}>
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <div>
              <div>
                <Typography type="title" gutterBottom>{config.APPLICATION.NAME}</Typography>
              </div>
              <div>
                <Typography type="caption" align="right">Version {config.APPLICATION.VERSION}</Typography>
              </div>
            </div>
            <IconButton onClick={this.closeDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary="Daily Schedule" />
            </MenuItem>
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
