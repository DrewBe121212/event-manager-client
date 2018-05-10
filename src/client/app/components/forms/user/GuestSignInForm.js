import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class Form extends React.PureComponent {
  static propTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    authenticateUser: PropTypes.func.isRequired
  };

  render() {
    const { values, errors, handleChange, handleSubmit, isSubmitting, handleCancel } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField name="username" id="username" label="Username" value={values.username} onChange={handleChange} error={errors.username ? true : false} helperText={errors.username} fullWidth={true} required={true} autoFocus={true} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="password" id="password" label="Password" type="password" value={values.password} onChange={handleChange} error={errors.password ? true : false} helperText={errors.password} fullWidth={true} required={true} />
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

export const GuestSignInForm = withFormik({
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: (props) => ({
    username: '',
    password: ''
  }),
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const { authenticateUser } = props;
    
    authenticateUser(values.username, values.password)
      .finally(() => {
        setSubmitting(false);
      });

  }
})(Form);
