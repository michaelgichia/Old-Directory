/*
 *
 * MpesaPush
 *
 */

import React, { PureComponent } from "react";
import MpesaPushImage from "./MpesaPushImage.png";
import TabsBottomWrap from "components/TabsBottomWrap";
import TabsBodyWrap from "components/TabsBodyWrap";
import { PaymentButtons, BackButton } from "components/Buttons";

import "!!style-loader!css-loader!./mpesa-push.css";

export class MpesaPush extends PureComponent {
  render() {
    return (
      <div>
        <TabsBodyWrap>
          <div className="mpesa-push-wrap">
            <div>
              <p>Follow these instructions to complete transaction</p>
              <p>
                Check your phone and follow the instructions on your screen.
              </p>
              {this.props.mpesaInitiated ? (
                <p>
                  If nothing appears in the next 10 seconds,<a onClick={this.props.goToPayBill}>click here</a>
                </p>
              ) : (
                <p />
              )}
            </div>
            <div>
              <img src={MpesaPushImage} alt="" />
            </div>
          </div>
        </TabsBodyWrap>
        <TabsBottomWrap>
          <BackButton
            id="store"
            bsKlass=""
            label="PREVIOUS"
            onClick={this.props.goTabOne}
          />
        </TabsBottomWrap>
      </div>
    );
  }
}

MpesaPush.proptypes = {
  goTabOne: React.PropTypes.func.isRequired,
  mpesaInitiated: React.PropTypes.bool.isRequired,
  goToPayBill: React.PropTypes.func.isRequired
};

export default MpesaPush;