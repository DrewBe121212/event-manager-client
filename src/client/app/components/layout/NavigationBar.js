import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class NavigationBarComponent extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  handleDrawerToggle = () => {
    this.props.handleDrawerToggle()
  }

  render() {

    return (
      <div className={this.props.classes.root}>
        <AppBar>
          <Toolbar>
            <IconButton onClick={this.handleDrawerToggle} className={this.props.classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={this.props.classes.flex}>
              Event Technologies
            </Typography>
            <Button color="contrast">Daily Schedule</Button>
          </Toolbar>
        </AppBar>
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    navigation: state.navigation
  };
}

const mapDispatchToProps = (dispatch) => ({
    handleDrawerToggle: () => dispatch({ type: 'TOGGLE_DRAWER' })
});

export const NavigationBar = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationBarComponent);
