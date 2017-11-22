/*
 *
 * EventGallery
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defaultAction } from './actions';
// import "!!style-loader!css-loader!./EventGallery.css";

export class EventGallery extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

EventGallery.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({}) => ({

});

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(EventGallery);
