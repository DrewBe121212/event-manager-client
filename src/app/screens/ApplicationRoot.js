import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApplicationLoadingBar from 'components/layout/ApplicationLoadingBar';
import ApplicationBar from 'components/layout/ApplicationBar';
import Navigation from 'components/layout/Navigation';
import { Error503 } from 'components/errors';
import { toggleDrawer, toggleDrawerMenu } from 'actions/navigation';
import { fetchUserProfile } from 'actions/user';
import Routes from 'screens/routes';

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
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: 'calc(100% - 56px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

class ApplicationRoot extends React.Component {
  static propTypes = {
    navigationDrawer: PropTypes.object.isRequired,
    applicationLoader: PropTypes.object.isRequired,
    navigationMenu: PropTypes.object.isRequired,
    userProfile: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    toggleDrawerMenu: PropTypes.func.isRequired,
    fetchUserProfile: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    const { fetchUserProfile } = this.props;

    fetchUserProfile();
  }

  handleNavigationMenuItemClick = (link) => {
    const { location, history } = this.props;

    if (link.url && link.url.length > 0) {
      if (link.url !== location.pathname) {
        history.push(link.url);
      }
    } else if (link.nested_links) {
      this.handleToggleDrawerMenu(link.position);
    }
  };

  handleToggleDrawer = (open) => {
    this.props.toggleDrawer(open);
  };

  handleToggleDrawerMenu = (menu, open) => {
    this.props.toggleDrawerMenu(menu, open);
  }

  content = () => {
    const { loaded, errors } = this.props.userProfile;

    if (loaded) {
      return <Routes />;
    } else if (errors !== null) {
      return <Error503 errors={errors} />;
    }
  };

  render() {
    const { applicationLoader, navigationDrawer, userProfile, classes } = this.props;
    const { title, active, links } = this.props.navigationMenu;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <ApplicationBar
          userProfile={userProfile}
          title={title}
          navigationDrawer={navigationDrawer}
          handleToggleDrawer={this.handleToggleDrawer}
        />
        <Navigation
          links={links}
          activeLink={active}
          handleNavigationMenuItemClick={this.handleNavigationMenuItemClick}
          navigationDrawer={navigationDrawer}
          handleToggleDrawer={this.handleToggleDrawer} />

        <div className={classNames(classes.content, { [classes.contentShift]: navigationDrawer.open })}>
          <ApplicationLoadingBar applicationLoader={applicationLoader} />
          {this.content()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    applicationLoader: state.application.loader,
    navigationMenu: state.navigation.menu,
    navigationDrawer: state.navigation.drawer,
    userProfile: state.user.profile
  };
};

const mapDispatchToProps = {
  toggleDrawer,
  toggleDrawerMenu,
  fetchUserProfile
};

export default withRouter(
  compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
  )(ApplicationRoot)
);