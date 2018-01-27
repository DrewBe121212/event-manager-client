import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';

import {hasAbility} from 'utils/abilities';
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

    if (!hasAbility('view', 'daily_schedule')) {
      console.log('does not have access');
    } else {
      console.log('has access');
    }

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
