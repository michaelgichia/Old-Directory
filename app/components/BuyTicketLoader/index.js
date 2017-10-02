/**
*
* BuyTicketLoader
*
*/

import React from 'react';
import EventNavBar from "containers/EventNavBar";
import '!!style-loader!css-loader!./loading-spinner.css';

export const BuyTicketLoader = WrapperComponent =>
  class BuyTicketLoader extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
      return (
        <div>
          <EventNavBar />
          <div className="loader-wrap">
            <div className="loader">Loading...</div>
          </div>
        </div>
      );
    }
  }


