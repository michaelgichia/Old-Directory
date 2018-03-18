/*
 *
 * EventSponsors
 *
 */

import React, { PropTypes } from "react";
import EmptyData from "components/EmptyData";
// import "./EventSponsors.css";

export class EventSponsors extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <EmptyData message="Sponsors map data is not available at the moment." />
      </div>
    );
  }
}

EventSponsors.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default EventSponsors;