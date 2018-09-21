import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

class ApplicationLoadingBar extends React.PureComponent {
  static propTypes = {
    applicationLoader: PropTypes.object.isRequired,
    delay: PropTypes.number.isRequired
  };

  static defaultProps = {
    delay: 250
  };

  state = {
    active: false,
    pastDelay: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.applicationLoader.loading !== prevState.active) {
      return {
        active: nextProps.applicationLoader.loading ? true : false,
        pastDelay: false
      };
    }
    return null;
  }

  componentDidUpdate() {
    const { applicationLoader, delay } = this.props;
    const { loading } = applicationLoader;

    if (loading) {
      this._delay = setTimeout(() => {
        this.setState({
          pastDelay: true
        });
      }, delay);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._delay);
  }

  render() {
    const { active, pastDelay } = this.state;

    return (
      <LinearProgress
        variant={active && pastDelay ? 'indeterminate' : 'determinate'}
        value={0}
      />
    );
  }
}

export default ApplicationLoadingBar;