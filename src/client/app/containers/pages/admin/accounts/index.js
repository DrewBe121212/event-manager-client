import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AdminAccount from './AdminAccount';
import AdminAccounts from './AdminAccounts';

const AdminAccountRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}/`} component={AdminAccounts} />
    <Route exact path={`${match.path}/new`} component={AdminAccount} />
    <Route exact path={`${match.path}/:id`} component={AdminAccount} />
  </Switch>
);

AdminAccountRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default AdminAccountRoutes;