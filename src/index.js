import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Application} from './client/app/containers/Application';

import {store, history} from './client/app/store';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import lightBlue from 'material-ui/colors/lightBlue';

import './client/app/assets/css/application.css';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: lightBlue,
    type: 'light'
  },
  drawer: {
    width: 250
  }
});

render(
  (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Application />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>
  ), document.getElementById('app'));
