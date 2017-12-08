import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Home} from './components/Home';
import {HelloWorld} from './components/HelloWorld';

const Routes = (
  <Switch>
    <Route exact path = '/' component={Home} />
    <Route path='/hello-world' component={HelloWorld} />
    <Route path="*" component={Home} />
  </Switch>
);

export {Routes};
