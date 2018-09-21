import React from 'react';
import { Error } from './Error';

export const Error404 = (props) => (
  <Error title="Resource Not Found" {...props}>
    The requested resource could not be found.
  </Error>
);
