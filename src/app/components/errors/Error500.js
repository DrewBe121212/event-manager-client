import React from 'react';
import { Error } from './Error';

export const Error500 = (props) => (
  <Error title="Internal Server Error" {...props}>
    Whoops. Something went wrong while processing your request.
  </Error>
);