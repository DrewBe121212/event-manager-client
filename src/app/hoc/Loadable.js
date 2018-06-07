import React from 'react';
import ReactLoadable from 'react-loadable';
import Button from '@material-ui/core/Button';
import { Error404, Error408 } from 'components/errors';

const Loading = (props) => {

  const actions = [
    <Button variant="raised" color="primary" onClick={props.retry}>
      Re-Try
    </Button>
  ];

  if (props.error) {
    return <Error404 errors="The Resource needed failed to load." actions={actions} />;
  } else if (props.timedOut) {
    return <Error408 actions={actions} />;
  } 

  return null;
}

const Loadable = (options) => ReactLoadable({
  loading: Loading,
  delay: 200,
  timeout: 30000,
  ...options
});

export default Loadable;