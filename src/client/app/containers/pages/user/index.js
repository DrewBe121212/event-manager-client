import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SignIn } from './SignIn';

export function UserRoute() {
  return (
    <Switch>
      <Route exact path='/user' />
      <Route path='/user/:id' component={SignIn} />
      <Route path='/user/sign-in' component={SignIn} />
      <Route path='/user/*' />
    </Switch>
  );
}
