/*
 *
 * EventSchedules
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defaultAction } from './actions';
// import "!!style-loader!css-loader!./EventSchedules.css";

export class EventSchedules extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

EventSchedules.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({}) => ({

});

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(EventSchedules);
