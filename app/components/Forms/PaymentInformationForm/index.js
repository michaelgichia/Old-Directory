import React, { PureComponent } from "react";
import MookhInput from "components/Forms/MookhInput";
import MookhInputWithBtn from "components/Forms/MookhInputWithBtn";
import { PaymentButtons } from "components/Buttons";
import "!!!style-loader!css-loader!./payment-information.css";

export default class PaymentInformationForm extends PureComponent {
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <header className="pm-header">Personal information</header>
        <div className="pm-row">
          <MookhInput
            labelName="Full name"
            id="fullName"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            type="text"
          />
          <MookhInput
            labelName="Phone number"
            id="phoneNumber"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            type="tel"
          />
        </div>
        <div className="pm-row">
          <MookhInput
            labelName="E-mail address"
            id="fullName"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            type="email"
          />
          <MookhInput
            labelName="Confirm E-mail address"
            id="phoneNumber"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            type="email"
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
            type="text"
          />
          <MookhInput
            labelName="Street address"
            id="streetAddress"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            type="text"
          />
        </div>
        <div className="pm-row">
          <MookhInput
            labelName="Apartment/building number"
            id="apartment"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            type="text"
          />
          <MookhInputWithBtn
            labelName="Delivery cost estimate"
            id="deliveryCost"
            placeholder=""
            wrapClass="payment-input"
            inputError=""
            type="text"
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
      </form>
    );
  }
}
