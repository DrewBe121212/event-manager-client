import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withNavigationAuthorization from 'components/withNavigationAuthorization';

class DailyScheduleComponent extends React.PureComponent {
  static propTypes = {
    
  };

  state = {
    events: []
  }

  render() {
    return 'Daily Schedule';
  }

}

const mapStateToProps = (state) => ({});

export const DailySchedule = compose(
  connect(mapStateToProps),
  withNavigationAuthorization,
)(DailyScheduleComponent);
