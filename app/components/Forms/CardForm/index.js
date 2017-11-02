import React, { PureComponent } from "react";
import MookhInput from "components/Forms/MookhInput";
import "!!style-loader!css-loader!./card-form.css";

export default class CardForm extends PureComponent {
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <div className="cd-row">
          <MookhInput
            labelName="Card number"
            id="card-number"
            placeholder="0000"
            onChange={this.props.handleCustomerInfo}
            onBlur={e => this.props.onBlur(e, "name")}
            value=""
            required={true}
            wrapClass="cd-payment-input"
            inputError=""
            type="number"
          />
          <div className="cd-payment-input">
            <MookhInput
              labelName="CVC"
              id="cvc"
              placeholder=""
              onChange={this.props.handleCustomerInfo}
              onBlur={e => this.props.onBlur(e, "name")}
              value=""
              required={true}
              wrapClass="cvc"
              inputError=""
              type="tel"
            />
            <MookhInput
              labelName="Currency"
              id="currency"
              placeholder="USD"
              onChange={this.props.handleCustomerInfo}
              onBlur={e => this.props.onBlur(e, "name")}
              value=""
              required={true}
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
            onChange={this.props.handleCustomerInfo}
            onBlur={e => this.props.onBlur(e, "name")}
            value=""
            required={true}
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