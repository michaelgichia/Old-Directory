/*
 *
 * EventGallery
 *
 */

import React, { PropTypes } from 'react';
import EmptyData from "components/EmptyData";
import "./event-gallery.css";

export class EventGallery extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <EmptyData message="Photos are not available at the moment." />
      </div>
    );
  }
}

EventGallery.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};
export default EventGallery;
