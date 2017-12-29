import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {DailySchedule} from 'containers/pages/DailySchedule';
import {User} from 'containers/pages/user';

const Routes = (
  <Switch>
    <Route exact path='/' component={DailySchedule} />
    <Route path='/user' component={User} />
    <Route path='*' component={DailySchedule} />
  </Switch>
);

export {Routes};
