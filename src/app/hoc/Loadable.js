import React from 'react';
import PropTypes from 'prop-types';
import ReactLoadable from 'react-loadable';
import Button from '@material-ui/core/Button';
import { Error404, Error408 } from 'components/errors';

const Loading = ({retry, error, timedOut}) => {
  const actions = [
    <Button key="loadable-retry" variant="contained" color="primary" onClick={retry}>
      Re-Try
    </Button>
  ];

  if (error) {
    return <Error404 errors="The Resource needed failed to load." actions={actions} />;
  } else if (timedOut) {
    return <Error408 actions={actions} />;
  } 

  return null;
};

const Loadable = (options) => ReactLoadable({
  loading: Loading,
  delay: 250,
  timeout: 30000,
  ...options
});

Loading.propTypes = {
  retry: PropTypes.func.isRequired,
  error: PropTypes.string,
  timedOut: PropTypes.bool.isRequired
};

export default Loadable;