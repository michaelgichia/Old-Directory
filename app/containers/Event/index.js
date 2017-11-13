/*
 *
 * Event
 *
 */

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { fetchEvent } from "./actions";
import { TabPanel } from "react-tabs";
import EventTopPageDisplay from "containers/EventTopPageDisplay";
import LoadingSpinner from "components/LoadingSpinner";
import EventMenuBar from "components/EventMenuBar";
import EventSubMenu from "components/EventSubMenu";
import EventMenuTab from "components/EventMenuTab";
import EventInfomation from "containers/EventInfomation";
import EventBuyTicket from "containers/EventBuyTicket";
// import "!!style-loader!css-loader!./Event.css";

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
