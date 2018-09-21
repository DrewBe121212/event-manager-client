import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import { pundit } from 'libs/pundit';
import { setAppLoading } from 'actions/application';
import { setMenuActive } from 'actions/navigation';
import { Error401, Error404 } from 'components/errors';

const withNavigationAuthorization = (WrappedComponent) => {
  class withNavigationAuthorizationComponent extends React.PureComponent {
    static propTypes = {
      match: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      navigationMenu: PropTypes.object.isRequired,
      userAuthenticated: PropTypes.bool.isRequired,
      setMenuActive: PropTypes.func.isRequired,
      setAppLoading: PropTypes.func.isRequired
    };

    state = {
      authorized: false,
      validMenu: false
    };

    componentDidMount() {
      const { setMenuActive, userAuthenticated, match, history } = this.props;
      const signInPath = '/user/sign-in';
      const menu = this.getActiveMenu(match.path);
      let authorized = false;
      let validMenu = false;

      if (menu) {
        validMenu = true;
        if (menu.authorize_perform && menu.authorize_on) {
          //authorized = pundit[menu.authorize_on.concat('Policy')](menu.authorize_perform);
          authorized = pundit.authorize(menu.authorize_on, menu.authorize_perform);
        } else {
          // if its a valid menu, and it has no can permissions on it,
          // go ahead and let user through
          authorized = true;
        }
      }
      
      this.setState({
        authorized,
        validMenu
      }, () => {
        if (this.state.validMenu) {
          if (userAuthenticated && match.path === signInPath) {
            history.push('/');
          } else if (!userAuthenticated && !this.state.authorized && match.path !== signInPath) {
            history.push(signInPath);
          } else if (menu) {
            setMenuActive(menu.id, menu.title);
          }
        }
      });
    }

    getActiveMenu = (pathname) => {
      const { menus, mapping } = this.props.navigationMenu;
      const menu_map = mapping[pathname];
      let menu = null;

      if (menu_map) {
        menu_map.split(':').forEach((menuIndex, index) => {
          if (index === 0) {
            menu = menus[menuIndex];
          } else {
            menu = menu.children[menuIndex];
          }
        });
      }
  
      return menu;
    }

    render() {
      const { navigationMenu, userAuthenticated, setMenuActive, ...other } = this.props;
      const { authorized, validMenu } = this.state;

      if (authorized) {
        return (
          <Fade in>
            <div>
              <WrappedComponent {...other} />
            </div>
          </Fade>
        );
      } else if (!validMenu) {
        return <Error404 />;
      } else {
        return <Error401 />;
      }
    }
  }

  const mapStateToProps = (state) => ({
    userAuthenticated: state.user.authentication.authenticated,
    navigationMenu: state.navigation.menu
  });
  
  const mapDispatchToProps = {
    setMenuActive,
    setAppLoading
  };
  
  return connect(mapStateToProps, mapDispatchToProps)(withNavigationAuthorizationComponent);  
};

export default withNavigationAuthorization;
