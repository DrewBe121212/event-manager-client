import React from 'react';
import Paper from 'material-ui/Paper';

import {Routes} from '../routes';
import {NavigationBar} from './layout/NavigationBar';

class App extends React.Component {
  render () {
    return (
      <div>
        <NavigationBar />
        <br/><br/><br/>
        <Paper>
          {Routes}
        </Paper>

      </div>
    );
  }
}

export {App};
