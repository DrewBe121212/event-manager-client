import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error503 = (props) => (
  <ErrorContainer title="Server Unavailable" {...props}>
    The server is not currently available.
  </ErrorContainer>
);
