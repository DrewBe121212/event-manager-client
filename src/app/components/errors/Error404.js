import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error404 = (props) => (
  <ErrorContainer title="Resource Not Found" {...props}>
    The requested resource could not be found.
  </ErrorContainer>
);
