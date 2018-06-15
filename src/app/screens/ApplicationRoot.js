import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import classNames from 'classnames';
import { Helmet } from "react-helmet";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import ApplicationLoadingBar from 'components/layout/ApplicationLoadingBar';
import ApplicationBar from 'components/layout/ApplicationBar';
import Navigation from 'components/layout/Navigation';
import { Error503 } from 'components/errors';
import { toggleDrawer, toggleDrawerMenu } from 'actions/navigation';
import { fetchUserProfile } from 'actions/user';
import Routes from 'screens/routes';
import config from 'config';

const styles = (theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginLeft: -theme.drawer.width,
      height: 'calc(100% - 64px)',
      marginTop: 64,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })      
    }
  },
  containerShift: {
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  },
  content: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class ApplicationRoot extends React.PureComponent {
  static propTypes = {
    navigationDrawer: PropTypes.object.isRequired,
    navigationMenu: PropTypes.object.isRequired,
    userProfile: PropTypes.object.isRequired,
    applicationLoader: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    toggleDrawerMenu: PropTypes.func.isRequired,
    fetchUserProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.handleFetchUserProfile();
  }

  handleFetchUserProfile = () => {
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

  renderContent = () => {
    const { loaded, error } = this.props.userProfile;

    if (loaded) {
      return <Routes />;
    } else if (error !== null) {

      const actions = [
        <Button key="retry_profile" variant="contained" color="primary" onClick={this.handleFetchUserProfile}>
          Re-Try
        </Button>
      ];

      return <Error503 errors={error} actions={actions} />;
    }
  };

  render() {
    const { navigationDrawer, userProfile, applicationLoader, classes } = this.props;
    const { title, active, links } = this.props.navigationMenu;
    const drawerOpen = userProfile.loaded && navigationDrawer.open;

    return (
      <React.Fragment>
        <Helmet>
          <title>
            {title
              ? `${title} | ${config.APPLICATION.NAME}`
              : config.APPLICATION.NAME}
          </title>
        </Helmet>
        <div className={classes.root}>
          <CssBaseline />
          <ApplicationBar
            userProfile={userProfile}
            title={title}
            drawerOpen={drawerOpen}
            handleToggleDrawer={this.handleToggleDrawer}
          />
          <Navigation
            links={links}
            activeLink={active}
            navigationDrawer={navigationDrawer}
            drawerOpen={drawerOpen}
            handleNavigationMenuItemClick={this.handleNavigationMenuItemClick}
            handleToggleDrawer={this.handleToggleDrawer} />

          <div className={classNames(classes.container, { [classes.containerShift]: drawerOpen })}>
            <ApplicationLoadingBar applicationLoader={applicationLoader} />
            <div className={classes.content}>
              {this.renderContent()}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    navigationMenu: state.navigation.menu,
    navigationDrawer: state.navigation.drawer,
    userProfile: state.user.profile,
    applicationLoader: state.application.loader
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