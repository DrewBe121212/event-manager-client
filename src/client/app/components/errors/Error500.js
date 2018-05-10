import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error500 = () => (
  <ErrorContainer title="Error 500">
    Whoops. Something went wrong while processing your request.
  </ErrorContainer>
);