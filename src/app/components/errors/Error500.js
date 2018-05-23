import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error500 = ({ errors }) => (
  <ErrorContainer title="Internal Server Error" errors={errors}>
    Whoops. Something went wrong while processing your request.
  </ErrorContainer>
);