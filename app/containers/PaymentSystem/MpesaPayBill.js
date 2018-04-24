/*
 *
 * MpesaPayBill
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Icon, message } from 'antd';
import TabsBottomWrap from 'components/TabsBottomWrap';
import TabsBodyWrap from 'components/TabsBodyWrap';
import { PaymentButtons, BackButton } from 'components/Buttons';
import {
  PaymentButtonSecondary,
  PaymentButtonRipples
} from 'components/Buttons';
import { setTicketModalTabIndex, resetPaymentProcess, getManualOrderStatus } from './actions';
import { orderStatus } from './constants';
import './css/mpesa-paybill.css';

message.config({
  top: 400,
  duration: 5,
});

export class MpesaPayBill extends PureComponent {
  state = {
    orderPK: null
  };

  handlePreviousPage = () => {
    this.props.resetPaymentProcess();
    this.props.goMpesaPush();
  };

  _handleManualPayment = (evt) => {
    evt.preventDefault();
    // () => this.props.setTicketModalTabIndex(1)
  };

  _handleChange = evt => {
    this.setState({ orderPK: evt.target.value });
  };

  render() {
    const { orderPK } = this.state;
    console.log({mpesapaybill: this.props.orderStatus})
    const suffix =
      this.props.orderStatus === orderStatus.paybillPending ? (
        <Icon type="loading" />
      ) : null;

    return (
      <div>
        <form onSubmit={this._handleManualPayment}>
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
              <p>8. Note down the REF number</p>
            </div>
          </div>
          <div style={{ margin: 16 }}>
            <Input
              placeholder="Reference number(REF) from Mookh sms"
              suffix={suffix}
              value={orderPK}
              onChange={this._handleChange}
              required
            />
          </div>
        </TabsBodyWrap>
        <TabsBottomWrap>
          <div>
            <PaymentButtonSecondary
              id="store"
              onClick={this.handlePreviousPage}
              disabled={
                this.props.orderStatus === orderStatus.paybillPending ? true : false
              }
            >
              PREVIOUS
            </PaymentButtonSecondary>
          </div>
          <div>
            <PaymentButtonRipples
              id="nextOne"
              type="button"
              onClick={() => this.props.getManualOrderStatus(this.props.orderId, this.state.orderPK)}
              disabled={
                this.props.orderStatus === orderStatus.paybillPending ? true : false
              }
            >
              {this.props.orderStatus === orderStatus.paybillPending ? "VERYFYING...":"VERYFY PAYMENT" }
            </PaymentButtonRipples>
          </div>
        </TabsBottomWrap>
        </form>
      </div>
    );
  }
}

MpesaPayBill.proptypes = {
  goMpesaPush: PropTypes.func.isRequired,
  goTabTwo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setTicketModalTabIndex: ticketModalTabIndex =>
    dispatch(setTicketModalTabIndex(ticketModalTabIndex)),
  resetPaymentProcess: () => dispatch(resetPaymentProcess()),
  getManualOrderStatus: (orderId, orderPK) =>
    dispatch(getManualOrderStatus(orderId, orderPK))
});

const mapStateToProps = ({ paymentSystem }) => ({
  totalTicketsPrice: paymentSystem.totalTicketsPrice,
  orderId: paymentSystem.orderId,
  orderStatus: paymentSystem.orderStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(MpesaPayBill);