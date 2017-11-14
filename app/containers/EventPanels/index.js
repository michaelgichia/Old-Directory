/**
*
* EventPanels
*
* Event panels are the components that display events -
* information on directory landing page.
*
*/

import React from "react";
import { connect } from "react-redux";
import LoadingSpinner from "components/LoadingSpinner";
import "style-loader!css-loader!./event-panel.css";
import { randomColor } from "utils/color-generator";
// Actions
import { fetchEvents } from "./actions";
import { eventPosterBaseUrl } from "./constants";

class EventPanels extends React.PureComponent {
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

  handleError = e => {
    e.persist();
  };

  render() {
    const { events } = this.state;
    const { isFixedNavHeight } = this.props;
    if (events.length < 1) {
      return <LoadingSpinner />;
    }
    return (
      <div className="panel-wrap">
        {events.map(event => (
          <div className="panel-container" key={event.id}>
            <div
              className="panel-img-wrap"
              style={{ backgroundColor: `${randomColor()}` }}
            >
              <a href={`/event/${event.id}`}>
                <img
                  src={event.event_poster}
                  alt=""
                  onError={e => this.handleError(e)}
                  id={event.id}
                />
              </a>
            </div>
            <div className="panel-event-info">
              <a href="" alt="event">
                {event.event_name}
              </a>
              <a href="" alt="event">
                by {event.store_name}
              </a>
              <div
                dangerouslySetInnerHTML={{
                  __html: event.event_description
                }}
              />
            </div>
            <a
              href={`/event/${event.id}`}
              target="_self"
              className="panel-event-buy"
            >
              VIEW STORE
              <i className="fa fa-arrow-right fa-2x" aria-hidden="true" />
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
