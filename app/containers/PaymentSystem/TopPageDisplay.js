/*
 *
 * TopPageDisplay
 *
 * This component displays the company logo and start selling button.
 *
 */

import React from 'react';
import mookhLogo from 'images/logo-dark.png';

export class TopPageDisplay extends React.PureComponent {
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

export default TopPageDisplay;
