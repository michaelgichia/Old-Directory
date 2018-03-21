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
import EventPoster from 'components/EventPoster';
import injectReducer from "utils/injectReducer";
import reducer from './reducer';
import './styles.css';

const posterImage =
  'https://mymookh.com/tickets/uploads/posters/big-image-1cf2bde29cc323599a0375d73c85e7d7.jpg';

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
        <EventPoster productImage={posterImage} openModal={openModal} />

        <div className="ticket-description-wrap">
          <div className="event-buy-image">
            <img src={posterImage} alt="product" />
          </div>

          <div className="information">
            <header>ABOUT THIS EVENT</header>
            <div className="more-details">
              <p>
                Amplify the voice of Kenyan women on a global platform through
                TED Talks. Print this page to PDF for thr complete set of
                vectors. Or to use thr desltop, install FontAwesome.ptf, set it
                as thr font in your application, and copy and paste the icons
                (not the unicode) directly from this page intp your designs
              </p>
              <p>
                Strictly age 21 and over. No animals will be permitted to enter.
              </p>
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: "eventInfomation", reducer })

export default compose(withReducer, withConnect)(EventInfomation);