import React, { PureComponent } from "react";
import MookhInput from "components/Forms/MookhInput";
import MookhInputWithBtn from "components/Forms/MookhInputWithBtn";
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

    return (
      <form onSubmit={e => e.preventDefault()}>
        <header className="pm-header">Personal information</header>
        <div className="pm-row">
          <MookhInput
            labelName="Full name"
            id="name"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            onChange={this.props.handleCustomerInfo}
            onBlur={() => this.props.onBlur(name)}
            value={name}
            type="text"
            required={true}
          />
          <MookhInput
            labelName="Phone number"
            id="phone_number"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            onChange={this.props.handleCustomerInfo}
            onBlur={() => this.props.onBlur(phone_number)}
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
            inputError=""
            onChange={this.props.handleCustomerInfo}
            onBlur={() => this.props.onBlur(email)}
            value={email}
            type="email"
            required={true}
          />
          <MookhInput
            labelName="Confirm E-mail address"
            id="confirmEmail"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            onChange={this.props.handleCustomerInfo}
            onBlur={() => this.props.onBlur(confirmEmail)}
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
            inputError=""
            onChange={this.props.handleCustomerInfo}
            onBlur={() => this.props.onBlur(location)}
            value={location}
            type="text"
            required={true}
          />
          <MookhInput
            labelName="Street address"
            id="streetAddress"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            onChange={this.props.handleCustomerInfo}
            onBlur={() => this.props.onBlur(streetAddress)}
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
            inputError=""
            onChange={this.props.handleCustomerInfo}
            onBlur={() => this.props.onBlur(apartment)}
            value={apartment}
            type="text"
            required={true}
          />
          <MookhInputWithBtn
            labelName="Delivery cost estimate"
            id="deliveryCost"
            placeholder="KSH. 00.00"
            wrapClass="payment-input"
            inputError=""
            onChange={this.props.handleCustomerInfo}
            onBlur={() => this.props.onBlur(deliveryCost)}
            value={deliveryCost}
            type="text"
            required={true}
          />
        </div>
      </form>
    );
  }
}
