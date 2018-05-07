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

const styles = (theme) => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class SignInComponent extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      guestLogin: false,
      fadeIn: false
    };
  }

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
    const { classes, authenticateUser } = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Paper className={classes.paper} >
            <CSSTransition in={this.state.fadeIn} classNames="fade" timeout={1000} exit={false} onEntered={this.resetFadeIn}>
              <div>
                {this.state.guestLogin ? 
                  <GuestSignInForm 
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

const mapDispatchToProps = {
  authenticateUser
};

export const SignIn = compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(SignInComponent);