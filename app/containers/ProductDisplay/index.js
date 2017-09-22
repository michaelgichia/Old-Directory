/*
 *
 * ProductDisplay
 *
 */

import React from 'react';
import ProductDisplayMenuTabs from 'components/ProductDisplayMenuTabs';
import '!!style-loader!css-loader!./product-display.css';
import productImage from './product-banner.jpg';


export class ProductDisplay extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="product-wrap">
        <div className="product-title lg-screen">
          <h3>TEDx LAVINGTON WOMEN: INDEPENDENT EVENT</h3>
        </div>
        <div className="description lg-screen">
          <h5>FRIDAY 28 OCT 17:00-23:00 // 15 DAYS TO GO</h5>
          <h5>BRAEBURN THEATER OFF GITANGA // GET DIRECTIONS</h5>
        </div>

        <ProductDisplayMenuTabs />

        <div className="description-wrap">

          <div className="grid-33">
            <div>
              <img src={productImage} alt="product" />
            </div>
          </div>

          <div className="grid-66 information">
            <header>ABOUT THIS EVENT</header>
            <span>FRIDAY 28 OCT 2016 17:00-23:00</span>
            <span>BRAEBURN THEATER OFF-GATANGA ROAD // GET DIRECTIONS</span>
            <p>
              Amplify the voice of Kenyan women on a global platform through TED Talks. Print this page to PDF for thr complete set of vectors. Or to use thr desltop, install FontAwesome.ptf,
              set it as thr font in your application, and copy and paste the icons (not the unicode) directly from
              this page intp your designs
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
