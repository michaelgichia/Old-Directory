/**
*
* EventMenuTab
*
*/

import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classNames from "classnames";
import "!!style-loader!css-loader!./event-menu-tabs.css";
import { Users, Ticket, Schedule, Gallery, Cubes } from "./svg";

class EventMenuTab extends React.Component {
  state = {
    isEventMenuOpen: false
  };

  toggleEventMenu = () =>
    this.setState(() => ({ isEventMenuOpen: !this.state.isEventMenuOpen }));

  render() {
    const { isEventMenuOpen } = this.state;
    const tablistClassnames = classNames("event-menu-tabs__tab-list", {
      "tab-list-open": isEventMenuOpen
    });

    return (
      <Tabs
        className="event-menu-tabs"
        selectedTabClassName="event-menu-tabs__tab--selected"
      >
        <div className="events-hamburger">
          <button onClick={this.toggleEventMenu}>&#x2630;</button>
        </div>
        <TabList className={tablistClassnames}>
          <Tab className="event-menu-tabs__tab">
            <Users />BUY TICKETS
          </Tab>
          <Tab className="event-menu-tabs__tab">
            <Ticket /> EVENT INFO
          </Tab>
          <Tab className="event-menu-tabs__tab">
            <Gallery /> GALLERY
          </Tab>
          <Tab className="event-menu-tabs__tab">
            <Users /> SITE MAP
          </Tab>

          <Tab className="event-menu-tabs__tab">
            <Schedule /> SCHEDULES $ SPEAKERS
          </Tab>
          <Tab className="event-menu-tabs__tab">
            <Cubes /> SPONSORS
          </Tab>
        </TabList>
        {this.props.children}
      </Tabs>
    );
  }
}

EventMenuTab.propTypes = {};

export default EventMenuTab;
