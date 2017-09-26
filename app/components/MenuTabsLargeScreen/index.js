/**
*
* MenuTabsLargeScreen
*
*/

import React from 'react';
import { Icon } from 'semantic-ui-react';
import mookhLogo from './logo-dark.png';
import '!!style-loader!css-loader!./menu-tabs-large-screen.css';

class MenuTabsLargeScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  burgerToggle = () => {
    const linksEl = document.querySelector('.narrow-links');
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
    } else {
      linksEl.style.display = 'block';
    }
  }

  render() {
    return (
      <nav className="product-tabs">
        <div className="nav-wide">
          <div className="wide-div">
            <a alt="#" />
            <a href="/buy-ticket" alt="buy tickets">BUY TICKETS</a>
            <a href="/event-information" alt="event information">EVENT INFO</a>
            <a href="#" alt="gallery">GALLERY</a>
            <a href="#" alt="site map">SITE MAP</a>
            <a href="#" alt="schedules and speakers">SCHEDULES $ SPEAKERS</a>
            <a href="#" alt="sponsors">SPONSORS</a>
            <a alt="#" />
          </div>
        </div>
        <div className="nav-narrow">
          <div  className="tabs-menu open">
            <span className="logo"><img src={mookhLogo} alt=""/></span>
            <Icon size="large" className="tabs-menu-icon" name="sidebar" onClick={this.burgerToggle} />
          </div>
          <div className="narrow-links">
            <a href="/buy-ticket" onClick={this.burgerToggle} alt="buy tickets">BUY TICKETS<Icon name="ticket" /></a>
            <a href="/event-information" onClick={this.burgerToggle} alt="event information">
              EVENT INFO<Icon name="users" />
            </a>
            <a href="#" onClick={this.burgerToggle} alt="gallery">GALLERY<Icon name="image" /></a>
            <a href="#" onClick={this.burgerToggle} alt="site map">SITE MAP<Icon name="map" /></a>
            <a href="#" onClick={this.burgerToggle} alt="schedules and speakers">SCHEDULES $ SPEAKERS<Icon name="calendar minus" /></a>
            <a href="#" onClick={this.burgerToggle} alt="sponsors">SPONSORS<Icon name="cubes" /></a>
          </div>
        </div>
      </nav>
    );
  }
}

export default MenuTabsLargeScreen;

