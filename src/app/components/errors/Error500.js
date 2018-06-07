import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error500 = (props) => (
  <ErrorContainer title="Internal Server Error" {...props}>
    Whoops. Something went wrong while processing your request.
  </ErrorContainer>
);