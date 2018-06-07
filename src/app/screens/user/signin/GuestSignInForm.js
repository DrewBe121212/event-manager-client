import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class GuestSignInForm extends React.PureComponent {
  static propTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    userAuthentication: PropTypes.object.isRequired,
    authenticateUser: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { setErrors } = this.props;
    const { errors } = this.props.userAuthentication;

    if (prevProps.userAuthentication.errors !== errors) {
      const fieldErrors = errors.fields || {};

      setErrors(fieldErrors);
    }
  }

  render() {
    const { values, errors, handleChange, handleSubmit, isSubmitting, handleCancel } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField margin="normal" name="username" id="username" label="Username" value={values.username} onChange={handleChange} error={errors.hasOwnProperty('username')} helperText={errors.username} disabled={isSubmitting} fullWidth={true} required={true} autoFocus={true} />
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" margin="normal" name="password" id="password" label="Password" value={values.password} onChange={handleChange} error={errors.hasOwnProperty('password')} helperText={errors.password} disabled={isSubmitting} fullWidth={true} required={true} />
          </Grid>
        </Grid>
        <div className="action-bar">
          <Button onClick={handleCancel}>
            cancel
          </Button>
          <Button color="secondary">
            Forgot Password
          </Button>
          <Button variant="raised" color="primary" disabled={isSubmitting} onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </form>

    );
  }
}

export default withFormik({
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: (props) => ({
    username: '',
    password: ''
  }),
  handleSubmit: (values, { props, setSubmitting, setFieldValue }) => {
    const { authenticateUser } = props;

    authenticateUser(values.username, values.password)
      .finally(() => {
        setFieldValue('password', '');
        setSubmitting(false);
      });

  }
})(GuestSignInForm);
