import React, { Component } from 'react';
import PaymentCheckbox from "components/PaymentCheckbox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CardForm from "components/Forms/CardForm";
import MpesaPush from "./MpesaPush";
import MpesaPayBill from "./MpesaPayBill";
import "!!style-loader!css-loader!./payments-methods.css";


export class PaymentsMethods extends Component {

  onBlur = () => {}

  handleCustomerInfo = () => {}

  render() {
    return (
      <div>
      <header className="payment-header">Select payment method</header>
        <Tabs>
          <TabList className="pm__tab-list">
            <Tab className="pm__tabs">
              <PaymentCheckbox
                id="mobile-payment"
                onClick={() => console.log('Mobile')}
                placeholder="Mobile money/M-pesa"
                wrapKlass=""
                defaultChecked={true}
              />
            </Tab>
            <Tab className="pm__tabs">
              <PaymentCheckbox
                id="card-payment"
                onClick={() => console.log('Card')}
                placeholder="Card Payment"
                wrapKlass=""
                defaultChecked={false}
              />
            </Tab>
          </TabList>
            <TabPanel><MpesaPayBill /></TabPanel>
            <TabPanel>
              <CardForm
                onBlur={this.onBlur}
                handleCustomerInfo={this.handleCustomerInfo}
              />
              </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default PaymentsMethods;
