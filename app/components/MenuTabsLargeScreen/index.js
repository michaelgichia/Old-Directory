/**
*
* MenuTabsLargeScreen
*
*/

import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import mookhLogo from './logo-dark.png';
import '!!style-loader!css-loader!./menu-tabs-large-screen.css';

class MenuTabsLargeScreen extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  burgerToggle = () => {
    const linksEl = document.querySelector('.narrow-links');
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
    } else {
      linksEl.style.display = 'block';
    }
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu className="mobile" pointing secondary fluid widths={3}>
          <Menu.Item
            name="BUY TICKETS"
            active={activeItem === "BUY TICKETS"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="EVENT INFO"
            active={activeItem === "EVENT INFO"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="GALLERY"
            active={activeItem === "GALLERY"}
            onClick={this.handleItemClick}
          />
        </Menu>
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
      </div>
    );
  }
}

export default MenuTabsLargeScreen;

