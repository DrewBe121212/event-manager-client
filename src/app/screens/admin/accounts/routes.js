import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'hoc/Loadable';

const LoadableAdminAccount = Loadable({
  loader: () => import('./AdminAccount')
});

const LoadableAdminAccounts = Loadable({
  loader: () => import('./AdminAccounts')
});

const AdminAccountRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={LoadableAdminAccounts} />
    <Route exact path={`${match.path}/new`} component={LoadableAdminAccount} />
    <Route exact path={`${match.path}/:id`} component={LoadableAdminAccount} />
  </Switch>
);

AdminAccountRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default AdminAccountRoutes;