import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';

import {ApplicationBar} from 'components/layout/ApplicationBar';

import {toggleDrawer} from 'actions/navigation';
import {Routes} from 'routes';

const styles = () => ({
  root: {

  },
  container: {
    flexGrow: 1,
    marginTop: 70
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

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ApplicationBar title={this.props.title} handleDrawerToggle={this.props.handleDrawerToggle} />

        <div className={classes.container}>
          {this.props.drawer.open ? 'open' : 'closed'}
          {Routes}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.navigation.menu.title,
    drawer: state.navigation.drawer
  };
};

const mapActionsToProps = {
  handleDrawerToggle: toggleDrawer
};

const Application = withRouter(
  compose(
    withStyles(styles),
    connect(mapStateToProps, mapActionsToProps)
  )(ApplicationComponent)
);

export {Application};
