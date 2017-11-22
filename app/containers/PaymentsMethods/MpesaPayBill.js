/*
 *
 * MpesaPayBill
 *
 */

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import TabsBottomWrap from "components/TabsBottomWrap";
import TabsBodyWrap from "components/TabsBodyWrap";
import { PaymentButtons, BackButton } from "components/Buttons";
import "!!style-loader!css-loader!./mpesa-paybill.css";

export class MpesaPayBill extends PureComponent {
  render() {
    return (
      <div>
        <TabsBodyWrap>
          <p className="header">Follow these instructions to via PAYBILL</p>
          <div className="mpesa-paybill-wrap">
            <div>
              <p>1. Go to the M-Pesa menu</p>
              <p>2. Select Lipa na M-Pesa</p>
              <p>3. Select Paybill</p>
              <span>
                <p>4. Enter Business Number</p>
                <p>570937</p>
              </span>
              <span>
                <p>5. Enter Account Number</p>
                <p>FKJRBIW4</p>
              </span>
              <span>
                <p>6. Enter Amount</p>
                <p>Ksh. {this.props.totalTicketsPrice}</p>
              </span>
              <p>7. Enter your M-Pesa pin</p>
            </div>
          </div>
        </TabsBodyWrap>
        <TabsBottomWrap>
          <div>
            <BackButton
              id="store"
              bsKlass=""
              label="PREVIOUS"
              onClick={this.props.goMpesaPush}
            />
          </div>
          <div>
            <PaymentButtons
              id="nextOne"
              bsKlass="primary shadow"
              label="CONTINUE"
              onClick={() => this.props.dispatch({type: "PAYMENT_METHODS_TAB", tabIndex: 1})}
            />
          </div>
        </TabsBottomWrap>
      </div>
    );
  }
}

MpesaPayBill.proptypes = {
  goMpesaPush: React.PropTypes.func.isRequired,
  goTabThree: React.PropTypes.func.isRequired
}

export default connect(null, null)(MpesaPayBill);
