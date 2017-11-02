/*
 *
 * PaymentInformationForm
 *
 */

import React, { PureComponent } from "react";
import MookhInput from "components/Forms/MookhInput";
import MookhInputWithBtn from "components/Forms/MookhInputWithBtn";
import TabsBottomWrap from "components/TabsBottomWrap";
import TabsBodyWrap from "components/TabsBodyWrap";
import { PaymentButtons } from "components/Buttons";
import "!!!style-loader!css-loader!./payment-information.css";

export default class PaymentInformationForm extends PureComponent {
  render() {
    const {
      name,
      phone_number,
      email,
      confirmEmail,
      location,
      streetAddress,
      apartment,
      deliveryCost
    } = this.props.customer;

    const {
      emailError,
      phone_numberError,
      confirmEmailError,
      nameError,
      locationError,
      streetAddressError,
      apartmentError,
      deliveryCostError
    } = this.props.inputErrors;

    return (
      <div>
        <TabsBodyWrap>
          <form onSubmit={e => e.preventDefault()}>
            <header className="pm-header">Personal information</header>
            <div className="pm-row">
              <MookhInput
                labelName="Full name"
                id="name"
                placeholder=""
                wrapClass="payment-input"
                inputError={nameError}
                onChange={this.props.handleCustomerInfo}
                onBlur={e => this.props.onBlur(e, "name")}
                value={name}
                type="text"
                required={true}
              />
              <MookhInput
                labelName="Phone number"
                id="phone_number"
                placeholder=""
                wrapClass="payment-input"
                inputError={phone_numberError}
                onChange={this.props.handleCustomerInfo}
                onBlur={e => this.props.onBlur(e, "phone_number")}
                value={phone_number}
                type="tel"
                required={true}
              />
            </div>
            <div className="pm-row">
              <MookhInput
                labelName="E-mail address"
                id="email"
                placeholder=""
                wrapClass="payment-input"
                inputError={emailError}
                onChange={this.props.handleCustomerInfo}
                onBlur={e => this.props.onBlur(e, "email")}
                value={email}
                type="email"
                required={true}
              />
              <MookhInput
                labelName="Confirm E-mail address"
                id="confirmEmail"
                placeholder=""
                wrapClass="payment-input"
                inputError={confirmEmailError}
                onChange={this.props.handleCustomerInfo}
                onBlur={() =>
                  this.props.handleConfirmEmail(email, confirmEmail)}
                value={confirmEmail}
                type="email"
                required={true}
              />
            </div>
            <header className="pm-header">Delivery information</header>
            <div className="pm-row">
              <MookhInput
                labelName="Region/location"
                id="location"
                placeholder=""
                wrapClass="payment-input"
                inputError={locationError}
                onChange={this.props.handleCustomerInfo}
                onBlur={e => this.props.onBlur(e, "location")}
                value={location}
                type="text"
                required={true}
              />
              <MookhInput
                labelName="Street address"
                id="streetAddress"
                placeholder=""
                wrapClass="payment-input"
                inputError={streetAddressError}
                onChange={this.props.handleCustomerInfo}
                onBlur={e => this.props.onBlur(e, "streetAddress")}
                value={streetAddress}
                type="text"
                required={true}
              />
            </div>
            <div className="pm-row">
              <MookhInput
                labelName="Apartment/building number"
                id="apartment"
                placeholder=""
                wrapClass="payment-input"
                inputError={apartmentError}
                onChange={this.props.handleCustomerInfo}
                onBlur={e => this.props.onBlur(e, "apartment")}
                value={apartment}
                type="text"
                required={true}
              />
              <MookhInputWithBtn
                labelName="Delivery cost estimate"
                id="deliveryCost"
                placeholder="KSH. 00.00"
                wrapClass="payment-input"
                inputError={deliveryCostError}
                onChange={this.props.handleCustomerInfo}
                onBlur={e => this.props.onBlur(e, "deliveryCost")}
                value={deliveryCost}
                type="text"
                required={true}
              />
            </div>
          </form>
        </TabsBodyWrap>
        <TabsBottomWrap>
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
        </TabsBottomWrap>
      </div>
    );
  }
}