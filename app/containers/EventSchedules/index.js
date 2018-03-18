/*
 *
 * EventSchedules
 *
 */

import React, { PropTypes } from "react";
import EmptyData from "components/EmptyData";
// import "./EventSchedules.css";

export class EventSchedules extends React.Component {
  render() {
    return (
      <div>
        <EmptyData message="Schedules and speakers data is not available at the moment." />
      </div>
    );
  }
}

EventSchedules.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default EventSchedules;