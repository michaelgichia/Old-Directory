/*
 *
 * DirectoryLandingPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DirectoryNavBar from 'components/DirectoryNavBar';
import EventPanel from 'components/EventPanel';
import "!!style-loader!css-loader!./dlp-desktop.css";
import SiteLogo from './site-logo.png';

export class DirectoryLandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="search-main">
          <div className="site-logo">
            <img src={SiteLogo} alt=""/>
          </div>
          <div className="search-wrap">
            <div>
              <input
                className="search-input"
                type="type"
                placeholder="Search within category"
                autoComplete="off"
                role="textbox"
                spellCheck="off"
              />
            </div>
          </div>
        </div>
        <main>
          <DirectoryNavBar />
          <EventPanel />
        </main>
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
