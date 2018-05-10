import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import { hasAbility } from 'libs/abilities';
import ApplicationLoadingBar from 'components/layout/ApplicationLoadingBar';
import ApplicationBar from 'components/layout/ApplicationBar';
import Navigation from 'components/layout/Navigation';
import { Error401, Error503 } from 'components/errors';
import { toggleDrawer, toggleDrawerMenu, setMenuTitle, setMenuActive } from 'actions/navigation';
import { fetchUserProfile } from 'actions/user';
import { Routes } from 'routes';

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

class ApplicationComponent extends React.PureComponent {
  static propTypes = {
    navigationMenu: PropTypes.object.isRequired,
    navigationDrawer: PropTypes.object.isRequired,
    applicationLoader: PropTypes.object.isRequired,
    userProfile: PropTypes.object.isRequired,
    userAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    toggleDrawerMenu: PropTypes.func.isRequired,
    setMenuTitle: PropTypes.func.isRequired,
    setMenuActive: PropTypes.func.isRequired,
    fetchUserProfile: PropTypes.func.isRequired
  };

  state = {
    authorized: false,
    validLink: false
  };

  componentDidMount = () => {
    const { fetchUserProfile } = this.props;

    fetchUserProfile();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.userProfile.loaded !== this.props.userProfile.loaded && this.props.userProfile.loaded) {
      this.handleLocationChange(this.props.location.pathname);

      this.props.history.listen((location, history) => {
        this.handleLocationChange(location.pathname);
      });
    }
  }

  getActiveLink = (pathname) => {
    const { links, links_mapping } = this.props.navigationMenu;
    const link_map = links_mapping[pathname].split(':');
    let link = null;

    if (link_map) {
      link_map.forEach((linkIndex, index) => {
        if (index === 0) {
          link = links[linkIndex];
        } else {
          link = link.nested_links[linkIndex];
        }
      });
    }

    return link;
  }

  handleLocationChange = (pathname) => {
    const { setMenuTitle, setMenuActive, userAuthenticated, location, history } = this.props;
    const signInPath = '/user/sign-in';
    const link = this.getActiveLink(pathname);
    let authorized = false;
    let validLink = false;

    if (link) {
      validLink = true;
      if (link.can && link.can.perform && link.can.on) {
        authorized = hasAbility(link.can.perform, link.can.on);
      }
    } 

    this.setState({
      authorized,
      validLink
    }, () => {
      if (this.state.validLink) {
        if (userAuthenticated && location.pathname === signInPath) {
          history.push('/');
        } else if (!userAuthenticated && !this.state.authorized && location.pathName !== signInPath) {
          history.push(signInPath);
        } else if (link) {
          if (link.full_title && link.full_title.length > 0) {
            const full_title = [
              ...link.full_title
            ];

            if (full_title.length === 1) {
              setMenuTitle(full_title.toString());
            } else {
              const endTitle = full_title.splice(-1, 1).toString();
              setMenuTitle(full_title.join(' - ').concat(`: ${endTitle}`));
            }
          }

          setMenuActive(link.active);
        }
      }
    });
  }

  handleNavigationMenuItemClick = (link) => {
    const { location, history } = this.props;

    if (link.url && link.url.length > 0 && link.url !== location.pathname) {
      history.push(link.url);
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
    const { validLink, authorized } = this.state;

    if (loaded) {
      // We let !validLink through to routes incase its an invalid path
      // Routes handle the 404. 
      if (authorized || !validLink) {
        return <Routes />;
      } else {
        return <Error401 />;
      }
    } else if (errors !== null) {
      return <Error503 />;
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
    userProfile: state.user.profile,
    userAuthenticated: state.user.authentication.authenticated
  };
};

const mapDispatchToProps = {
  toggleDrawer,
  toggleDrawerMenu,
  setMenuTitle,
  setMenuActive,
  fetchUserProfile
};

const Application = withRouter(
  compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
  )(ApplicationComponent)
);

export { Application };
