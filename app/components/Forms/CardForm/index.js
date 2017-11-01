import React, { PureComponent } from "react";
import MookhInput from "components/Forms/MookhInput";
import "!!style-loader!css-loader!./card-form.css";

export default class CardForm extends PureComponent {
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <header className="cd-header" />
        <div className="cd-row">
          <MookhInput
            labelName="Card number"
            id="card-number"
            placeholder="0000"
            wrapClass="cd-payment-input"
            inputError=""
            type="number"
          />
          <div className="cd-payment-input">
            <MookhInput
              labelName="CVC"
              id="cvc"
              placeholder=""
              wrapClass="cvc"
              inputError=""
              type="tel"
            />
            <MookhInput
              labelName="Currency"
              id="currency"
              placeholder="USD"
              wrapClass="cvc"
              inputError=""
              type="number"
            />
          </div>
        </div>
        <div className="cd-row">
          <MookhInput
            labelName="Expires on"
            id="expires-on"
            placeholder="MM/YY"
            wrapClass="cd-payment-input"
            inputError=""
            type="email"
          />
          <div className="cd-payment-input total">
            <span>Total:</span>
            <span>$165.99</span>
          </div>
        </div>
      </form>
    );
  }
}