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
import "!!style-loader!css-loader!./payments.css";

export class Payments extends React.Component {
  state = {
    showModal: true,
    customer: {
      email: "mqyynm@gmail.com",
      name: "Michael",
      phone_number: "254701872069",
      confirmEmail: "mqyynm@gmail.com",
      location: "Nairobi",
      streetAddress: "Kasarani",
      apartment: "Israel",
      deliveryCost: 1000
    },
    inputErrors: {
      emailError: "",
      phone_numberError: "",
      confirmEmailError: "",
      nameError: "",
      locationError: "",
      streetAddressError: "",
      apartmentError: "",
      deliveryCostError: ""
    }
  };

  handleCustomerInfo = e =>
    this.setState({
      customer: { ...this.state.customer, [e.target.id]: e.target.value }
    });

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  onBlur = (e, name) => {
    e.persist();
    const { inputErrors } = this.state;
    const { value } = e.target;
    const requiredFields = ["name", "confirmEmail", "phone_number", "email"];

    if (requiredFields.indexOf(name) > -1 && value.length < 1) {
      this.setState(() => ({
        inputErrors: {
          ...inputErrors,
          [`${name}Error`]: "You can't leave this empty."
        }
      }));
    } else {
      this.setState(() => ({
        inputErrors: InputConstants[name]["regex"].test(value)
          ? { ...inputErrors, [`${name}Error`]: "" }
          : {
              ...inputErrors,
              [`${name}Error`]: InputConstants[name].error
            }
      }));
    }
  };

  handleConfirmEmail = (email, confirmEmail) => {
    const { inputErrors } = this.state;
    if (confirmEmail.length < 1) {
      this.setState(() => ({
        inputErrors: {
          ...inputErrors,
          confirmEmailError: "You can't leave this empty."
        }
      }));
    } else {
      this.setState(() => ({
        inputErrors:
          email === confirmEmail
            ? { ...inputErrors, confirmEmailError: "" }
            : { ...inputErrors, confirmEmailError: "Emails don't match." }
      }));
    }
  };

  render() {
    const { customer, inputErrors } = this.state;

    return (
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <Tabs>
          <TabList className="py__tab-list">
            <Tab className="py__tab">Information</Tab>
            <Tab className="py__tab">Payment</Tab>
            <Tab className="py__tab">Confirmation</Tab>
          </TabList>
            <TabPanel>
              <div className="information-form">
                <PaymentInformationForm
                  customer={customer}
                  onBlur={this.onBlur}
                  inputErrors={inputErrors}
                  handleConfirmEmail={this.handleConfirmEmail}
                  handleCustomerInfo={this.handleCustomerInfo}
                />
            </div>
            <div className="mookh-btn-wrap">
              <div>
                <PaymentButtons
                  id="store"
                  bsKlass="secondary shadow"
                  label="RETURN TO STORE"
                />
              </div>
              <div>
                <PaymentButtons
                  id="nextOne"
                  bsKlass="primary shadow"
                  label="CONTINUE"
                />
              </div>
            </div>
            </TabPanel>
            <TabPanel>
              <PaymentsMethods />
            </TabPanel>
            <TabPanel>
              <PaymentConfirmation />
            </TabPanel>
        </Tabs>
      </ReactModal>
    );
  }
}

Payments.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(Payments);
