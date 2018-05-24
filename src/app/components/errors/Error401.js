import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error401 = ({ errors }) => (
  <ErrorContainer title="Unauthorized" errors={errors}>
    You are not authorized to access this resource.
  </ErrorContainer>
);

