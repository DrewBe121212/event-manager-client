import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeroPaper from 'components/layout/HeroPaper';
import { Error } from 'components/errors';

let authenticateUserRequest;

class GuestSignInForm extends React.PureComponent {
  static propTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { setErrors } = this.props;
    const { errors } = this.props.userAuthentication;

    if (prevProps.userAuthentication.errors !== errors) {
      const fieldErrors = errors.fields || {};

      setErrors(fieldErrors);
    }
  }

  componentWillUnmount() {
    if (this.props.userAuthentication.authenticating) {
      authenticateUserRequest.cancel();
    }
  }

  render() {
    const { userAuthentication, values, errors, handleChange, handleSubmit, isSubmitting, handleCancel } = this.props;

    return (
      <React.Fragment>
        {
          userAuthentication.errors.error
            ? <Error variant="alert" errors={userAuthentication.errors.error} size="sm" />
            : null
        }
        <HeroPaper>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField name="username" id="username" label="Username" value={values.username} onChange={handleChange} error={errors.hasOwnProperty('username')} helperText={errors.username} disabled={isSubmitting} fullWidth={true} required={true} autoFocus={true} />
              </Grid>
              <Grid item xs={12}>
                <TextField type="password" name="password" id="password" label="Password" value={values.password} onChange={handleChange} error={errors.hasOwnProperty('password')} helperText={errors.password} disabled={isSubmitting} fullWidth={true} required={true} />
              </Grid>
            </Grid>
            <div className="action-bar">
              <Button variant="outlined" size="small" onClick={handleCancel}>
                cancel
              </Button>
              <Button variant="contained" size="small" color="secondary">
                Forgot Password
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Login
              </Button>
            </div>
          </form>
        </HeroPaper>
      </React.Fragment>
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
    authenticateUserRequest = authenticateUser(values.username, values.password);

    authenticateUserRequest.promise
      .catch(() => {

      })
      .finally(() => {
        setFieldValue('password', '');
        setSubmitting(false);
      });

  }
})(GuestSignInForm);
