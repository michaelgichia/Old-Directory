/*
 *
 * DirectoryLandingPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import "!!style-loader!css-loader!./dlp-desktop.css";

export class DirectoryLandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

DirectoryLandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(DirectoryLandingPage);
