/*
 *
 * PaymentsMethods
 *
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
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
    mpesaInitiated: false
  };

  onBlur = () => {};

  handleCustomerInfo = () => {};

  handleMpesaClick = () => this.setState({ mpesaInitiated: true });

  goMpesaPush = () => this.setState(() => ({ mpesaPage: 1 }));

  handleNextPage = () =>
    this.setState(() => ({ mpesaPage: this.state.mpesaPage + 1 }));

  render() {
    const { mpesaPage, mpesaInitiated } = this.state;
    const tabClassnames = classNames({ "pm__tab--selected": mpesaInitiated });
    return (
      <div>
        <TabsBodyWrap>
          <header className="payment-header">Select payment method</header>
        </TabsBodyWrap>
        <Tabs>
          <TabsBodyWrap>
            <TabList className="pm__tab-list">
              <Tab className="pm__tabs" selectedClassName={tabClassnames}>
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
              <MpesaPush
                goTabOne={this.props.goTabOne}
                goToPayBill={this.handleNextPage}
                mpesaInitiated={mpesaInitiated}
              />
            ) : (
              <MpesaPayBill
                goMpesaPush={this.goMpesaPush}
                goTabThree={this.props.goTabThree}
              />
            )}
          </TabPanel>
          <TabPanel>
            <CardForm
              onBlur={this.onBlur}
              cardInfo={this.props.cardInfo}
              goTabOne={this.props.goTabOne}
              handleCardInfo={this.props.handleCardInfo}
              handleCustomerInfo={this.props.handleCustomerInfo}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default PaymentsMethods;