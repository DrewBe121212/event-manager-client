import React from 'react';
import { Error } from './Error';

export const Error401 = (props) => (
  <Error title="Unauthorized" {...props}>
    You are not authorized to access this resource.
  </Error>
);

