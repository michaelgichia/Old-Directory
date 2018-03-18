/**
*
* EventTopPageDisplay
*
*/

import React from 'react';
import "./styles.css";
import mookhLogo from "./logo-dark.png";


class EventTopPageDisplay extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="nav-event-page">
        <ul>
          <li>
            <a href="/#">
              <img src={mookhLogo} alt="" />
            </a>
          </li>
          <li>
            <a href="#">START SELLING</a>
          </li>
        </ul>
      </div>
    );
  }
}

EventTopPageDisplay.propTypes = {

};

export default EventTopPageDisplay;
