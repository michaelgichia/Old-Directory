/*
 *
 * PaymentsMethods
 *
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import PaymentCheckbox from "components/PaymentCheckbox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TabsBodyWrap from "components/TabsBodyWrap";
import CardForm from "components/Forms/CardForm";
import MpesaPush from "./MpesaPush";
import MpesaPayBill from "./MpesaPayBill";
import "!!style-loader!css-loader!./payments-methods.css";

export class PaymentsMethods extends Component {
  state = {
    mpesaPage: 1,
    mpesaInitiated: false,
  };

  componentDidMount() {
    this.selectedTab.node.classList.remove("pm__tab--selected");
  }

  onBlur = () => {};

  handleCustomerInfo = () => {};

  handleMpesaClick = () => {
    this.selectedTab.node.classList.add("pm__tab--selected");
    this.setState({mpesaInitiated: true})
  }

  handleNextPage = () =>
    this.setState(() => ({ mpesaPage: this.state.mpesaPage + 1 }));

  render() {
    const { mpesaPage, mpesaInitiated } = this.state;
    return (
      <div>
        <TabsBodyWrap>
          <header className="payment-header">Select payment method</header>
        </TabsBodyWrap>
        <Tabs>
          <TabsBodyWrap>
            <TabList className="pm__tab-list">
              <Tab ref={ele => this.selectedTab = ele} className="pm__tabs" selectedClassName="pm__tab--selected">
                <PaymentCheckbox
                  id="mobile-payment"
                  onChange={this.handleMpesaClick}
                  placeholder="Mobile money/M-pesa"
                  wrapKlass=""
                  defaultChecked={false}
                />
              </Tab>
              <Tab className="pm__tabs" selectedClassName="pm__tab--selected">
                <PaymentCheckbox
                  id="card-payment"
                  onClick={() => console.log("Card")}
                  placeholder="Card Payment"
                  wrapKlass=""
                  defaultChecked={false}
                />
              </Tab>
            </TabList>
          </TabsBodyWrap>
          <TabPanel>
            {mpesaPage === 1 ? (
              <MpesaPush onClick={this.handleNextPage} mpesaInitiated={mpesaInitiated} />
            ) : (
              <MpesaPayBill />
            )}
          </TabPanel>
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
