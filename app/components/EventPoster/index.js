/**
*
* EventPoster
*
* This components displays a poster image of an event.
*
*/

import React from 'react';
import './event_poster_modal.css';

class EventPoster extends React.PureComponent {
  render() {
    const { productImage, openModal } = this.props;
    return (
      <div>
        <div
          id="modal-show"
          className="modal-wrap"
          style={{ display: openModal === true ? 'block' : 'none' }}
        >
          <img src={productImage} alt="product" />
        </div>
      </div>
    );
  }
}

EventPoster.propTypes = {};

export default EventPoster;
