/*
 *
 * DirectoryLandingPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DirectoryNavBar from 'components/DirectoryNavBar';
import EventPanels from 'containers/EventPanels';
import '!!style-loader!css-loader!./dlp-desktop.css';
import SiteLogo from './site-logo.png';
import buyOnline from './buyOnline.svg';
import sellOnline from './sellOnline.svg';

export class DirectoryLandingPage extends React.PureComponent {
  state = {
    topOfNav: 0
  };

  // componentDidMount() {
  //   this.setState(() => ({ topOfNav: this.nav.offsetTop }));
  //   window.addEventListener('scroll', () => this.listenPageScroll(), false);
  // }

  listenPageScroll = () => {
    if (window.scrollY >= this.state.topOfNav) {
      this.nav.classList.add('directory-fixed');
    } else {
      this.nav.classList.remove('directory-fixed');
    }
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenPageScroll, false);
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
          <div className="directory__sub__main">
            <div className="directory__seller">
              <img src={buyOnline} className="directory__svg" alt="buy online icon" />
              <h2>Buy Online.</h2>
              <h3>Search for existing items below.</h3>
              <div>Explore our extensive catalogue of merchants selling digital content, event tickets and other assorted products as well as discover individuals organisations running a variety of crowdfunding campaigns.</div>
              <input
                className="search-input"
                type="type"
                placeholder="Search within category"
                autoComplete="off"
                role="textbox"
                spellCheck="off"
              />
            </div>
            <div className="directory__buyer">
              <img src={sellOnline} className="directory__svg" alt="sell online icon" />
              <h2>Sell Online.</h2>
              <h3>Power your existing website or social media pages.</h3>
              <div>Learn how to quickly and easily setup an online store. Sell your digital content, event tickets, assorted products are well as collect contributions for your crowdfunding campaigns.</div>
              <div className="directory__btn__wrap">
                <button className="directory__btn btn__yellow" >Learn More</button>
                <button className="directory__btn btn__secondary">Seller Sign Up</button>
                <button className="directory__btn btn__plain" >Seller Sign In</button>
              </div>
            </div>
          </div>
        </div>
        <main style={{ minHeight: '100vh' }}>
          <DirectoryNavBar pathname={pathname} navRef={ele => (this.nav = ele)} />
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
