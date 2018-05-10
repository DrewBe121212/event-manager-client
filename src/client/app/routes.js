import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DailySchedule } from 'containers/pages/DailySchedule';
import { Error404 } from 'components/errors/Error404';
import UserRoutes from 'containers/pages/user';
import AdminRoutes from 'containers/pages/admin';

const Routes = () => (
  <Switch>
    <Route exact path='/daily-schedule' component={DailySchedule} />
    <Route path='/admin' component={AdminRoutes} />
    <Route path='/user' component={UserRoutes} />
    <Route path='*' component={Error404} />
  </Switch>
);

export default Routes;
