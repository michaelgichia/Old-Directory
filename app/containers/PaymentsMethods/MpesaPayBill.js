/*
 *
 * MpesaPayBill
 *
 */

import React, { PureComponent } from "react";
import TabsBottomWrap from "components/TabsBottomWrap";
import TabsBodyWrap from "components/TabsBodyWrap";
import { PaymentButtons } from "components/Buttons";
import "!!style-loader!css-loader!./mpesa-paybill.css";

export class MpesaPayBill extends PureComponent {
  render() {
    return (
      <div>
        <TabsBodyWrap>
          <p className="header">Follow these instructions to via PAYBILL</p>
          <div className="mpesa-paybill-wrap">
            <div>
              <p>Go to the M-Pesa menu</p>
              <p>Select Lipa na M-Pesa</p>
              <p>Select Paybill</p>
              <span>
                <p>Enter Business Number</p>
                <p>570937</p>
              </span>
              <span>
                <p>Enter Account Number</p>
                <p>FKJRBIW4</p>
              </span>
              <span>
                <p>Enter Amount</p>
                <p>Ksh. 1750</p>
              </span>
              <p>Enter your M-Pesa pin</p>
            </div>
            <div>
              <span>Please wait while your order is being</span>
              <span>processed...</span>
              <span>100% Done</span>
            </div>
          </div>
        </TabsBodyWrap>
        <TabsBottomWrap>
          <div>
            <PaymentButtons
              id="store"
              bsKlass="secondary shadow"
              label="PREVIOUS"
            />
          </div>
          <div>
            <PaymentButtons
              id="nextOne"
              bsKlass="primary shadow"
              label="CONTINUE"
            />
          </div>
        </TabsBottomWrap>
      </div>
    );
  }
}

export default MpesaPayBill;
