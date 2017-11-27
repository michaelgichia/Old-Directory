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
            <div className="mpesa-push-div1">
              <p>Follow these instructions to complete transaction</p>
              <p>
                Check your phone and follow the instructions on your screen.
              </p>
              {this.props.mpesaInitiated ? (
                <div className="mpesa-push-loader-wrap">
                  <div className="mpesa-spinner" />
                  <p className="mpesa-push-p3">Please wait a few seconds as we process your order...</p>
                </div>
              ) : (
                <p />
              )}
            </div>
            <div className="mpesa-push-div2">
              <img src={MpesaPushImage} alt="" />
            </div>
          </div>
        </TabsBodyWrap>
        <TabsBottomWrap>
          <div>
            <PaymentButtons
              id="pay"
              bsKlass="primary ripple btn-reposition"
              label="PAY NOW"
              onClick={this.props.handlePayment}
            />
          </div>
          <div>
            <PaymentButtons
              id="store"
              bsKlass="secondary ripple"
              label="RETURN TO STORE"
              onClick={this.props.handleReturnToStore}
            />
          </div>
        </TabsBottomWrap>
      </div>
    );
  }
}

MpesaPush.proptypes = {
  mpesaInitiated: React.PropTypes.bool.isRequired,
  goToPayBill: React.PropTypes.func.isRequired
};

export default MpesaPush;
