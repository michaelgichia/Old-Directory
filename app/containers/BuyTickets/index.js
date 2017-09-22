/*
 *
 * BuyTickets
 *
 */

import React from 'react';
import ProductDisplayMenuTabs from 'components/ProductDisplayMenuTabs';
import '!!style-loader!css-loader!./buy-tickets.css';
import productImage from './product-banner.jpg';

export class BuyTickets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="buy-ticket-information lg-screen">
          <span>FRIDAY 28 OCT 17:00-23:00 // 15 DAYS TO GO</span>
          <span>BRAEBURN THEATER OFF GITANGA // GET DIRECTIONS</span>
        </div>
        <ProductDisplayMenuTabs />
        <div className="description-wrap">
          <div className="grid-33">
            <div>
              <img src={productImage} alt="product" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyTickets;
