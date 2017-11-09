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
import { PaymentButtons } from "components/Buttons";
import { InputConstants } from "./constants";
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

  goTabOne = () => this.setState(() => ({ tabIndex: 0 }));

  goTabThree = () => this.setState(() => ({ tabIndex: 2 }));

  handleCustomerInfo = e =>
    this.setState({
      customer: { ...this.state.customer, [e.target.id]: e.target.value }
    });

  handleCardInfo = e =>
    this.setState({
      cardInfo: { ...this.state.cardInfo, [e.target.id]: e.target.value }
    });

  handleContinue = () => {
    const { customer } = this.state;
    Object.entries(customer).forEach(([key, value]) => {
      if (value.length < 1) {
        res = false;
      } else {
        res = true;
      }
    });
    return res;
  };

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

  handleTabsSwitch = (tabIndex, lastIndex, e) => this.setState(() => ({ tabIndex }));

  handlePaymentMethod = () => {
    const { customer, deliveryInfomation } = this.state;
    this.props.dispatch({
      type: "PAYMENTS_FORM_SUCCESS",
      customer,
      deliveryInfomation
    });
    this.setState(() => ({ tabIndex: 1 }));
  };

  handleEmptyCustomerInfo = () => {
    const { customer, customerErrors } = this.state;
    const newCustomerErrors = { ...customerErrors };
    Object.entries(customer).forEach(([key, value]) => {
      if (value.length < 1) {
        newCustomerErrors[`${key}Error`] = "You can't leave this empty.";
      }
    });
    this.setState(() => ({ customerErrors: newCustomerErrors }));
  };

  disableBtn = (customer, customerErrors) => {
    let res = 0;
    Object.entries(customer).forEach(([key, value]) => {
      if (value.length < 1) {
        res += 1;
      } else {
        res;
      }
    });
    Object.entries(customerErrors).forEach(([key, value]) => {
      if (value.length > 1) {
        res += 1;
      } else {
        res;
      }
    });
    return res < 1;
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
          this.props.dispatch({ type: "PAYMENTS_MODAL_ERROR" })}
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
          selectedIndex={this.state.tabIndex}
          onSelect={(tabIndex, lastIndex, e) =>
            this.handleTabsSwitch(tabIndex, lastIndex, e)}
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
            />
          </TabPanel>
          <TabPanel>
            <PaymentConfirmation
              handleCloseModal={() =>
                this.props.dispatch({ type: "PAYMENTS_MODAL_ERROR" })}
            />
          </TabPanel>
        </Tabs>
      </ReactModal>
    );
  }
}

const mapStateToProps = ({ payments, buyTicket }) => ({
  paymentModal: payments.paymentModal,
});

export default connect(mapStateToProps, null)(Payments);