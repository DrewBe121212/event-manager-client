import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error401 = (props) => (
  <ErrorContainer title="Unauthorized" {...props}>
    You are not authorized to access this resource.
  </ErrorContainer>
);

