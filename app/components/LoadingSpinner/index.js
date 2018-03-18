/**
*
* LoadSpinner
*
* This is a spinner that you can render with preffered logic.
*/

import React from "react";
import "./loading-spinner.css";

class LoadingSpinner extends React.PureComponent {
  render() {
    return (
      <div className="loader-wrap">
        <div className="loader">Loading...</div>
      </div>
    );
  }
}

export default LoadingSpinner;
