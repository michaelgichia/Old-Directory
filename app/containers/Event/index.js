/*
 *
 * Event
 *
 */

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { fetchEvent } from "./actions";
import EventTopPageDisplay from "containers/EventTopPageDisplay";
import EventMenuBar from "components/EventMenuBar";
import EventSubMenu from "components/EventSubMenu";
import EventMenuTab from "components/EventMenuTab";
// import "!!style-loader!css-loader!./Event.css";

export class Event extends React.Component {
  componentWillMount() {
    const { eventId } = this.props.params;
    this.props.fetchEvent(eventId);
  }

  render() {
    const { event, location: { pathname } } = this.props;
    return (
      <div>
        <EventTopPageDisplay />
        <EventSubMenu
          eventName={event.event_name}
          eventVenue={event.event_venue}
        />
        <EventMenuTab />
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
