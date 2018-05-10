import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error401 = () => (
  <ErrorContainer title="Error 401">
    You are not authorized to access this resource.
  </ErrorContainer>
);