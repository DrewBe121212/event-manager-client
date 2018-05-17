import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error503 = ({ errors }) => (
  <ErrorContainer title="Server Unavailable" errors={errors}>
    The server is not currently available.
  </ErrorContainer>
);
