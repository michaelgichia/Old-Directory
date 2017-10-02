/**
*
* MenuTabsLargeScreen
*
*/

import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import "!!style-loader!css-loader!./menu-tabs-large-screen.css";
import mookhLogo from "./logo-dark.png";

class MenuTabsLargeScreen extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  burgerToggle = () => {
    window.addEventListener("click", this.pageIsRegistered, false);
  };

  pageIsRegistered = () => {
    const narrowLinks = document.querySelector(".narrow-links");
    if (narrowLinks.style.display === "block") {
      narrowLinks.style.display = "none";
      window.removeEventListener("click", this.pageIsRegistered, false);
    } else {
      narrowLinks.style.display = "block";
    }
  };

  render() {
    const { activeItem } = this.state;
    const { eventId } = this.props;
    return (
      <div>
        <Menu
          className="hide-desktop-tablet"
          pointing
          secondary
          fluid
          widths={3}
        >
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
              <a href="/buy-ticket" alt="buy tickets">
                BUY TICKETS
                <span />
              </a>
              <a
                href={`/tickets/event/${eventId}/info`}
                alt="event information"
              >
                EVENT INFO
                <span />
              </a>
              <a href="#" alt="gallery">
                GALLERY
                <span />
              </a>
              <a href="#" alt="site map">
                SITE MAP
                <span />
              </a>
              <a href="#" alt="schedules and speakers">
                SCHEDULES $ SPEAKERS
                <span />
              </a>
              <a href="#" alt="sponsors">
                SPONSORS
                <span />
              </a>
              <a alt="#" />
            </div>
          </div>
          <div className="nav-narrow">
            <div className="tabs-menu open">
              <span className="logo">
                <img src={mookhLogo} alt="" />
              </span>
              <Icon
                size="large"
                className="tabs-menu-icon"
                name="sidebar"
                onClick={this.burgerToggle}
              />
            </div>
            <div className="narrow-links">
              <a
                href="/buy-ticket"
                onClick={this.burgerToggle}
                alt="buy tickets"
              >
                BUY TICKETS<Icon name="ticket" />
              </a>
              <a
                href={`/tickets/event/${eventId}/info`}
                onClick={this.burgerToggle}
                alt="event information"
              >
                EVENT INFO<Icon name="users" />
              </a>
              <a href="#" onClick={this.burgerToggle} alt="gallery">
                GALLERY<Icon name="image" />
              </a>
              <a href="#" onClick={this.burgerToggle} alt="site map">
                SITE MAP<Icon name="map" />
              </a>
              <a
                href="#"
                onClick={this.burgerToggle}
                alt="schedules and speakers"
              >
                SCHEDULES $ SPEAKERS<Icon name="calendar minus" />
              </a>
              <a href="#" onClick={this.burgerToggle} alt="sponsors">
                SPONSORS<Icon name="cubes" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default MenuTabsLargeScreen;