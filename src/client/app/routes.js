import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {DailySchedule} from 'containers/pages/DailySchedule';
import {User} from 'containers/pages/user';
import {Error404} from 'components/errors/Error404';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={DailySchedule} />
    <Route path='/user' component={User} />
    <Route path='*' component={Error404} />
  </Switch>
);

export {Routes};
