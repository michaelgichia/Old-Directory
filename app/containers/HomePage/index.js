/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Affix, Button, Icon } from 'antd';
import DirectoryNavBar from 'components/DirectoryNavBar';
import EventPanels from 'containers/EventPanels/Loadable';
import getWindowSize from 'utils/getWindowSize';
import Wrapper from './Wrapper';
import ImgWrap from './ImgWrap';
import Img from 'components/Img';
import H2 from './H2';
import H3 from './H3';
import P from './P';
import BtnWrap from './BtnWrap';
import MottoWrap from './MottoWrap';
import LogoWrap from './LogoWrap';
import SubWrap from './SubWrap';
import SiteLogo from './assests/site-logo.png';
import buyOnline from './assests/buyOnline.svg';
import sellOnline from './assests/sellOnline.svg';
import Div from './Div';
import MookhInput from './MookhInput';
import MookhButton from './MookhButton';

class HomePage extends PureComponent {
  width = getWindowSize();

  responsiveButtons = width => {
    if (width >= 992) return 'large';
    else return 'small';
  };

  handleSearchInputChange = () => {

  }

  render() {
    const { pathname } = this.props.location;
    return (
      <Fragment>
        <Wrapper>
          <LogoWrap>
            <Img src={SiteLogo} alt="logo" />
          </LogoWrap>
          <Div>
            <SubWrap>
              <MottoWrap>
                <ImgWrap>
                  <Img src={buyOnline} alt="buy online icon" />
                </ImgWrap>
                <H2>Buy Online.</H2>
                <H3>Search for existing items below.</H3>
                <P>
                  Explore our extensive catalogue of merchants selling digital
                  content, event tickets and other assorted products as well as
                  discover individuals organisations running a variety of
                  crowdfunding campaigns.
                </P>
                <BtnWrap>
                  <MookhInput
                    placeholder="Search"
                    size="large"
                    prefix={
                      <Icon
                        type="search"
                        style={{ color: '#ffffff', fontWeight: 700 }}
                      />
                    }
                    ref={node => (this.userNameInput = node)}
                  />
                </BtnWrap>
              </MottoWrap>
              <MottoWrap>
                <ImgWrap>
                  <Img src={sellOnline} alt="sell online icon" />
                </ImgWrap>
                <H2>Sell Online.</H2>
                <H3>Power your existing website or social media pages.</H3>
                <P>
                  Learn how to quickly and easily setup an online store. Sell
                  your digital content, event tickets, assorted products are
                  well as collect contributions for your crowdfunding campaigns.
                </P>
                <BtnWrap>
                  <MookhButton
                    size={this.responsiveButtons(this.width)}
                    type="primary"
                  >
                    Learn more
                  </MookhButton>
                  <MookhButton size={this.responsiveButtons(this.width)}>
                    Seller signup
                  </MookhButton>
                  <MookhButton
                    size={this.responsiveButtons(this.width)}
                    type="dashed"
                  >
                    Seller login
                  </MookhButton>
                </BtnWrap>
              </MottoWrap>
            </SubWrap>
          </Div>
        </Wrapper>
        <main style={{ minHeight: '100vh' }}>
          <Affix>
            <DirectoryNavBar pathname={pathname} />
          </Affix>
          <EventPanels />
        </main>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(HomePage);