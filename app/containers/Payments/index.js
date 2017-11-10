/*
 *
 * Payments
 *
 */

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactModal from "react-modal";
import PaymentInformationForm from "components/Forms/PaymentInformationForm";
import PaymentsMethods from "containers/PaymentsMethods";
import PaymentConfirmation from "./PaymentConfirmation";
import "!!style-loader!css-loader!./css/payments.css";

export class Payments extends React.Component {
  state = {
    paymentModal: false,
    cardInfo: {
      cardNumber: "",
      cvc: "",
      currency: "",
      expiresOn: ""
    },
    tabIndex: 0
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.paymentModal !== nextProps.paymentModal) {
      this.setState(() => ({ paymentModal: nextProps.paymentModal }));
    }
  }

  goTabOne = () => this.setState({ tabIndex: 0 });

  goTabThree = () => this.setState({ tabIndex: 1 });

  handleCardInfo = e =>
    this.setState({
      cardInfo: { ...this.state.cardInfo, [e.target.id]: e.target.value }
    });

  handleConfirmEmail = (email, confirmEmail) => {
    const { customerErrors } = this.state;
    if (confirmEmail.length < 1) {
      this.setState(() => ({
        customerErrors: {
          ...customerErrors,
          confirmEmailError: "You can't leave this empty."
        }
      }));
    } else {
      this.setState(() => ({
        customerErrors:
          email === confirmEmail
            ? { ...customerErrors, confirmEmailError: "" }
            : { ...customerErrors, confirmEmailError: "Emails don't match." }
      }));
    }
  };

  handlePaymentMethod = () => {
    const { customer, deliveryInfomation } = this.state;
    this.props.dispatch({
      type: "PAYMENTS_FORM_SUCCESS",
      customer,
      deliveryInfomation
    });
    this.setState(() => ({ tabIndex: 1 }));
  };

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
        isOpen={this.state.paymentModal}
        contentLabel="onRequestClose Example"
        onRequestClose={() =>
          this.props.dispatch({ type: "PAYMENTS_MODAL_ERROR" })
        }
        className="py-modal"
        overlayClassName="py-overlay"
        aria={{
          labelledby: "Checkout Form",
          describedby: "This is checkout form with an mpesa and card options."
        }}
      >
        <Tabs
          className="py__tabs"
          defaultFocus
          selectedIndex={this.props.tabIndex}
          onSelect={(tabIndex, lastIndex, e) =>
            this.props.dispatch({ type: "PAYMENT_METHODS_TAB", tabIndex })
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
              goTabOne={this.goTabOne}
              goTabThree={this.goTabThree}
              handleCardInfo={this.handleCardInfo}
              handleReturnToStore={() =>
                this.props.dispatch({ type: "PAYMENTS_MODAL_ERROR" })
              }
            />
          </TabPanel>
          <TabPanel>
            <PaymentConfirmation
              handleCloseModal={() =>
                this.props.dispatch({ type: "PAYMENTS_MODAL_CLOSE" })
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

export default connect(mapStateToProps, null)(Payments);
