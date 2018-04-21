/*
 *
 * PaymentModal
 *
 */

import React, { PropTypes } from 'react';
import ReactModal from 'react-modal';
import { compose } from "redux";
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PaymentsMethods from './PaymentsMethods';
import ConfirmationPageTab from './ConfirmationPageTab';
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
      tabIndex,
      customerErrors,
      deliveryInfomation,
      deliveryInfomationErrors
    } = this.state;
    return (
      <ReactModal
        isOpen={this.props.paymentModal}
        contentLabel="onRequestClose"
        onRequestClose={() =>
          this.props.dispatch({ type: 'PAYMENTS_MODAL_CLOSE' })
        }
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
          selectedIndex={this.props.tabIndex}
          onSelect={(tabIndex, lastIndex, e) =>
            this.props.dispatch({ type: 'PAYMENT_METHODS_TAB', tabIndex })
          }
        >
          <TabList className="py__tab-list">
            <Tab className="py__tab" tabIndex="1">
              Payment
            </Tab>
            <Tab className="py__tab" tabIndex="2" disabled={!this.props.mpesaPushStatus}>
              Confirmation
            </Tab>
          </TabList>
          <TabPanel>
            <PaymentsMethods
              cardInfo={cardInfo}
              goTabOne={() =>
                this.props.dispatch({
                  type: 'PAYMENT_METHODS_TAB',
                  tabIndex: 0
                })
              }
              goTabThree={() =>
                this.props.dispatch({
                  type: 'PAYMENT_METHODS_TAB',
                  tabIndex: 1
                })
              }
              handleCardInfo={this.handleCardInfo}
              handleReturnToStore={() =>
                this.props.dispatch({ type: 'PAYMENTS_MODAL_ERROR' })
              }
            />
          </TabPanel>
          <TabPanel>
            <ConfirmationPageTab
              handleCloseModal={() => {
                this.props.dispatch({ type: 'PAYMENTS_MODAL_CLOSE' });
                this.props.dispatch({ type: 'CLEAR_MPESA_PUSH'});
              }
              }
            />
          </TabPanel>
        </Tabs>
      </ReactModal>
    );
  }
}

const mapStateToProps = ({ paymentSystem }) => ({
  paymentModal: paymentSystem.paymentModal,
  tabIndex: paymentSystem.tabIndex,
  mpesaPushStatus: paymentSystem.mpesaPushStatus
});

export default connect(mapStateToProps, null)(PaymentModal);
