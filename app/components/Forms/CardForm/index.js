/*
 *
 * CardForm
 *
 */

import React, { PureComponent } from "react";
import TabsBottomWrap from "components/TabsBottomWrap";
import TabsBodyWrap from "components/TabsBodyWrap";
import MookhInput from "components/Forms/MookhInput";
import { PaymentButtons, BackButton } from "components/Buttons";
import "!!style-loader!css-loader!./card-form.css";

export default class CardForm extends PureComponent {
  render() {
    const { cardNumber, cvc, currency, expiresOn } = this.props.cardInfo;

    return (
      <div>
        <TabsBodyWrap>
          <form onSubmit={e => e.preventDefault()}>
            <div className="cd-row">
              <MookhInput
                labelName="Card number"
                id="cardNumber"
                placeholder="0000"
                onChange={this.props.handleCardInfo}
                onBlur={e => this.props.onBlur(e, "cardNumber")}
                value={cardNumber}
                required={false}
                wrapClass="cd-payment-input"
                inputError=""
                type="number"
              />
              <div className="cd-payment-input">
                <MookhInput
                  labelName="CVC"
                  id="cvc"
                  placeholder=""
                  onChange={this.props.handleCardInfo}
                  onBlur={e => this.props.onBlur(e, "cvc")}
                  value={cvc}
                  required={false}
                  wrapClass="cvc"
                  inputError=""
                  type="number"
                />
                <MookhInput
                  labelName="Currency"
                  id="currency"
                  placeholder="USD"
                  onChange={this.props.handleCardInfo}
                  onBlur={e => this.props.onBlur(e, "currency")}
                  value={currency}
                  required={false}
                  wrapClass="cvc"
                  inputError=""
                  type="number"
                />
              </div>
            </div>
            <div className="cd-row">
              <MookhInput
                labelName="Expires on"
                id="expiresOn"
                placeholder="MM/YY"
                wrapClass="cd-payment-input"
                onChange={this.props.handleCardInfo}
                onBlur={e => this.props.onBlur(e, "expiresOn")}
                value={expiresOn}
                required={false}
                inputError=""
                type="number"
              />
              <div className="cd-payment-input total">
                <span>Total:</span>
                <span>$00.00</span>
              </div>
            </div>
          </form>
        </TabsBodyWrap>
        <TabsBottomWrap>
          <div>
            <PaymentButtons
              id="nextOne"
              bsKlass="primary shadow"
              label="CONTINUE"
              onClick={this.props.goTabTwo}
            />
          </div>
        </TabsBottomWrap>
      </div>
    );
  }
}

CardForm.proptypes = {
  cardInfo: React.PropTypes.object.isRequired,
  handleCardInfo: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func.isRequired,
  goTabTwo: React.PropTypes.func.isRequired
};