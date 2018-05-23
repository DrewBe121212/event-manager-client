import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withNavigationAuthorization from 'hoc/withNavigationAuthorization';

class DailySchedule extends React.PureComponent {
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

export default compose(
  connect(mapStateToProps),
  withNavigationAuthorization,
)(DailySchedule);
