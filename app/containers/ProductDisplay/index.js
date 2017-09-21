/*
 *
 * ProductDisplay
 *
 */

import React from 'react';
import '!!style-loader!css-loader!./product-display.css';


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
      </div>
    );
  }
}

export default ProductDisplay;
