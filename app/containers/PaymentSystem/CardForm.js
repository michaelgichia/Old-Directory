/*
 *
 * CardForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
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
import { closeModal } from './actions';
import {
  PaymentButtonPrimary,
  PaymentButtonSecondary
} from 'components/Buttons';
import './css/card-form.css';
import { paymentButtonRipplesState } from './util';
import { orderStatus } from './constants';

const Option = Select.Option;

class CardForm extends React.Component {
  state = {
    card_currency: 'KES',
    card_number: '',
    card_cvv: '',
    card_expiry: ''
  };

  handleInputChange = ({ target }) => {
    if (target.id === 'card_number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.id === 'card_expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.id === 'card_cvv') {
      target.value = formatCVC(target.value);
    }
    this.setState({ [target.id]: target.value });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handlePayment = evt => {
    evt.preventDefault();
    const expiry = this.state.card_expiry.split('/');
    const card_expiry = `${expiry[1]}${expiry[0]}`;
    const data = {
      card_number: Number(this.state.card_number.replace(/\s/g, '')),
      card_expiry: Number(card_expiry),
      card_cvv: Number(this.state.card_cvv),
      card_currency: this.state.card_currency
    };
    this.props.handleMobilePayment(data);
  };

  render() {
    const { card_number, card_cvv, card_currency, card_expiry } = this.state;
    const { totalTicketsPrice, payment_method } = this.props;
    console.log({ payment_method });
    return (
      <div>
        <TabsBodyWrap>
          <form onSubmit={this.handlePayment}>
            <div className="cd-row">
              <MookhInput
                labelName="Card Number"
                id="card_number"
                value={card_number}
                onChange={this.handleInputChange}
                placeholder="CARD NO"
                pattern="[\d| ]{16,22}"
                wrapClass="cd-payment-input"
                type="tel"
              />
              <div className="cd-payment-input">
                <MookhInput
                  labelName="CVC"
                  id="card_cvv"
                  value={card_cvv}
                  onChange={this.handleChange}
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  title="Incorrect CVC format"
                  wrapClass="cvc"
                  type="tel"
                />
                <div className="cvc">
                  <label className="mookh-label" htmlFor="fname">
                    Currency
                  </label>
                  <Select
                    dropdownStyle={{ zIndex: 9999 }}
                    defaultValue={card_currency}
                    onChange={this.handleChange}
                    size="large"
                    id="card_currency"
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
                  id="card_expiry"
                  onChange={this.handleInputChange}
                  placeholder="MM/YY"
                  value={card_expiry}
                />
              </div>
              <div className="cd-payment-input total">
                <span>Total:</span>
                <span>KES {`${totalTicketsPrice.toFixed(2)}`}</span>
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <PaymentButtonPrimary type="submit">
                {payment_method === 'CARD'
                  ? paymentButtonRipplesState(this.props.orderStatus).name
                  : 'PAY NOW'}
              </PaymentButtonPrimary>
            </div>
          </form>
        </TabsBodyWrap>
        <TabsBottomWrap>
          <PaymentButtonSecondary
            id="store"
            onClick={this.props.closeModal}
            disabled={paymentButtonRipplesState(this.props.orderStatus).state}
          >
            RETURN TO STORE
          </PaymentButtonSecondary>
        </TabsBottomWrap>
      </div>
    );
  }
}

CardForm.proptypes = {
  cardInfo: PropTypes.object.isRequired,
  handleCardInfo: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

const mapStateToProps = ({ paymentSystem }) => ({
  totalTicketsPrice: paymentSystem.totalTicketsPrice,
  orderStatus: paymentSystem.orderStatus,
  payment_method: paymentSystem.payment_method
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);