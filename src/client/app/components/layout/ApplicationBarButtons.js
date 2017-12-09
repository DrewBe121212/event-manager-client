import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';

class ApplicationBarButtonsComponent extends React.Component {

  navbarButtons = () => {
    const buttons = [];

    buttons.push({
      key: 'daily-schedule',
      url: '/',
      label: 'Daily Schedule'
    });

    buttons.push({
      key: 'reports',
      url: '/hello-world',
      label: 'Reports'
    });

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

export {ApplicationBarButtonsComponent as ApplicationBarButtons};
