/*
 *
 * CardForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { Helmet } from 'react-helmet';
import TabsBottomWrap from 'components/TabsBottomWrap';
import TabsBodyWrap from 'components/TabsBodyWrap';
import MookhInput from 'components/Forms/MookhInput';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from 'utils/creditCard';
import { PaymentButtonPrimary } from 'components/Buttons';
import './card-form.css';

const Option = Select.Option;

export default class CardForm extends Component {
  state = {
    currency: 'ksh',
    cardNumber: '',
    cardSecurityCode: '',
    currency: '',
    expiry: ''
  };

  handleInputChange = ({ target }) => {
    if (target.id === 'cardNumber') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.id === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.id === 'cardSecurityCode') {
      target.value = formatCVC(target.value);
    }
    this.setState({ [target.id]: target.value });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleCallback = res => {
    console.log({ res });
  };

  handlePayment = () => {
    const newCardNumber = this.state.cardNumber.replace(/\s/g, '');
    const newCardExpiryMonth = this.state.expiry.slice(0, 2);
    const newCardExpiryYear = this.state.expiry.slice(3);
    const sessionDetails = {
      cardNumber: newCardNumber,
      cardExpiryMonth: newCardExpiryMonth,
      cardExpiryYear: newCardExpiryYear,
      cardSecurityCode: this.state.cardSecurityCode
    };
    window.HostedForm.createSession(sessionDetails, this.handleCallback);
  };

  render() {
    const { cardNumber, cardSecurityCode, currency, expiry } = this.state;
    return (
      <React.Fragment>
      <Helmet
      >
        <script async>HostedForm.setMerchant(61056001);</script>
      </Helmet>
      <div>
        <TabsBodyWrap>
          <form onSubmit={e => e.preventDefault()}>
            <div className="cd-row">
              <MookhInput
                labelName="Card Number"
                id="cardNumber"
                ref="cardNumber"
                value={cardNumber}
                onChange={this.handleInputChange}
                placeholder="CARD NO"
                pattern="[\d| ]{16,22}"
                wrapClass="cd-payment-input"
                type="tel"
              />
              <div className="cd-payment-input">
                <MookhInput
                  labelName="CVC"
                  id="cardSecurityCode"
                  value={cardSecurityCode}
                  onChange={this.handleChange}
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  wrapClass="cvc"
                  type="tel"
                />
                <div className="cvc">
                  <label className="mookh-label" htmlFor="fname">
                    Currency
                  </label>
                  <Select
                    dropdownStyle={{ zIndex: 9999 }}
                    defaultValue="ksh"
                    onChange={this.handleChange}
                    size="large"
                  >
                    <Option stle={{ color: 'red' }} value="usd">
                      USD
                    </Option>
                    <Option value="ksh">KSH</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="cd-row-two">
              <div className="mm-input-wrap">
                <input
                  className="mm-input"
                  type="tel"
                  id="expiry"
                  onChange={this.handleInputChange}
                  placeholder="MM/YY"
                  value={expiry}
                />
              </div>
              <div className="cd-payment-input total">
                <span>Total:</span>
                <span>$00.00</span>
              </div>
            </div>
          </form>
        </TabsBodyWrap>
        <TabsBottomWrap>
          <div>
            <PaymentButtonPrimary id="nextOne" onClick={this.handlePayment}>
              PAY
            </PaymentButtonPrimary>
          </div>
        </TabsBottomWrap>
      </div>
      </React.Fragment>
    );
  }
}

CardForm.proptypes = {
  cardInfo: PropTypes.object.isRequired,
  handleCardInfo: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  goTabTwo: PropTypes.func.isRequired
};