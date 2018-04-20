/**
*
* EventSubMenu
*
* This components displays event name, venue and schedule.
*
*/

import React from "react";
import { GlowButton } from "components/Buttons";
import ModalPoster from "components/ModalPoster";
import EventInfoWrap from './EventInfoWrap';
import DescHeader from './DescHeader';

const getDirectionBaseAPI = "https://www.google.com/maps/search/?api=1&query=";

class EventSubMenu extends React.PureComponent {
  state = {
    showModal: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    const { eventName, eventVenue } = this.props;
    const { showModal } = this.state;
    const posterMessage = "poster";
    const location =
      eventVenue !== null
        ? eventVenue.toLocaleLowerCase().replace(/,/g, "+")
        : "";

    return (
      <EventInfoWrap>
        <div>
          <h3>{eventName}</h3>
        </div>
        <DescHeader>
          <h5>
            <i className="fa fa-clock-o fa-2x" aria-hidden="true" />FRIDAY 28
            OCT 17:00-23:00 // 15 DAYS TO GO
          </h5>
          <h5>
            <a href={`${getDirectionBaseAPI}${location}`} target="_blank">
              <i className="fa fa-map-marker fa-2x" aria-hidden="true" />
              {eventVenue}
            </a>
          </h5>
        </DescHeader>
      </EventInfoWrap>
    );
  }
}

EventSubMenu.propTypes = {};

export default EventSubMenu;
