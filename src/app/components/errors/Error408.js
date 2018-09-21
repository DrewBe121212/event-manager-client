import React from 'react';
import { Error } from './Error';

export const Error408 = (props) => (
  <Error title="Request Timeout" {...props}>
    This request took to long to process. 
  </Error>
);
