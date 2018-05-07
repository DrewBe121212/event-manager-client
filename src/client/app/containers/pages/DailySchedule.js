import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

class DailyScheduleComponent extends React.PureComponent {
  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  render() {
    return 'Daily Schedule';
  }

}

const mapStateToProps = (state) => ({});

export const DailySchedule = compose(
  connect(mapStateToProps)
)(DailyScheduleComponent);
