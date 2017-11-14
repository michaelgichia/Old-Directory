/**
*
* EventMenuBar
*
* This component is for easy navigation on an event.
* The component is only visible on an event.
* The menu items options are :- Buy tickets, Event Info, Gallery, Site map, Schedule and Sponsors.
*
*/

import React from "react";
import { browserHistory } from "react-router";
import { Icon, Menu } from "semantic-ui-react";
import { getPathname } from "utils/helperFunctions";
import "!!style-loader!css-loader!./menu-tabs-large-screen.css";
import mookhLogo from "./logo-dark.png";

class EventMenuBar extends React.PureComponent {
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
    const { activeItem, showModal } = this.state;
    const { eventId, pathname } = this.props;
    const onActive = getPathname(pathname);

    return (
      <div>
        <nav className="product-tabs">
          <div className="nav-wide">
            <div className="wide-div">
              <a alt="#" />
              <a
                href={`/tickets/event/${eventId}`}
                alt="buy tickets"
                className={onActive === "tickets event" ? "on-active" : ""}
              >
                BUY TICKETS
                <span />
              </a>
              <a
                href={`/tickets/event/${eventId}/info`}
                alt="event information"
                className={onActive === "event info" ? "on-active" : ""}
              >
                EVENT INFO
                <span />
              </a>
              <a
                href="#"
                alt="gallery"
                className={onActive === "gallery" ? "on-active" : ""}
              >
                GALLERY
                <span />
              </a>
              <a
                href="#"
                alt="site map"
                className={onActive === "site map" ? "on-active" : ""}
              >
                SITE MAP
                <span />
              </a>
              <a
                href="#"
                alt="schedules and speakers"
                className={
                  onActive === "schedules and speakers" ? "on-active" : ""
                }
              >
                SCHEDULES $ SPEAKERS
                <span />
              </a>
              <a
                href="#"
                alt="sponsors"
                className={onActive === "sponsors" ? "on-active" : ""}
              >
                SPONSORS
                <span />
              </a>
              <a alt="#" />
            </div>
          </div>
          <div className="nav-narrow">
            <div className="tabs-menu open">
              <span
                className="logo"
                onClick={() => browserHistory.push("/#")}
                style={{ cursor: "pointer" }}
              >
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
                href={`/tickets/event/${eventId}`}
                onClick={this.burgerToggle}
                alt="buy tickets"
                className={onActive === "tickets event" ? "mb-active" : ""}
              >
                BUY TICKETS<Icon name="ticket" />
              </a>
              <a
                href={`/tickets/event/${eventId}/info`}
                onClick={this.burgerToggle}
                alt="event information"
                className={onActive === "event info" ? "mb-active" : ""}
              >
                EVENT INFO<Icon name="users" />
              </a>
              <a
                href="#"
                onClick={this.burgerToggle}
                alt="gallery"
                className={onActive === "gallery" ? "mb-active" : ""}
              >
                GALLERY<Icon name="image" />
              </a>
              <a
                href="#"
                onClick={this.burgerToggle}
                alt="site map"
                className={onActive === "site map" ? "mb-active" : ""}
              >
                SITE MAP<Icon name="map" />
              </a>
              <a
                href="#"
                onClick={this.burgerToggle}
                alt="schedules and speakers"
                className={
                  onActive === "schedules and speakers" ? "mb-active" : ""
                }
              >
                SCHEDULES $ SPEAKERS<Icon name="calendar minus" />
              </a>
              <a
                href="#"
                onClick={this.burgerToggle}
                alt="sponsors"
                className={onActive === "sponsors" ? "mb-active" : ""}
              >
                SPONSORS<Icon name="cubes" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default EventMenuBar;
