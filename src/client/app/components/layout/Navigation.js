import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';

class NavigationComponent extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    handleDrawerClose: PropTypes.func.isRequired
  };

}
