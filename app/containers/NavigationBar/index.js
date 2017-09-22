/*
 *
 * NavigationBar
 *
 */

import React from 'react';
import '!!style-loader!css-loader!./navigation-bar.css';
import mookhLogo from './logo-dark.png';

export class NavigationBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="nav">
        <ul>
          <li><a href="#"><img src={mookhLogo} alt=""/></a></li>
          <li><a href="#">START SELLING</a></li>
        </ul>
      </div>
    );
  }
}

export default NavigationBar;
