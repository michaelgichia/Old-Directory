/*
 *
 * ProductPayment
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
import "!!style-loader!css-loader!./css/productpayment.css";

export class ProductPayment extends React.Component {
  state = {
    paymentModal: false,
    // customer: {
    //   email: "mqyynm@gmail.com",
    //   name: "Michael",
    //   phone_number: "254701872069",
    //   confirmEmail: "mqyynm@gmail.com"
    // },
    // deliveryInfomation: {
    //   location: "Nairobi",
    //   streetAddress: "Kasarani",
    //   apartment: "Israel",
    //   deliveryCost: 1000
    // },
    deliveryInfomation: {
      location: "",
      streetAddress: "",
      apartment: "",
      deliveryCost: ""
    },
    customer: {
      email: "",
      name: "",
      phone_number: "",
      confirmEmail: ""
    },
    customerErrors: {
      emailError: "",
      phone_numberError: "",
      confirmEmailError: "",
      nameError: ""
    },
    deliveryInfomationErrors: {
      locationError: "",
      streetAddressError: "",
      apartmentError: "",
      deliveryCostError: ""
    },
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

  handleDeliveryInfomation = e =>
    this.setState({
      deliveryInfomation: {
        ...this.state.deliveryInfomation,
        [e.target.id]: e.target.value
      }
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

  onBlur = (e, name) => {
    e.persist();
    const { customerErrors } = this.state;
    const { value } = e.target;
    const requiredFields = ["name", "confirmEmail", "phone_number", "email"];

    if (requiredFields.indexOf(name) > -1 && value.length < 1) {
      this.setState(() => ({
        customerErrors: {
          ...customerErrors,
          [`${name}Error`]: "You can't leave this empty."
        }
      }));
    } else {
      this.setState(() => ({
        customerErrors: InputConstants[name]["regex"].test(value)
          ? { ...customerErrors, [`${name}Error`]: "" }
          : {
              ...customerErrors,
              [`${name}Error`]: InputConstants[name].error
            }
      }));
    }
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

  handleTabsSwitch = (tabIndex, lastIndex, e) => {
    e.persist();
    const { customer, deliveryInfomation, customerErrors } = this.state;
    if (lastIndex === 0 && this.disableBtn(customer, customerErrors)) {
      this.props.dispatch({
        type: "PAYMENTS_FORM_SUCCESS",
        customer,
        deliveryInfomation
      });
      this.setState(() => ({ tabIndex }));
    } else if (lastIndex === 1 || lastIndex === 2) {
      this.setState(() => ({ tabIndex }));
    } else {
      this.handleEmptyCustomerInfo();
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
            <Tab className="py__tab" tabIndex="0">
              Information
            </Tab>
            <Tab className="py__tab" tabIndex="1">
              Payment
            </Tab>
            <Tab className="py__tab" tabIndex="2">
              Confirmation
            </Tab>
          </TabList>
          <TabPanel>
            <PaymentInformationForm
              customer={customer}
              onBlur={this.onBlur}
              customerErrors={customerErrors}
              deliveryInfomation={deliveryInfomation}
              handleReturnToStore={() =>
                this.props.dispatch({ type: "PAYMENTS_MODAL_ERROR" })}
              handleCustomerInfo={this.handleCustomerInfo}
              handleConfirmEmail={this.handleConfirmEmail}
              deliveryInfomationErrors={deliveryInfomationErrors}
              handleDeliveryInfomation={this.handleDeliveryInfomation}
              handleContinue={
                !this.disableBtn(customer, customerErrors)
                  ? this.handleEmptyCustomerInfo
                  : this.handlePaymentMethod
              }
            />
          </TabPanel>
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

ProductPayment.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ payments, buyTicket }) => ({
  paymentModal: payments.paymentModal,
});

export default connect(mapStateToProps, null)(ProductPayment);