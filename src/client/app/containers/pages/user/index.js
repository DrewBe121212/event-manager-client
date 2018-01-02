import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {SignIn} from './SignIn';

function User() {
  return (
    <Switch>
      <Route exact path='/user' />
      <Route path='/user/sign-in' component={SignIn} />
      <Route path='/user/*' />
    </Switch>
  );
}

export {User};