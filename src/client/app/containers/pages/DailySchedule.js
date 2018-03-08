import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from 'material-ui/styles';

import {withAuthorization} from 'libs/abilities';
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

  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

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
  withStyles(styles),
  withAuthorization,
  connect(mapStateToProps, mapDispatchToProps)
)(DailyScheduleComponent);

export {DailySchedule};
