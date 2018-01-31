import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';

import {withAuthorization} from 'utils/abilities';
import {setMenuTitle} from 'actions/navigation';

const styles = () => ({
  root: {

  }
});

class DailyScheduleComponent extends React.Component {

  static authorize = 'daily_schedule';

  static propTypes = {
    classes: PropTypes.object.isRequired,
    setMenuTitle: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.setMenuTitle('Daily Schedule');
  }

  render() {
    return 'Daily Schedule';
  }

}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setMenuTitle: setMenuTitle
};

const DailySchedule = compose(
  withAuthorization,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(DailyScheduleComponent);

export {DailySchedule};
