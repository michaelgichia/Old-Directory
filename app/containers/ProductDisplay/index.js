/*
 *
 * ProductDisplay
 *
 */

import React from 'react';
import ProductDisplayMenuTabs from 'components/ProductDisplayMenuTabs';
import { Icon } from 'semantic-ui-react';
import '!!style-loader!css-loader!./product-display.css';
import productImage from './product-banner.jpg';

export class ProductDisplay extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="product-title lg-screen">
          <h4>TEDx LAVINGTON WOMEN: INDEPENDENT EVENT</h4>
        </div>
        <div className="description lg-screen">
          <h5>
            <Icon name="clock" />FRIDAY 28 OCT 17:00-23:00 // 15 DAYS TO GO
          </h5>
          <h5>
            <Icon name="marker" />BRAEBURN THEATER OFF GITANGA //
            <a href="/maps">GET DIRECTIONS</a>
          </h5>
        </div>

        <ProductDisplayMenuTabs />

        <div className="description-wrap">

          <div className="product-image-wrapper">
            <div>
              <img src={productImage} alt="product" />
            </div>
          </div>

          <div className="information">
            <header>ABOUT THIS EVENT</header>
            <div className="description">
              <h5>
                <Icon name="clock" />FRIDAY 28 OCT 17:00-23:00 // 15 DAYS TO GO
              </h5>
              <h5>
                <Icon name="marker" />BRAEBURN THEATER OFF GITANGA //{' '}
                <a href="/maps">GET DIRECTIONS</a>
              </h5>
            </div>
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
    );
  }
}

export default ProductDisplay;
