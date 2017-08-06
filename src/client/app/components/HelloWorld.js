import React from 'react';
import {Link} from 'react-router-dom';

const initialState = {
  message: "Default Message"
};

export class HelloWorld extends React.Component {

  constructor(props) {
    super(props)

    this.state = Object.assign(initialState, props);

  }

  render () {
    return (
      <p>
        <span>{this.state.message}</span>
        <Link to='/'>Home</Link>
      </p>
    );
  }
}
