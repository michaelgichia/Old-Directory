import React, { Component } from 'react';
import PaymentCheckbox from "components/PaymentCheckbox";
import CardForm from "components/Forms/CardForm";
import MpesaPush from "./MpesaPush";
import MpesaPayBill from "./MpesaPayBill";
import "!!style-loader!css-loader!./payments-methods.css";


export class PaymentsMethods extends Component {
  render() {
    return (
      <div>
      <header className="payment-header">Select payment method</header>
      <div className="payment-wrap">
        <PaymentCheckbox
          id="mobile-payment"
          onClick={() => console.log('Mobile')}
          placeholder="Mobile money/M-pesa"
          wrapKlass="payment"
          defaultChecked={true}
        />
        <PaymentCheckbox
          id="card-payment"
          onClick={() => console.log('Card')}
          placeholder="Card Payment"
          wrapKlass="payment"
          defaultChecked={false}
        />
      </div>
      <header className="cd-header" />
        <MpesaPayBill />
      </div>
    );
  }
}

export default PaymentsMethods;
