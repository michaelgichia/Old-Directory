/*
 *
 * PaymentsMethods
 *
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import injectReducer from "utils/injectReducer";
import PaymentCheckbox from "components/PaymentCheckbox";
import TabsBodyWrap from "components/TabsBodyWrap";
import CardForm from "components/Forms/CardForm";
import MpesaPush from "./MpesaPush";
import MpesaPayBill from "./MpesaPayBill";
import { handleOrdersPayment, getOrderStatus } from "./actions";
import reducer from "./reducer";
import "./payments-methods.css";

export class PaymentsMethods extends Component {
  state = {
    mpesaPage: 1,
    mpesaInitiated: false,
    event: {},
    extraInfo: {
      store_fk: "",
      payment_method: "mpesa"
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderCreated) {
      setTimeout(() => this.props.getOrderStatus(nextProps.orderPK), 15000);
    }

    if (nextProps.mpesaPushStatus) {
      this.props.goTabTwo("PAYMENT_METHODS_TAB", 1);
    }
    if (nextProps.mpesaPushStatus === false) {
      this.setState({ mpesaPage: 2, mpesaInitiated: false });
    }
  }

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
    this.handleMpesaClick();
    this.props.handleOrdersPayment(extraInfo);
  };

  handleMpesaClick = () => this.setState({ mpesaInitiated: true });

  goMpesaPush = () => this.setState(() => ({ mpesaPage: 1 }));

  handleNextPage = () =>
    this.setState(() => ({
      mpesaPage: this.state.mpesaPage + 1,
      mpesaInitiated: false
    }));

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
    const { customer: { phone_number } } = this.props;
    return (
      <div>
        <Tabs>
          <TabsBodyWrap>
            <TabList className="pm__tab-list">
              <Tab className="pm__tabs" selectedClassName="pm__tab--selected">
                <PaymentCheckbox
                  id="mobile-payment"
                  onChange={() => console.log("Mpesa")}
                  placeholder="Mpesa Payment"
                  wrapKlass=""
                  defaultChecked={false}
                />
              </Tab>
              <Tab className="pm__tabs" selectedClassName="pm__tab--selected">
                <PaymentCheckbox
                  id="card-payment"
                  onChange={() => console.log("Card")}
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
                handlePayment={this.handleMobilePayment}
                totalTicketsPrice={this.props.totalTicketsPrice}
                handleReturnToStore={this.props.handleReturnToStore}
              />
            ) : (
              <MpesaPayBill
                goMpesaPush={this.goMpesaPush}
                goTabThree={this.props.goTabThree}
                totalTicketsPrice={this.props.totalTicketsPrice}
              />
            )}
          </TabPanel>
          <TabPanel>
            <CardForm
              cardInfo={this.props.cardInfo}
              goTabTwo={() => this.props.goTabTwo("PAYMENT_METHODS_TAB", 1)}
              handleCardInfo={this.props.handleCardInfo}
              handleCustomerInfo={this.props.handleCustomerInfo}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = ({ payments, buyTicket, paymentsMethods }) => ({
  deliveryInfomation: payments.deliveryInfomation,
  deliveryInfomation: payments.deliveryInfomation,
  customer: payments.customer,
  ticketCategory: payments.ticketCategory,
  event: payments.event,
  orderCreated: paymentsMethods.orderCreated,
  mpesaPushStatus: paymentsMethods.mpesaPushStatus,
  orderPK: paymentsMethods.orderPK,
  totalTicketsPrice: payments.totalTicketsPrice
});

const mapDispatchToProps = dispatch => ({
  handleOrdersPayment: extraInfo => dispatch(handleOrdersPayment(extraInfo)),
  goTabTwo: (type, tabIndex) => dispatch({ type, tabIndex }),
  getOrderStatus: orderPK => dispatch(getOrderStatus(orderPK))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: "paymentsMethods", reducer}) 

export default compose(withReducer, withConnect)(PaymentsMethods);