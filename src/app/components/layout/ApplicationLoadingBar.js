import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

class ApplicationLoadingBar extends React.PureComponent {
  static propTypes = {
    applicationLoader: PropTypes.object.isRequired
  };

  render() {
    const { loading } = this.props.applicationLoader;

    return (
      <LinearProgress
        variant={loading > 0 ? 'indeterminate' : 'determinate'}
        value={0}
      />
    );
  }
}

export default ApplicationLoadingBar;