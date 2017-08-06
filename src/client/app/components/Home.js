import React from 'react';
import {Link} from 'react-router-dom';

const initialState = {};

export class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = Object.assign(initialState, props);

  }

  render () {
    return (
      <span>Home Page <Link to='/hello-world'>Hello World</Link></span>

    );
  }
}
