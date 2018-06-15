import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { authenticateUser, resetAuthenticateUser } from 'actions/user';
import GuestSignInForm from './GuestSignInForm';
import withNavigationAuthorization from 'hoc/withNavigationAuthorization';
import { ErrorMessage } from 'components/errors';
import { Notification } from 'components/notifications';

const styles = (theme) => ({
  paper: theme.mixins.gutters({
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  })
});

const gridSizes = {
  xs: 12,
  md: 8,
  lg: 6,
  xl: 4
};

class SignIn extends React.PureComponent {
  static propTypes = {
    userAuthentication: PropTypes.object.isRequired,
    authenticateUser: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

   componentDidMount() {
    const { resetAuthenticateUser } = this.props;
    
    resetAuthenticateUser();
  }

  handleCancel = () => {
    const { history, location } = this.props;
    const currentLocation = location.pathname.split('/');

    if (currentLocation.length > 1) {
      currentLocation.pop();
    }

    history.push(currentLocation.join('/'));
  }

  render() {
    const { userAuthentication, authenticateUser, classes } = this.props;
    const { error } = userAuthentication.errors;

    return (
      <React.Fragment>
        {error &&
          <Grid container justify="center">
            <Grid item {...gridSizes}>
              <Notification variant="alert">
                <ErrorMessage message={error} />
              </Notification>
            </Grid>
          </Grid>
        }
        <Grid container justify="center">
          <Grid item {...gridSizes}>
            <Paper className={classes.paper}>
              <GuestSignInForm
                userAuthentication={userAuthentication}
                authenticateUser={authenticateUser}
                handleCancel={this.handleCancel}
              />
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userAuthentication: state.user.authentication
});

const mapDispatchToProps = {
  authenticateUser,
  resetAuthenticateUser
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withNavigationAuthorization
)(SignIn);