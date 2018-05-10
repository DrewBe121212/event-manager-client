import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Application } from './client/app/containers/Application';
import { store, history, persistor } from './client/app/store';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import lightBlue from 'material-ui/colors/lightBlue';

/* Application style sheets */
import 'css/application.css';
import 'css/transitions.css';

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
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MuiThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <Application />
            </ConnectedRouter>
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  ), document.getElementById('app'));
