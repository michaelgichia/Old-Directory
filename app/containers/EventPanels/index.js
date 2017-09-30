/**
*
* EventPanels
*
*/

import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import "style-loader!css-loader!./event-panel.css";
import { randomColor } from "utils/color-generator";
// Actions
import { fetchEvents } from "./actions";
import { eventPosterBaseUrl } from "./constants";


class EventPanels extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    events: []
  };

  componentDidMount() {
    this.props.fetchEvents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events.length !== this.state.events.length) {
      this.setState(() => ({ events: nextProps.events }));
    }
  }

  render() {
    const { events } = this.state;
    return (
      <div className="panel-wrap">
        {events.map(event => (
          <div className="panel-container" key={event.id}>
            <span className="panel-event-logo" />
            <div className="panel-img-wrap" style={{ backgroundColor: `${randomColor()}` }}>
              <a href="">&nbsp;</a>
            </div>
            <div className="panel-event-info">
              <a href="" alt="event">
                {event.event_name}
              </a>
              <a href="" alt="event">
                by{" "}{event.store_name}
              </a>
              <div dangerouslySetInnerHTML={{
                  __html: event.event_description
                }} />
            </div>
            <a href={`/tickets/event/${event.id}`} target="_self" className="panel-event-buy">
              VIEW STORE
              <Icon name="arrow right" />
            </a>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ eventPanels }) => ({
  events: eventPanels.events
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPanels);