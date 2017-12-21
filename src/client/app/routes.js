import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {DailySchedule} from 'containers/pages/DailySchedule';

const Routes = (
  <Switch>
    <Route exact path = '/' component={DailySchedule} />
    <Route path="*" component={DailySchedule} />
  </Switch>
);

export {Routes};
