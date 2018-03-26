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
import CreditCardInput from 'components/Forms/CreditCardInput';
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
    currency: 'ksh'
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }
    this.setState({ [target.name]: target.value });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handlePayment = () => {
    window.pay()
  };

  render() {
    const { cardNumber, cvc, currency, expiry } = this.props.cardInfo;
    return (
      <div>
        <TabsBodyWrap>
          <form onSubmit={e => e.preventDefault()}>
            <div className="cd-row">
              <CreditCardInput
                labelName="Card Number"
                id="card-number"
                onChange={this.handleChange}
                placeholder="CARD NO"
                pattern="[\d| ]{16,22}"
                readOnly={undefined}
                wrapClass="cd-payment-input"
                type="tel"
              />
              <div className="cd-payment-input">
                <CreditCardInput
                  labelName="CVC"
                  id="security-code"
                  onChange={this.handleChange}
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  readOnly="readonly"
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
                  id="expiry-month"
                  onChange={this.handleChange}
                  placeholder="MM"
                  readOnly={null}
                  value="05"
                />
                <input
                  className="mm-input"
                  type="tel"
                  id="expiry-year"
                  onChange={this.handleChange}
                  placeholder="YY"
                  readOnly={null}
                  value="21"
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
            <PaymentButtonPrimary id="nextOne"
            onChange={this.handleChange} onClick={() => window.pay('card')}>
              PAY
            </PaymentButtonPrimary>
          </div>
        </TabsBottomWrap>
      </div>
    );
  }
}

CardForm.proptypes = {
  cardInfo: PropTypes.object.isRequired,
  handleCardInfo: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  goTabTwo: PropTypes.func.isRequired
};