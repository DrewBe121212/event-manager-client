import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import ErrorIcon from '@material-ui/icons/Error';

const variants = {
  default: {

  },
  alert: {
    icon: ErrorIcon
  }
};

const styles = (theme) => ({
  paper: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center'
  }),
  iconContainer: {
    alignSelf: 'flex-start'
  },
  contentContainer: {

  },
  default: {
    color: theme.palette.grey.A700
  },
  alert: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  },
  icon: {
    fontSize: 30,
    marginRight: 10
  }
});

const NotificationComponent = ({ variant='default', title = null, classes, children }) => {
  const variantType = variants[variant];
  
  return (
    <Fade in={true}>
      <Paper className={classNames(classes.paper, classes[variant])}>
        {variantType && variantType.icon && 
          <div className={classes.iconContainer}>
            {React.createElement(variantType.icon, {className: classes.icon})}
          </div>
        }
        <div className={classes.contentContainer}>
          {title && <Typography color="inherit" variant="headline" component="h4">{title}</Typography>}
          <Typography color="inherit" component="div">
            {children}
          </Typography>
        </div>
      </Paper>
    </Fade>
  );
};

NotificationComponent.propTypes = {
  title: PropTypes.string,
  errors: PropTypes.any,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

export const Notification = withStyles(styles)(NotificationComponent);
