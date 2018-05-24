import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'hoc/Loadable';

const LoadableSignIn = Loadable({
  loader: () => import('./SignIn')
});

const LoadableGuestSignIn = Loadable({
  loader: () => import('./GuestSignIn')
});

const UserSignInRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={LoadableSignIn} />
    <Route exact path={`${match.path}/guest`} component={LoadableGuestSignIn} />
  </Switch>
);

UserSignInRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserSignInRoutes;

