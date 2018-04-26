import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {DailySchedule} from 'containers/pages/DailySchedule';
import {UserRoute} from 'containers/pages/user';
import {Error404} from 'components/errors/Error404';

export const Routes = () => (
  <Switch>
    <Route exact path='/' component={DailySchedule} />
    <Route path='/user' component={UserRoute} />
    <Route path='*' component={Error404} />
  </Switch>
);
