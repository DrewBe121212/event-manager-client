import React from 'react';
import {Link} from 'react-router-dom';

export class Home extends React.Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props)

    this.state = Object.assign({}, props);

  }

  render () {
    return (
      <span>Home Page <Link to='/hello-world'>Hello World</Link></span>

    );
  }
}
