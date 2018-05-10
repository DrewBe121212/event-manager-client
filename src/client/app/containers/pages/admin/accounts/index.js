import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

const AdminAccountRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}/`} />
    <Route exact path={`${match.path}/new`} />
    <Route exact path={`${match.path}/:id`} />
  </Switch>
);

AdminAccountRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default AdminAccountRoutes;