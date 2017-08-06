import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Home} from './Home';
import {HelloWorld} from './HelloWorld';

export class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path = '/' component={Home} />
        <Route path='/hello-world' component={HelloWorld} />
      </Switch>
    );
  }
}
