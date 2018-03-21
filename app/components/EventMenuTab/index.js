/**
*
* EventMenuTab
*
*/

import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classNames from "classnames";
import "./event-menu-tabs.css";


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
            <i className="fa fa-users fa-2x" aria-hidden="true" />BUY TICKETS
          </Tab>
          <Tab className="event-menu-tabs__tab">
            <i className="fa fa-ticket fa-2x" aria-hidden="true" />EVENT INFO
          </Tab>
          <Tab className="event-menu-tabs__tab">
            <i className="fa fa-picture-o fa-2x" aria-hidden="true" />GALLERY
          </Tab>
          <Tab className="event-menu-tabs__tab">
            <i className="fa fa-map fa-2x" aria-hidden="true" />SITE MAP
          </Tab>

          <Tab className="event-menu-tabs__tab">
            <i className="fa fa-calendar-minus-o fa-2x" aria-hidden="true" />SCHEDULES $ SPEAKERS
          </Tab>
          <Tab className="event-menu-tabs__tab">
            <i className="fa fa-cubes fa-2x" aria-hidden="true" />SPONSORS
          </Tab>
        </TabList>
        {this.props.children}
      </Tabs>
    );
  }
}

EventMenuTab.propTypes = {};

export default EventMenuTab;
