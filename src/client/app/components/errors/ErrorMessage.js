import React from 'react';
import PropTypes from 'prop-types';

export const ErrorMessage = ({ message }) => {
  let messages = [];

  if (Array.isArray(message)) {
    messages = [
      ...message
    ];
  } else if (typeof message === 'object') {
    Object.keys(message).forEach((key) => {
      messages.push(message[key]);
    });
  } else {
    messages.push(message.toString());
  }

  if (messages.length > 0) {
    return (
      <div>
        {messages.length === 1 ?
          messages.toString() :
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        }
      </div>
    );
  }

  return null;
};

ErrorMessage.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ])
};