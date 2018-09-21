import React from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'components/notifications';
import { ErrorMessage } from './ErrorMessage';

export const Error = ({ title = null, errors = null, actions = null, children, ...other }) => {
  return (
    <Notification title={title} actions={actions} {...other}>
      {errors ? <ErrorMessage message={errors} /> : children}
    </Notification>
  );
};

Error.propTypes = {
  title: PropTypes.string,
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  actions: PropTypes.array,
  children: PropTypes.node
};

