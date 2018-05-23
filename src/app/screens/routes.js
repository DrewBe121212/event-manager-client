import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'hoc/Loadable';
import { Error404 } from 'components/errors/Error404';

const LoadableDailySchedule = Loadable({
  loader: () => import('./dailyschedule/DailySchedule')
});

const LoadableUserRoutes = Loadable({
  loader: () => import('./user/routes')
});

const LoadableAdminRoutes = Loadable({
  loader: () => import('./admin/routes')
});

const Routes = () => (
  <Switch>
    <Route exact path='/daily-schedule' component={LoadableDailySchedule} />
    <Route path='/admin' component={LoadableAdminRoutes} />
    <Route path='/user' component={LoadableUserRoutes} />
    <Route path='*' component={Error404} />
  </Switch>
);

export default Routes;
