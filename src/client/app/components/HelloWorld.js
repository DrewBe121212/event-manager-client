import React from 'react';
import {Link} from 'react-router-dom';

export class HelloWorld extends React.Component {

  static defaultProps = {
    message: 'Default Messagse...'
  };

  constructor(props) {
    super(props);

    this.state = Object.assign({}, props);
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
