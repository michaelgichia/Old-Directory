/*
 *
 * EventInfo
 *
 */

import React from 'react';
import MenuTabsLargeScreen from 'components/MenuTabsLargeScreen';
import EventInfoMenu from 'components/EventInfoMenu';
import { Icon, Menu } from 'semantic-ui-react';
import '!!style-loader!css-loader!./event-info.css';
import productImage from './product-banner.jpg';

export class EventInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // const { activeItem } = this.state;
    return (
      <div>
        <div className="tablet product-image-wrapper">
          <div>
            <img src={productImage} alt="product" />
          </div>
        </div>

        <EventInfoMenu />

        <MenuTabsLargeScreen />

        <div className="description-wrap">

          <div className="desktop product-image-wrapper">
            <div>
              <img src={productImage} alt="product" />
            </div>
          </div>

          <div className="information">
            <header>ABOUT THIS EVENT</header>
            <div className="more-details">
              <p>
                Amplify the voice of Kenyan women on a global platform through TED
                Talks. Print this page to PDF for thr complete set of vectors. Or
                to use thr desltop, install FontAwesome.ptf, set it as thr font in
                your application, and copy and paste the icons (not the unicode)
                directly from this page intp your designs
              </p>
              <p>
                Strictly age 21 and over. No animals will be permitted to enter.
              </p>
              <p>
                <span>CONTACT: 0710123123</span>
                <span>hello@example.com</span>
                <span>www.example.com</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default EventInfo;
