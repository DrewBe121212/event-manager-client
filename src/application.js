import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ApplicationRoot from 'screens/ApplicationRoot';
import { store, history, persistor } from 'store';

/* Application style sheets */
import 'css/application.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4b85a8'
    },
    secondary: {
      main: '#d98100',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#a83a01'
    }
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif'
  },
  drawer: {
    width: 240
  }
});

render(
  (
    //<React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MuiThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <ApplicationRoot />
            </ConnectedRouter>
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
    //</React.StrictMode>
  ), document.getElementById('app'));
