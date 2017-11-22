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
    this.setState(() => ({ topOfNav: this.nav.offsetTop }));
    window.addEventListener("scroll", () => this.listenPageScroll(), false);
  }

  listenPageScroll = () => {
    if(window.scrollY >= this.state.topOfNav) {
      this.nav.classList.add("directory-fixed");
    } else {
      this.nav.classList.remove("directory-fixed");
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenPageScroll, false);
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
        <main style={{ minHeight: "100vh" }}>
          <DirectoryNavBar
            pathname={pathname}
            navRef={ele => this.nav = ele}
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
