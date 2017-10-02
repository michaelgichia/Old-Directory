/**
*
* LoadSpinner
*
*/

import React from 'react';
import EventNavBar from "containers/EventNavBar";
import '!!style-loader!css-loader!./loading-spinner.css';

class LoadSpinner extends React.Component { // eslint-disable-line react/prefer-stateless-function


    render() {
      return (
        <div className="loader-wrap">
          <div className="loader">Loading...</div>
        </div>
      );
    }
  }

export default LoadSpinner;


