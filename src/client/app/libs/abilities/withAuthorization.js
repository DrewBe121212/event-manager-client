import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Error403} from 'components/errors/Error403';
import {hasAbility} from './abilities';

const withAuthorization = (Component) => {

  class AuthorizationComponent extends React.Component {

    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      authorization: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired
    };

    getAuthorize = () => {
      return Component.authorize;
    }

    isAuthorized = () => {
      const authorize = this.getAuthorize();
      return typeof authorize !== 'undefined' && authorize.length > 0;
    }

    componentWillMount() {

      let state = {
        authorized: false
      };

      if (!this.isAuthorized() || hasAbility('view', this.getAuthorize())) {
        state.authorized = true;
      }

      this.setState(state);

    }

    componentDidMount() {

      const {authenticated, history, location} = this.props;
      const {authorized} = this.state;
      const signInPath = '/user/sign-in';

      if (authenticated) {
        if (location.pathName === signInPath) {
          history.push('/');
        }
      } else if (!authorized && location.pathName !== signInPath) {
        history.push(signInPath);
      }

    }

    render() {

      const {authenticated, authorization, ...other} = this.props;

      if (this.state.authorized) {
        return <Component hasAbility={hasAbility} {...other} />;
      } else {
        return <Error403 />;
      }

    }

  }

  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    authorization: state.user.authorization
  });

  return connect(mapStateToProps)(AuthorizationComponent);

};

export {withAuthorization};
