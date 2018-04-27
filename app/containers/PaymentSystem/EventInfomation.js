/**
 *
 * EventInfomation
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventSubMenu from 'components/EventSubMenu';
import Img from "components/Img";
import noImage from 'images/no_image.svg';
import EventPoster from './EventPoster';
import reducer from './reducer';
import './css/event-info.css';


export class EventInfomation extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    openModal: false,
    eventInfo: {}
  };
  render() {
    const { openModal } = this.state;
    const { event } = this.props;
    return (
      <div>
        <EventPoster productImage={event.event_poster === null ? noImage : event.event_poster} openModal={openModal} />

        <div className="ticket-description-wrap">
          <div className="event-buy-image">
          <img src={event.event_poster === null ? noImage : event.event_poster} className="" alt="product" />
          </div>

          <div className="information">
            <header>ABOUT THIS EVENT</header>
            <div className="more-details">
              <p dangerouslySetInnerHTML={{__html: event.event_description && event.event_description }} />
              <p>
                <span>CONTACT: 0710123123</span>
                <span>hello@example.com</span>
                <span>www.example.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EventInfomation.propTypes = {
  dispatch: PropTypes.func
};

export default EventInfomation;