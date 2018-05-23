import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'hoc/Loadable';

const LoadableSignInRoutes = Loadable({
  loader: () => import('./signin/routes')
});

const UserRoutes = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/sign-in`} component={LoadableSignInRoutes} />
  </Switch>
);

UserRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserRoutes;