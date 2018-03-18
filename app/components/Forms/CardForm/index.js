/*
 *
 * CardForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
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

function handleChange(value) {
  console.log(value); // { key: "lucy", label: "Lucy (101)" }
}

export default class CardForm extends Component {
  state = {
    currency: "ksh"
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

  handleChange = value => {
    this.setState({ currency: value });
  }

  render() {
    const { cardNumber, cvc, currency, expiry } = this.props.cardInfo;

    return (
      <div>
        <TabsBodyWrap>
          <form onSubmit={e => e.preventDefault()}>
            <div className="cd-row">
              <MookhInput
                labelName="Card Number"
                id="number"
                placeholder="CARD NO"
                onChange={this.handleInputChange}
                pattern="[\d| ]{16,22}"
                required
                wrapClass="cd-payment-input"
                type="tel"
              />
              <div className="cd-payment-input">
                <MookhInput
                  labelName="CVC"
                  id="cvc"
                  placeholder="CVC"
                  onChange={this.handleInputChange}
                  pattern="\d{3,4}"
                  required
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
                    style={{ width: 120 }}
                    onChange={this.handleChange}
                    size="large"
                  >
                    <Option  stle={{color: "red"}}value="usd">USD</Option>
                    <Option value="ksh">KSH</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="cd-row">
              <MookhInput
                labelName="Valid Thru"
                id="expiry"
                placeholder="MM/YY"
                wrapClass="cd-payment-input"
                onChange={this.handleInputChange}
                pattern="\d\d/\d\d"
                required
                type="tel"
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
            <PaymentButtonPrimary id="nextOne" onClick={this.props.goTabTwo}>
              CONTINUE
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