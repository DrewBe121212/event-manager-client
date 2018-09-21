import React from 'react';
import { Error } from './Error';

export const Error503 = (props) => (
  <Error title="Server Unavailable" {...props}>
    The server is not currently available.
  </Error>
);
