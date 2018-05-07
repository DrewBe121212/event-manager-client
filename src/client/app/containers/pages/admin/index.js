import React from 'react';
import { Switch, Route } from 'react-router-dom';

export function UserRoute() {
  return (
    <Switch>
      <Route path='/admin/users' />
      <Route path='/admin/*' />
    </Switch>
  );
}
