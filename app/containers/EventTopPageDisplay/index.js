/*
 *
 * EventTopPageDisplay
 *
 * This component displays the company logo and start selling button.
 *
 */

import React from 'react';
import './navigation-bar.css';
import mookhLogo from './logo-dark.png';

export class EventTopPageDisplay extends React.PureComponent {
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

export default EventTopPageDisplay;
