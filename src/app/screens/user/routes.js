import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'hoc/Loadable';

const LoadableSignIn = Loadable({
  loader: () => import('./signin/SignIn')
});

const UserRoutes = ({match}) => (
  <Switch>
    <Route path={`${match.path}/sign-in`} component={LoadableSignIn} />
  </Switch>
);

UserRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserRoutes;