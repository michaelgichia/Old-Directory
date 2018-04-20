/*
 *
 * MpesaPayBill
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TabsBottomWrap from 'components/TabsBottomWrap';
import TabsBodyWrap from 'components/TabsBodyWrap';
import { PaymentButtons, BackButton } from 'components/Buttons';
import {
  PaymentButtonSecondary,
  PaymentButtonRipples
} from 'components/Buttons';

import './mpesa-paybill.css';

export class MpesaPayBill extends PureComponent {
  render() {
    return (
      <div>
        <TabsBodyWrap>
          <p className="mpb__header">
            Payment was not successful. Please follow the instructions to via
            PAYBILL.
          </p>
          <div className="mpesa-paybill-wrap">
            <div>
              <p>1. Go to the M-Pesa menu</p>
              <p>2. Select Lipa na M-Pesa</p>
              <p>3. Select Paybill</p>
              <span>
                <p>4. Enter Business Number</p>
                <p>570936</p>
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
            <PaymentButtonSecondary id="store" onClick={this.props.goMpesaPush}>
              PREVIOUS
            </PaymentButtonSecondary>
          </div>
          <div>
            <PaymentButtonRipples
              id="nextOne"
              onClick={() =>
                this.props.dispatch({
                  type: 'PAYMENT_METHODS_TAB',
                  tabIndex: 1
                })
              }
            >
              CONTINUE
            </PaymentButtonRipples>
          </div>
        </TabsBottomWrap>
      </div>
    );
  }
}

MpesaPayBill.proptypes = {
  goMpesaPush: PropTypes.func.isRequired,
  goTabThree: PropTypes.func.isRequired
};

export default connect()(MpesaPayBill);
