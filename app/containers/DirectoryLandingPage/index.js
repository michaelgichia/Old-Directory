/*
 *
 * DirectoryLandingPage
 *
 */

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import DirectoryNavBar from "components/DirectoryNavBar";
import EventPanels from "containers/EventPanels";
import "!!style-loader!css-loader!./dlp-desktop.css";
import SiteLogo from "./site-logo.png";

export class DirectoryLandingPage extends React.PureComponent {
  state = {
    topOfNav: 0,
  };

  componentDidMount() {
    const directoryMain = document.querySelector(".directory-navbar");
    this.setState(() => ({ topOfNav: directoryMain.offsetTop }));
    window.addEventListener("scroll", () => this.listenPageScroll());
  }

  listenPageScroll = () => {
    const nav = document.querySelector('.directory-navbar');
    if(window.scrollY >= this.state.topOfNav) {
      nav.classList.add("directory-fixed");
    } else {
      nav.classList.remove("directory-fixed");
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenPageScroll);
  }

  render() {
    const { pathname } = this.props.location;
    const { isFixedTopClass, isFixedNavHeight } = this.state;
    return (
      <div className="directory-main">
        <div className="search-main">
          <div className="site-logo">
            <img src={SiteLogo} alt="" />
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
        <main style={{ height: "100vh" }}>
          <DirectoryNavBar
            pathname={pathname}
          />
          <EventPanels />
        </main>
      </div>
    );
  }
}

DirectoryLandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(DirectoryLandingPage);
