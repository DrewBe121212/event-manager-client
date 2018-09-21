
import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import HeroPaper from 'components/layout/HeroPaper';

class RegisterForm extends React.PureComponent {
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
  }

  componentWillUnmount() { }

  render() {
    const { values, errors, handleChange, handleSubmit, isSubmitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <HeroPaper size="lg">
          <Grid container justify="center" spacing={24}>
            <Grid item xs={12}>
              <Typography variant="title" color="textSecondary">
                Personal Information
              </Typography>
            </Grid>
            <Grid item xs={10} sm={4}>
              <TextField
                id="first_name"
                name="first_name"
                label="First Name"
                value={values.first_name}
                onChange={handleChange}
                error={errors.hasOwnProperty('first_name')}
                helperText={errors.first_name}
                disabled={isSubmitting}
                fullWidth
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={10} sm={4}>
              <TextField
                id="middle_name"
                name="middle_name"
                label="Middle Name"
                value={values.middle_name}
                onChange={handleChange}
                error={errors.hasOwnProperty('middle_name')}
                helperText={errors.middle_name}
                disabled={isSubmitting}
                fullWidth
              />
            </Grid>
            <Grid item xs={10} sm={4}>
              <TextField
                id="last_name"
                name="last_name"
                label="Last Name"
                value={values.last_name}
                onChange={handleChange}
                error={errors.hasOwnProperty('last_name')}
                helperText={errors.last_name}
                disabled={isSubmitting}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="title" color="textSecondary">
                Account Information
              </Typography>
            </Grid>
          </Grid>

        </HeroPaper>
      </form >
    );
  }
}



export default withFormik({
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: (props) => ({
    first_name: '',
    last_name: ''
  }),
  handleSubmit: (values, { props, setSubmitting, setFieldValue }) => {


  }
})(RegisterForm);