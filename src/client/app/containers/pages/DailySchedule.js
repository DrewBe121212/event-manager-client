import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';

import {setMenuTitle} from 'actions/navigation';

const styles = () => ({
  root: {

  }
});

class DailyScheduleComponent extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    setMenuTitle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    props.setMenuTitle('Daily Schedule');
  }

  render() {
    return 'Daily Schedule';
  }

}

const mapStateToProps = (state) => {
  return {};
};

const mapActionsToProps = {
  setMenuTitle: setMenuTitle
};

const DailySchedule = compose(
  withStyles(styles),
  connect(mapStateToProps, mapActionsToProps)
)(DailyScheduleComponent);

export {DailySchedule};
