import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { SignIn } from './SignIn';

const UserRoutes = ({match}) => (
  <Switch>
    <Route path={`${match.path}/sign-in`} component={SignIn} />
  </Switch>
);

UserRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserRoutes;