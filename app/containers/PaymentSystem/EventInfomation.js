/**
 *
 * EventInfomation
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import EventTopPageDisplay from 'components/EventTopPageDisplay';
import EventSubMenu from 'components/EventSubMenu';
import EventPoster from './EventPoster';
import Img from "components/Img";
import reducer from './reducer';
import './styles.css';

// const event.event_poster =
//   'https://mymookh.com/tickets/uploads/posters/big-image-1cf2bde29cc323599a0375d73c85e7d7.jpg';

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
        <EventPoster productImage={event.event_poster} openModal={openModal} />

        <div className="ticket-description-wrap">
          <div className="event-buy-image">
          <Img src={event.event_poster} className="" alt="product" />
          </div>

          <div className="information">
            <header>ABOUT THIS EVENT</header>
            <div className="more-details">
              <p dangerouslySetInnerHTML={{__html: event.event_description && event.event_description }} />
              <p>
                <span><code>Dummy</code> CONTACT: 0710123123</span>
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

const withConnect = connect(null, mapDispatchToProps);
export default compose(withReducer, withConnect)(EventInfomation);