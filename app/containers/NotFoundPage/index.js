/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import mookhLogo from './logo-dark.png';
import EventNavBar from 'containers/EventNavBar';
import "!!style-loader!css-loader!./not-found-page.css";

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{minHeight: "90vh", position: "relative", color: "#343A41", backgroundColor: "#faea29"}}>
        <nav className="footer-nav">
          <ul>
            <li><a href="/#"><img src={mookhLogo} alt="" /></a></li>
            <li><a href="#">START SELLING</a></li>
          </ul>
        </nav>
        <main className="not-found-main">
          <div>
            <h1>404</h1>
            <h1>PAGE NOT FOUND</h1>
          </div>
        </main>
      </div>
    );
  }
}
