import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

export class ApplicationBarButtons extends React.Component {

  navbarButtons = () => {
    const buttons = [];

    return buttons;
  }

  render() {
    return this.navbarButtons().map((button) => {
      return (
        <Link to={button.url} key={button.key}>
          <Button color="contrast">{button.label}</Button>
        </Link>
      );
    });

  }

}