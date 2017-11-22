/*
 *
 * EventSiteMap
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defaultAction } from './actions';
// import "!!style-loader!css-loader!./EventSiteMap.css";

export class EventSiteMap extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

EventSiteMap.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({}) => ({

});

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(EventSiteMap);
