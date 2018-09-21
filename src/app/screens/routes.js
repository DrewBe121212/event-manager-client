import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Error404 } from 'components/errors/Error404';
import UserRoutes from './user/routes';
import AdminRoutes from './admin/routes';

const Routes = () => (
  <Switch>
    <Route exact path='/' render={() => 'home'} />
    <Route path='/admin' component={AdminRoutes} />
    <Route path='/user' component={UserRoutes} />
    <Route path='*' component={Error404} />
  </Switch>
);

export default Routes;
