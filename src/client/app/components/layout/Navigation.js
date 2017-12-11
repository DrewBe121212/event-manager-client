import React from 'react';
import PropTypes from 'prop-types';

class NavigationComponent extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    handleDrawerClose: PropTypes.func.isRequired
  };

}

export {NavigationComponent as navigation};
