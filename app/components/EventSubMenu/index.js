/**
*
* EventSubMenu
*
* This components displays event name, venue and schedule.
*
*/

import React from "react";
import GlowButton from "components/GlowButton";
import ModalPoster from "components/Modals/ModalPoster";
import { Icon } from "semantic-ui-react";
import "!!style-loader!css-loader!./invent-info-menu.css";

const getDirectionBaseAPI = "https://www.google.com/maps/search/?api=1&query=";

class EventSubMenu extends React.Component {
  state = {
    showModal: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    const { eventName, eventVenue } = this.props;
    const { showModal } = this.state;
    const posterImage =
      "https://mymookh.com/tickets/uploads/posters/big-image-1cf2bde29cc323599a0375d73c85e7d7.jpg";
    const posterMessage = "poster";
    const location =
      eventVenue !== eventVenue
        ? eventVenue.toLocaleLowerCase().replace(/,/g, "+")
        : "";

    return (
      <div className="event-information-wrap">
        <div className="position-glow-btn">
          <GlowButton handleGlowBtn={this.handleOpenModal} />
        </div>
        <ModalPoster
          posterImage={posterImage}
          posterMessage={posterMessage}
          showModal={showModal}
        />
        <div className="product-title">
          <h3>{eventName}</h3>
        </div>
        <div className="description header">
          <h5>
            <Icon name="clock" />FRIDAY 28 OCT 17:00-23:00 // 15 DAYS TO GO
          </h5>
          <a href={`${getDirectionBaseAPI}${location}`} target="_blank">
            <Icon name="marker" />
            {eventVenue}
          </a>
        </div>
      </div>
    );
  }
}

EventSubMenu.propTypes = {};

export default EventSubMenu;