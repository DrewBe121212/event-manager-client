import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error404 = ({ errors }) => (
  <ErrorContainer title="Resource Not Found" errors={errors}>
    The requested resource could not be found.
  </ErrorContainer>
);
