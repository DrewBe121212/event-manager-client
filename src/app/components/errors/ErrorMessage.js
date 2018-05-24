import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  let messages = [];

  if (!message) {
    return null;
  }

  if (Array.isArray(message)) {
    messages = [
      ...message
    ];
  } else if (message === Object(message)) {
    Object.keys(message).forEach((key) => {
      messages.push(message[key]);
    });
  } else {
    messages.push(message.toString());
  }

  if (messages.length > 0) {
    return (
      <React.Fragment>
        {messages.length === 1 ?
          messages.toString() :
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        }
      </React.Fragment>
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

export { ErrorMessage };