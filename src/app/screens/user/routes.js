import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Register from './register/Register';
import GuestSignIn from './signin/GuestSignIn';

const UserRoutes = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/register`} component={Register} />
    <Route path={`${match.path}/sign-in`} component={GuestSignIn} />
  </Switch>
);

UserRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserRoutes;