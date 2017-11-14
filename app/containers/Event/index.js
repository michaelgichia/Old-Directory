/*
 *
 * Event
 *
 */

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { fetchEvent } from "./actions";
import { TabPanel } from "react-tabs";
import { Tabs as MobileTabs } from "antd";
import EventTopPageDisplay from "containers/EventTopPageDisplay";
import LoadingSpinner from "components/LoadingSpinner";
import EventSubMenu from "components/EventSubMenu";
import EventMenuTab from "components/EventMenuTab";
import EventInfomation from "containers/EventInfomation";
import EventBuyTicket from "containers/EventBuyTicket";
import EventMenuBar from "components/EventMenuBar";
import "!!style-loader!css-loader!./event.css";


const TabPane = MobileTabs.TabPane;

export class Event extends React.Component {
  componentWillMount() {
    const { eventId } = this.props.params;
    this.props.fetchEvent(eventId);
  }

  render() {
    const { event, location: { pathname } } = this.props;

    if (Object.keys(event).length < 1) {
      return (
        <div className="loading-exit">
          <EventTopPageDisplay />
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <div>
        <EventTopPageDisplay />
        <EventSubMenu
          eventName={event.event_name}
          eventVenue={event.event_venue}
        />
        <div className="show-mobile">
        <MobileTabs defaultActiveKey="1" tabPosition="top" style={{ height: 220 }}>
          <TabPane tab="Tab 1" key="1">
            Content of tab 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of tab 3
          </TabPane>
          <TabPane tab="Tab 4" key="4">
            Content of tab 4
          </TabPane>
          <TabPane tab="Tab 5" key="5">
            Content of tab 5
          </TabPane>
          <TabPane tab="Tab 6" key="6">
            Content of tab 6
          </TabPane>
          <TabPane tab="Tab 7" key="7">
            Content of tab 7
          </TabPane>
          <TabPane tab="Tab 8" key="8">
            Content of tab 8
          </TabPane>
          <TabPane tab="Tab 9" key="9">
            Content of tab 9
          </TabPane>
          <TabPane tab="Tab 10" key="10">
            Content of tab 10
          </TabPane>
          <TabPane tab="Tab 11" key="11">
            Content of tab 11
          </TabPane>
        </MobileTabs>
        </div>

        <EventMenuTab>
          <TabPanel>
            <EventBuyTicket event={event} pathname={pathname} />
          </TabPanel>
          <TabPanel>
            <EventInfomation event={event} pathname={pathname} />
          </TabPanel>
          <TabPanel>
            <h2>GALLERY</h2>
          </TabPanel>
          <TabPanel>
            <h2>SITE MAP</h2>
          </TabPanel>
          <TabPanel>
            <h2>SCHEDULES $ SPEAKERS</h2>
          </TabPanel>
          <TabPanel>
            <h2>SPONSORS</h2>
          </TabPanel>
        </EventMenuTab>
      </div>
    );
  }
}

const mapStateToProps = ({ event }) => ({
  event: event.event
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
