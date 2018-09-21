import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const sizeStyle = (size, width, theme) => ({
  [`${size}Layout`]: {
    [theme.breakpoints.up(width + theme.spacing.unit * 2 * 2)]: {
      width,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  [`${size}Paper`]: {
    [theme.breakpoints.up(width + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 3
    }
  }
});

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2
  },
  ...sizeStyle('xs', 250, theme),
  ...sizeStyle('sm', 400, theme),
  ...sizeStyle('md', 600, theme),
  ...sizeStyle('lg', 800, theme),
  ...sizeStyle('xl', 1000, theme)
});

const HeroPaper = ({ title, size, classes, className, children }) => {
  const sizeLayout = `${size}Layout`;
  const sizePaper = `${size}Paper`;

  return (
    <div className={classNames(classes.layout, classes[sizeLayout])}>
      <Paper className={classNames(classes.paper, classes[sizePaper], className)}>
        {title &&
          <Typography variant="title" color="inherit" noWrap>
            {title}
          </Typography>
        }
        {children}
      </Paper>
    </div>
  );
};

HeroPaper.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

HeroPaper.defaultProps = {
  size: 'md',
  className: null
};

export default withStyles(styles)(HeroPaper);

