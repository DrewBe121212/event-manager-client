import React from 'react';
import { ErrorContainer } from './ErrorContainer';

export const Error408 = (props) => (
  <ErrorContainer title="Request Timeout" {...props}>
    This request took to long to process. 
  </ErrorContainer>
);
