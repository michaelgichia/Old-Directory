/*
 *
 * EventSiteMap
 *
 */

import React, { PropTypes } from "react";
import EmptyData from "components/EmptyData";
// import "!!style-loader!css-loader!./EventSiteMap.css";

export class EventSiteMap extends React.Component {
  render() {
    return (
      <div>
        <EmptyData message="Site map data is not available at the moment." />
      </div>
    );
  }
}

EventSiteMap.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default EventSiteMap;