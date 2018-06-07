import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Notification } from 'components/notifications';
import { ErrorMessage } from './ErrorMessage';

export const ErrorContainer = ({ title = null, errors = null, classes, children }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={8} md={6} lg={4} xl={4}>
        <Notification title={title}>
          {errors ? <ErrorMessage message={errors} /> : children}
        </Notification>
      </Grid>
    </Grid>
  );
};

ErrorContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

