import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { authenticateUser } from 'actions/user';
import GuestSignInForm from './GuestSignInForm';
import withNavigationAuthorization from 'hoc/withNavigationAuthorization';

const styles = (theme) => ({
  paper: theme.mixins.gutters({
    paddingTop: 5,
    paddingBottom: 5
  })
});

class SignIn extends React.PureComponent {
  static propTypes = {
    userAuthentication: PropTypes.object.isRequired,
    authenticateUser: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    guestLogin: false
  };

  handleCancel = () => {
    const { history, location } = this.props;
    const currentLocation = location.pathname.split('/');

    if (currentLocation.length > 1) {
      currentLocation.pop();
    }
    console.log(currentLocation, currentLocation.join('/'));
    history.push(currentLocation.join('/'));
    
  }

  render() {
    const { userAuthentication, authenticateUser, classes } = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Paper className={classes.paper} >
            <GuestSignInForm
              userAuthentication={userAuthentication}
              authenticateUser={authenticateUser}
              handleCancel={this.handleCancel}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  userAuthentication: state.user.authentication
});

const mapDispatchToProps = {
  authenticateUser
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withNavigationAuthorization
)(SignIn);