import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

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
    const {classes} = this.props;

    return (
      <Drawer type="persistent" open={this.props.drawer.open} classes={{paper: classes.drawerPaper}}>
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.closeDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
        </div>
      </Drawer>
    );

  }

}

const Navigation = withStyles(
  styles
)(NavigationComponent);

export {Navigation};
