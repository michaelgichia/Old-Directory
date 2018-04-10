/*
 *
 * Payments
 *
 */

import React, { PropTypes } from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactModal from 'react-modal';
import PaymentsMethods from 'containers/PaymentsMethods';
import PaymentConfirmation from './PaymentConfirmation';
import injectReducer from "utils/injectReducer";
import reducer from './reducer';
import './css/payments.css';

export class Payments extends React.Component {
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
            <Tab className="py__tab" tabIndex="2">
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
            <PaymentConfirmation
              handleCloseModal={() =>
                this.props.dispatch({ type: 'PAYMENTS_MODAL_CLOSE' })
              }
            />
          </TabPanel>
        </Tabs>
      </ReactModal>
    );
  }
}

const mapStateToProps = ({ payments }) => ({
  paymentModal: payments.paymentModal,
  tabIndex: payments.tabIndex
});

const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'payments', reducer })

export default compose(withReducer, withConnect)(Payments);

// handleConfirmEmail = (email, confirmEmail) => {
//   const { customerErrors } = this.state;
//   if (confirmEmail.length < 1) {
//     this.setState(() => ({
//       customerErrors: {
//         ...customerErrors,
//         confirmEmailError: "You can't leave this empty."
//       }
//     }));
//   } else {
//     this.setState(() => ({
//       customerErrors:
//         email === confirmEmail
//           ? { ...customerErrors, confirmEmailError: "" }
//           : { ...customerErrors, confirmEmailError: "Emails don't match." }
//     }));
//   }
// };

//   handlePaymentMethod = () => {
//   const { customer, deliveryInfomation } = this.state;
//   this.props.dispatch({
//     type: "PAYMENTS_FORM_SUCCESS",
//     customer,
//     deliveryInfomation
//   });
//   this.setState(() => ({ tabIndex: 1 }));
// };