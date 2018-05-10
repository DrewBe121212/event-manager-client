import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';

const initialState = {
  active: 0,
  completed: 0,
  progress: 0,
  maxCount: 0,
  buffer: 0,
  time: 0
};

class ApplicationLoadingBar extends React.PureComponent {
  static propTypes = {
    applicationLoader: PropTypes.object.isRequired,
    timeConstant: PropTypes.number.isRequired,
    frequency: PropTypes.number.isRequired,
    timeout: PropTypes.number.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { active } = nextProps.applicationLoader;

    if (active !== prevState.active) {
      let state = Object.assign({}, prevState);

      if (active <= 0) {
        state = Object.assign({}, initialState);
      } else {
        state.active = active;

        if (state.active > prevState.active) {
          if (state.active > state.maxCount) {
            state.maxCount = state.active;
          }
        } else if (state.active < prevState.active) {
          state.completed = state.completed + (prevState.active - state.active);
        }

      }
      return state;
    }
    return null;
  }

  static defaultProps = {
    timeConstant: 5000,
    frequency: 500,
    timeout: 30000
  };

  state = initialState;

  componentDidUpdate(prevProps, prevState) {
    const { frequency } = this.props;
    const { active } = this.state;

    if (prevState.active === 0 && active > prevState.active) {
      this.progress();

      this.timer = setInterval(this.progress, frequency);
    } else if (prevState.active > 0 && active === 0) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer = null;

  progress = () => {
    const { timeConstant, frequency } = this.props;
    const { time } = this.state;
    const newTime = time + frequency;
    let newProgress = (1 - Math.exp(-1 * newTime / timeConstant)) * 100;
    let newBuffer = newProgress + Math.random() * 10;

    if (newProgress > 100) {
      newProgress = 100;
    }

    if (newBuffer > 100) {
      newBuffer = 100;
    }

    if (time >= this.props.timeout) {
      this.setState(initialState);
      clearInterval(this.timer);
    } else {
      this.setState({
        progress: newProgress,
        buffer: newBuffer,
        time: newTime
      });
    }
  };

  render() {
    const { active, progress, buffer } = this.state;

    return (
      <LinearProgress
        variant={active > 0 ? 'buffer' : 'determinate'}
        value={progress}
        valueBuffer={buffer}
      />
    );
  }
}

export default ApplicationLoadingBar;