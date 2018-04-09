import React from 'react';

export const OverallErrors = ({ errors = [] }) => {
  if (errors.length > 0) {
    return (
      <div>
        <ul>
          {errors.map((error, index) =>
            <li key={index}>{error}</li>
          )}
        </ul>
      </div>
    );
  }

  return null;
}