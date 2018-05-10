import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hasAbility } from 'libs/abilities';
import { setMenuTitle, setMenuActive } from 'actions/navigation';
import { Error401 } from 'components/errors';

const withNavigationAuthorization = (WrappedComponent) => {
  class withNavigationAuthorizationComponent extends React.PureComponent {
    static propTypes = {
      match: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      navigationMenu: PropTypes.object.isRequired,
      userAuthenticated: PropTypes.bool.isRequired,
      setMenuTitle: PropTypes.func.isRequired,
      setMenuActive: PropTypes.func.isRequired
    };

    state = {
      authorized: false,
      validLink: false
    };

    componentDidMount() {

      const { setMenuTitle, setMenuActive, userAuthenticated, match, history } = this.props;
      const signInPath = '/user/sign-in';
      const link = this.getActiveLink(match.path);
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
          if (userAuthenticated && match.path === signInPath) {
            history.push('/');
          } else if (!userAuthenticated && !this.state.authorized && match.path !== signInPath) {
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

    getActiveLink = (pathname) => {
      const { links, links_mapping } = this.props.navigationMenu;
      const link_map = links_mapping[pathname];
      let link = null;
  
      if (link_map) {
        link_map.split(':').forEach((linkIndex, index) => {
          if (index === 0) {
            link = links[linkIndex];
          } else {
            link = link.nested_links[linkIndex];
          }
        });
      }
  
      return link;
    }

    render() {
      const { navigationMenu, userAuthenticated, setMenuTitle, setMenuActive, ...other } = this.props;
      const { authorized, validLink } = this.state;
      if (authorized || !validLink) {
        return <WrappedComponent {...other} />;
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
    setMenuTitle,
    setMenuActive
  };
  
  return connect(mapStateToProps, mapDispatchToProps)(withNavigationAuthorizationComponent);  
};

export default withNavigationAuthorization;
