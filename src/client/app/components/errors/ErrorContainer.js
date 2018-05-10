import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const ErrorContainerComponent = ({ children, title, classes }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={8} md={6} lg={4} xl={4}>
        <Paper className={classes.paper}>
          {title && <Typography variant="headline" component="h4">{title}</Typography>}
          <Typography component="p">{children}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

ErrorContainerComponent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export const ErrorContainer = withStyles(styles)(ErrorContainerComponent);
