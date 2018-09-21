import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { authenticateUser, resetAuthenticateUser } from 'actions/user';
import GuestSignInForm from './GuestSignInForm';
import withNavigationAuthorization from 'hoc/withNavigationAuthorization';

const styles = (theme) => ({});

class SignIn extends React.PureComponent {
  static propTypes = {
    userAuthentication: PropTypes.object.isRequired,
    authenticateUser: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    resetAuthenticateUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
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
    const { userAuthentication, authenticateUser } = this.props;

    return (
      <GuestSignInForm
        userAuthentication={userAuthentication}
        authenticateUser={authenticateUser}
        handleCancel={this.handleCancel}
      />
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