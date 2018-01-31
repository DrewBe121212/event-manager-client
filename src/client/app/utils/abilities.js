import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Error403} from 'components/errors/Error403';
import {ability} from 'ability';

let abilities = {};

const setAbilitiesFromState = (state) => {

  const {user} = state;
  const {roles} = user;

  abilities = {};

  roles.forEach((role) => {
    ability(role);
  });

  return abilities;
};

const canManage = (also, except) => {
  return [
    'view', 'create', 'update', 'remove'
  ];
};

const setAbility = (objects, actions, can = true) => {

  if (!Array.isArray(objects)) {
    objects = objects.split(',');
  }

  if (!Array.isArray(actions)) {
    actions = actions.split(',');
  }

  objects.forEach((object) => {

    if (typeof abilities[object] === 'undefined') {
      abilities[object] = {};
    }

    actions.forEach((action) => {
      if (typeof abilities[object][action] === 'undefined') {
        abilities[object][action] = can;
      }
    });
  });

};

const getAbilities = () => {
  return {...abilities};
};

const withAuthorization = (Component) => {

  class AuthorizationComponent extends React.Component {

    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired
    };

    hasAbility = (action, object) => {

      if (typeof abilities[object] !== 'undefined' && typeof abilities[object][action] !== 'undefined') {
        return abilities[object][action];
      }

      return false;
    };

    getAuthorize = () => {
      return Component.authorize;
    }

    isAuthorized = () => {
      return typeof this.getAuthorize() !== 'undefined';
    }

    componentWillMount() {
      const {authenticated} = this.props;

      let state = Object.assign({}, {
        authorized: false,
        authenticated
      });

      if (!this.isAuthorized() || this.hasAbility('view', this.getAuthorize())) {
        state.authorized = true;
      }

      this.setState(state);

    }

    componentDidMount() {
      const {history} = this.props;

      if (!this.state.authorized && !this.state.authenticated) {
        history.push('user/sign-in');
      }

    }

    render() {

      if (this.state.authorized) {
        return <Component hasAbility={this.hasAbility} {...this.props} />;
      } else {
        return <Error403 />;
      }

    }

  }

  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  });

  return connect(mapStateToProps)(AuthorizationComponent);

};

export {setAbility, getAbilities, setAbilitiesFromState, withAuthorization};
