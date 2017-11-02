/*
 *
 * CardForm
 *
 */

import React, { PureComponent } from "react";
import TabsBottomWrap from "components/TabsBottomWrap";
import TabsBodyWrap from "components/TabsBodyWrap";
import MookhInput from "components/Forms/MookhInput";
import { PaymentButtons } from "components/Buttons";
import "!!style-loader!css-loader!./card-form.css";

export default class CardForm extends PureComponent {
  render() {
    return (
      <div>
        <TabsBodyWrap>
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
        </TabsBodyWrap>
        <TabsBottomWrap>
          <div>
            <PaymentButtons
              id="store"
              bsKlass="secondary shadow"
              label="PREVIOUS"
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