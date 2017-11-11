import React from 'react';
import {Routes} from '../routes';
import { NavigationBar } from '../layout/NavigationBar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import deepOrange from 'material-ui/colors/deepOrange';
import lightBlue from 'material-ui/colors/lightBlue';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: lightBlue
  }
});

export class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <NavigationBar />
        {Routes}
      </MuiThemeProvider>
    );
  }
}
