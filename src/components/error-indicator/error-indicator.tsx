import React from 'react';

import './error-indicator.scss';
import icon from './error-fox.jpg';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error icon"/>
      <span className="oops">OOPS!</span>
      <span>
        Server connection error:(
      </span>
      <span>
        Please try again later!
      </span>
    </div>
  );
}
export default ErrorIndicator;
