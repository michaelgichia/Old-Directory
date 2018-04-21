/*
 *
 * PaymentModal
 *
 */

import React, { PropTypes } from 'react';
import ReactModal from 'react-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PaymentsMethods from './PaymentsMethods';
import ConfirmationPageTab from './ConfirmationPageTab';
import {
  setCardOrMpesaTabIndex,
  closeModal,
  setTicketModalTabIndex
} from './actions';
import { PAYMENTS_MODAL } from './constants';
import './css/payments.css';

export class PaymentModal extends React.Component {
  state = {
    cardInfo: {
      cardNumber: '',
      cvc: '',
      currency: '',
      expiresOn: ''
    }
  };

  handleCardInfo = e =>
    this.setState({
      cardInfo: { ...this.state.cardInfo, [e.target.id]: e.target.value }
    });

  render() {
    const {
      cardInfo,
      customer,
      ticketModalTabIndex,
      customerErrors,
      deliveryInfomation,
      deliveryInfomationErrors
    } = this.state;
    return (
      <ReactModal
        isOpen={this.props.paymentModal}
        contentLabel="onRequestClose"
        onRequestClose={() => this.props.closeModal()}
        className="py-modal"
        overlayClassName="py-overlay"
        aria={{
          labelledby: 'Checkout Form',
          describedby: 'This is checkout form with an mpesa and card option.'
        }}
      >
        <Tabs
          className="py__tabs"
          defaultFocus
          selectedIndex={this.props.ticketModalTabIndex}
          onSelect={(ticketModalTabIndex) => () => this.props.setTicketModalTabIndex(ticketModalTabIndex)}
        >
          <TabList className="py__tab-list">
            <Tab className="py__tab" ticketModalTabIndex="1">
              Payment
            </Tab>
            <Tab
              className="py__tab"
              ticketModalTabIndex="2"
              disabled={!this.props.mpesaPushStatus}
            >
              Confirmation
            </Tab>
          </TabList>
          <TabPanel>
            <PaymentsMethods
              cardInfo={cardInfo}
              goTabOne={() => this.props.setTicketModalTabIndex(0)}
              goTabTwo={() => this.props.setTicketModalTabIndex(1)}
              handleCardInfo={this.handleCardInfo}
              handleReturnToStore={() => this.props.closeModal()}
            />
          </TabPanel>
          <TabPanel>
            <ConfirmationPageTab
              handleCloseModal={() => {
                this.props.closeModal();
                this.props.dispatch({ type: 'CLEAR_MPESA_PUSH' });
              }}
            />
          </TabPanel>
        </Tabs>
      </ReactModal>
    );
  }
}

const mapStateToProps = ({ paymentSystem }) => ({
  paymentModal: paymentSystem.paymentModal,
  ticketModalTabIndex: paymentSystem.ticketModalTabIndex,
  mpesaPushStatus: paymentSystem.mpesaPushStatus,
  cardOrMpesaTabIndex: paymentSystem.cardOrMpesaTabIndex
});

const mapDispatchToProps = dispatch => ({
  setCardOrMpesaTabIndex: cardOrMpesaTabIndex =>
    dispatch(setCardOrMpesaTabIndex(cardOrMpesaTabIndex)),
  setTicketModalTabIndex: ticketModalTabIndex =>
    dispatch(setTicketModalTabIndex(cardOrMpesaTabIndex)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);