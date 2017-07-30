import React from 'react';
import {render} from 'react-dom';
import 'babel-polyfill';

class App extends React.Component {
  render () {
    const message = 'Hello World! From React';
    return <p>{message}</p>;
  }
}

render(<App/>, document.getElementById('app'));
