import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {App} from './components/App';

import {store, history} from './store';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import deepOrange from 'material-ui/colors/deepOrange';
import lightBlue from 'material-ui/colors/lightBlue'; 

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: lightBlue
  }
});

render(
  (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <App/>
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>
  ), document.getElementById('app'));
