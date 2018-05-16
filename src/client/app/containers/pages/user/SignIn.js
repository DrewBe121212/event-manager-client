import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import { CSSTransition } from 'react-transition-group';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { authenticateUser } from 'actions/user';
import { GuestSignInForm, GuestSignInOptions } from 'components/forms/user';
import withNavigationAuthorization from 'components/withNavigationAuthorization';

const styles = (theme) => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class SignInComponent extends React.PureComponent {
  static propTypes = {
    userAuthentication: PropTypes.object.isRequired,
    authenticateUser: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    guestLogin: false,
    fadeIn: false
  };

  resetFadeIn = () => {
    this.setState({
      fadeIn: false
    });
  }

  SSOLogin = () => {
    alert('redirect to shiboleth');
  }

  guestLogin = () => {
    this.setState({
      guestLogin: true,
      fadeIn: true
    });
  }

  cancelGuestLogin = () => {
    this.setState({
      guestLogin: false,
      fadeIn: true
    });
  }

  render() {
    const { userAuthentication, authenticateUser, classes } = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Paper className={classes.paper} >
            <CSSTransition in={this.state.fadeIn} classNames="fade" timeout={1000} exit={false} onEntered={this.resetFadeIn}>
              <div>
                {this.state.guestLogin ?
                  <GuestSignInForm
                    userAuthentication={userAuthentication}
                    authenticateUser={authenticateUser}
                    handleCancel={this.cancelGuestLogin}
                  />
                  :
                  <GuestSignInOptions
                    SSOLogin={this.SSOLogin}
                    guestLogin={this.guestLogin}
                  />
                }
              </div>
            </CSSTransition>
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

export const SignIn = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withNavigationAuthorization
)(SignInComponent);