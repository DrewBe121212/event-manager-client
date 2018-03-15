import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Error403} from 'components/errors';
import {hasAbility} from './abilities';

const withAuthorization = (Component) => {

  class AuthorizationComponent extends React.Component {

    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      authorization: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired
    };

    constructor(props) { 
      super(props);

      this.state = {
        authorized: false
      };
    }

    getComponentAuthorize = () => {
      return Component.authorize;
    }

    getAuthorize = () => {
      const authorize = this.getComponentAuthorize();

      let authorizedAbility = {
        action: 'view',
        object: null
      };

      if (typeof authorize === 'string') {
        authorizedAbility.object = authorize;
      } else if (authorizedAbility === Object(authorizedAbility) && authorizedAbility.hasOwnProperty('action') && authorizedAbility.hasOwnProperty('object')) {
        authorizedAbility = {...authorize};
      }

      return authorizedAbility;
    }

    componentWillMount() {
      const authorize = this.getAuthorize();

      if (hasAbility(authorize.action, authorize.object)) {
        this.setState({
          authorized: true
        });
      }
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
