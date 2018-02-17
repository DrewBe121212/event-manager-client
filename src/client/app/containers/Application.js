import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';

import {ApplicationBar} from 'components/layout/ApplicationBar';
import {Navigation} from 'components/layout/Navigation';

import {toggleDrawer} from 'actions/navigation';

import {Routes} from 'routes';

const styles = (theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  content: {
    marginLeft: -theme.drawer.width,
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
});

class ApplicationComponent extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    drawer: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired
  };

  render () {

    const {title, drawer, classes} = this.props;

    return (
      <div className={classes.root}>
        <Reboot />
        <ApplicationBar title={title} drawer={drawer} handleDrawerToggle={this.props.handleDrawerToggle} />
        <Navigation drawer={drawer} handleDrawerToggle={this.props.handleDrawerToggle} />
        <div className={classNames(classes.content, {[classes.contentShift]: drawer.open})}>
          <Routes />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.navigation.menu.title,
    drawer: state.navigation.drawer,
    user: state.user
  };
};

const mapDispatchToProps = {
  handleDrawerToggle: toggleDrawer
};

const Application = withRouter(
  compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
  )(ApplicationComponent)
);

export {Application};
