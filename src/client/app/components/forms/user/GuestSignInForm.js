import React from 'react';
import PropTypes from 'prop-types';
import {withFormik} from 'formik';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const InnerForm = (props) => {

  const {values, errors, touched, handleChange, handleSubmit, isSubmitting, handleCancel} = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <TextField id="username" label="Username" value={values.username} onChange={handleChange} autoFocus={true} error={touched.username && errors.username ? true : false} helperText={touched.username && errors.username} fullWidth={true} required={true} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="password" id="password" label="Password" onChange={handleChange} value={values.password} error={touched.password && errors.password ? true : false} helperText={touched.password && errors.password} fullWidth={true} required={true} />
        </Grid>
      </Grid>
      <div className="action-bar">
        <Button raised mini onClick={handleCancel}>
            cancel
        </Button>
        <Button raised color="primary" disabled={isSubmitting} onClick={handleSubmit}>
            Login
        </Button>
      </div>
    </form>
  );
};

InnerForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

const GuestSignInForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: (props) => ({
    username: '',
    password: ''
  }),
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
    ) {
      errors.username = 'Invalid username';
    }
    return errors;
  },
  // Submission handler
  handleSubmit: (values, {props, setSubmitting, setErrors}) => {
    alert('form submitted!');
  }
})(InnerForm);

export {GuestSignInForm};
