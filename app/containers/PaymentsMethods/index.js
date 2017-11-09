/*
 *
 * PaymentsMethods
 *
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import PaymentCheckbox from "components/PaymentCheckbox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TabsBodyWrap from "components/TabsBodyWrap";
import CardForm from "components/Forms/CardForm";
import MpesaPush from "./MpesaPush";
import MpesaPayBill from "./MpesaPayBill";
import { handleOrdersPayment } from "./actions";
import "!!style-loader!css-loader!./payments-methods.css";

export class PaymentsMethods extends Component {
  state = {
    mpesaPage: 1,
    mpesaInitiated: false,
    event: {},
    extraInfo: {
      store_fk: "",
      payment_method: "mpesa"
    },
  };

  onBlur = () => {};

  handleCustomerInfo = () => {};

  handleMobilePayment = () => {
    const {
      event: { id, event_name, tickets_count_by_category, store_fk },
      event,
      ticketCategory,
      customer
    } = this.props;
    const { extraInfo } = this.state;
    const orderArray = [];

    delete customer.confirmEmail;
    Object.entries(ticketCategory).forEach(([key, value]) => {
      orderArray.push(
        Object.assign(
          {},
          { name: this.getOrderName(tickets_count_by_category, key) },
          { items_id: key },
          { item_quantity: value }
        )
      );
    });
    extraInfo["order_detail"] = orderArray;
    extraInfo["customer"] = customer;
    extraInfo["store_fk"] = store_fk;
    console.log({ extraInfo });
    this.props.handleOrdersPayment(extraInfo);
  };

  handleMpesaClick = () => this.setState({ mpesaInitiated: true });

  goMpesaPush = () => this.setState(() => ({ mpesaPage: 1 }));

  handleNextPage = () =>
    this.setState(() => ({ mpesaPage: this.state.mpesaPage + 1 }));

  getOrderName = (ticketCategory, key) => {
    let name;
    ticketCategory.filter(value => {
      if (value.id === key) {
        name = value.ticket_name;
        return name;
      }
    });
    return name;
  };

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
              <Tab className="pm__tabs" selectedClassName="pm__tab--selected">
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

const mapStateToProps = ({ payments, buyTicket }) => ({
  deliveryInfomation: payments.deliveryInfomation,
  deliveryInfomation: payments.deliveryInfomation,
  customer: payments.customer,
  ticketCategory: payments.ticketCategory,
  event: buyTicket.event
});

const mapDispatchToProps = dispatch => ({
  handleOrdersPayment: extraInfo => dispatch(handleOrdersPayment(extraInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsMethods);
