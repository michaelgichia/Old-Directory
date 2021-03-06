/*
 *
 * MpesaPayBill
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Icon } from 'antd';
import TabsBottomWrap from 'components/TabsBottomWrap';
import TabsBodyWrap from 'components/TabsBodyWrap';
import { PaymentButtons, BackButton } from 'components/Buttons';
import {
  PaymentButtonSecondary,
  PaymentButtonRipples
} from 'components/Buttons';
import { H5Error } from './StyledComponents';
import {
  setTicketModalTabIndex,
  closeModal,
  closeModalAndPayment
} from './actions';
import { orderStatus } from './constants';
import './css/mpesa-paybill.css';

export class MpesaPayBill extends PureComponent {
  state = {
    orderPK: '',
    error: null
  };

  _handleChange = evt => {
    this.setState({ orderPK: evt.target.value });
  };

  _handleCloseModal = () => {
    this.props.closeModalAndPayment();
    this.props.closeModal();
  };

  _handleVerifyOrderNumber = evt => {
    evt.preventDefault();
    if (this.state.orderPK.length < 1) {
      this.setState({ error: 'Order REF cannot be empty!' });
    }
    if (this.props.orderPK !== this.state.orderPK) {
      this.setState({ error: 'Order REF is not valid' });
    } else {
      this.props.setTicketModalTabIndex(1);
    }
  };

  render() {
    const { orderPK, error } = this.state;

    return (
      <div>
        <form onSubmit={this._handleVerifyOrderNumber}>
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
              {error && <H5Error>{error}</H5Error>}
              <Input
                placeholder="Reference number(REF) from Mookh sms"
                value={orderPK}
                onChange={this._handleChange}
              />
            </div>
          </TabsBodyWrap>
          <TabsBottomWrap>
            <div>
              <PaymentButtonRipples id="nextOne" type="submit">
                VERYFY PAYMENT
              </PaymentButtonRipples>
            </div>
            <div>
              <PaymentButtonSecondary
                id="store"
                onClick={this._handleCloseModal}
              >
                RETURN TO STORE
              </PaymentButtonSecondary>
            </div>
          </TabsBottomWrap>
        </form>
      </div>
    );
  }
}

MpesaPayBill.proptypes = {
  goMpesaPush: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setTicketModalTabIndex: ticketModalTabIndex =>
    dispatch(setTicketModalTabIndex(ticketModalTabIndex)),
  closeModal: () => dispatch(closeModal()),
  closeModalAndPayment: () => dispatch(closeModalAndPayment())
});

const mapStateToProps = ({ paymentSystem }) => ({
  totalTicketsPrice: paymentSystem.totalTicketsPrice,
  orderId: paymentSystem.orderId,
  orderStatus: paymentSystem.orderStatus,
  orderPK: paymentSystem.orderPK
});

export default connect(mapStateToProps, mapDispatchToProps)(MpesaPayBill);

// <div>
//   <PaymentButtonSecondary
//     id="store"
//     onClick={this.handlePreviousPage}
//   >
//     PREVIOUS
//   </PaymentButtonSecondary>
// </div>