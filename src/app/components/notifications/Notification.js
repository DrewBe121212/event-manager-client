import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import ErrorIcon from '@material-ui/icons/Error';
import HeroPaper from 'components/layout/HeroPaper';

const variants = {
  default: {

  },
  alert: {
    icon: ErrorIcon
  }
};

const styles = (theme) => ({
  iconContainer: {
    alignSelf: 'flex-start'
  },
  contentContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  actionContainer: {
    marginTop: theme.spacing.unit * 2
  },
  actionItems: {
    marginTop: theme.spacing.unit * 1.5
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

const NotificationComponent = ({ variant = 'default', title = null, actions = null, classes, children }) => {
  const variantType = variants[variant];

  return (
    <Fade in={true}>
      <HeroPaper className={classes[variant]}>
        <div className={classes.contentContainer}>
          {variantType && variantType.icon &&
            <div className={classes.iconContainer}>
              {React.createElement(variantType.icon, { className: classes.icon })}
            </div>
          }
          <div>
            {title && <Typography variant="title" color="inherit" noWrap>{title}</Typography>}
            <Typography color="inherit" component="div">
              {children}
            </Typography>
          </div>
        </div>
        {actions && 
          <div className={classes.actionContainer}>
            <Divider />
            <div className={classes.actionItems}>
              {actions}
            </div>
          </div>
        }
      </HeroPaper>
    </Fade>
  );
};

NotificationComponent.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  actions: PropTypes.array,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

export const Notification = withStyles(styles)(NotificationComponent);
