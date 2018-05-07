/*
 *
 * PaymentsMethods
 *
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import delay from "lodash/delay";
import injectReducer from "utils/injectReducer";
import PaymentCheckbox from "components/PaymentCheckbox";
import TabsBodyWrap from "components/TabsBodyWrap";
import CardForm from "./CardForm";
import MpesaPush from "./MpesaPush";
import MpesaPayBill from "./MpesaPayBill";
import {
  handleOrdersPayment,
  getOrderStatus,
  setTicketModalTabIndex,
  setPaymentMethod
} from "./actions";
import { ORDERS_STATUS, orderStatus } from "./constants";
import reducer from "./reducer";
import "./css/payments-methods.css";

export class PaymentsMethods extends Component {
  state = {
    mpesaPaymentMethod: "pushPayment",
    event: {},
    extraInfo: {
      store_fk: ""
    }
  };

  interValId = null;

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.orderStatus === orderStatus.created &&
      nextProps.timeout > 0
    ) {
      // delay(
      //   param => this.props.getOrderStatus(param.orderId, param.orderPK),
      //   3000,
      //   { ordeId: this.props.orderId, orderPk: nextProps.orderPK }
      // );
      delay(
        () => this.props.getOrderStatus(this.props.orderId, nextProps.orderPK),
        3000
      );
    }

    if (
      nextProps.orderStatus === orderStatus.pending &&
      nextProps.timeout > 0
    ) {
      delay(
        () => this.props.getOrderStatus(this.props.orderId, nextProps.orderPK),
        2000
      );
    }

    if (nextProps.orderStatus === orderStatus.paid) {
      this.props.setTicketModalTabIndex(1);
    }

    if (
      nextProps.orderStatus === orderStatus.notCreated ||
      nextProps.orderStatus === orderStatus.failure
    ) {
      if (this.props.payment_method === "MPESA") {
        this.handleMpesaPaymentMethod("manualPayment");
      }
    }

    if (nextProps.timeout < 1) {
      this.props.handleTimeOut();
    }
  }

  handleMobilePayment = card => {
    const {
      event: { id, event_name, tickets_count_by_category, store_fk },
      event,
      ticketCategory,
      customer,
      payment_method
    } = this.props;
    const extraInfo = { ...this.state.extraInfo };
    const orderArray = [];

    delete customer.confirmEmail;
    Object.entries(ticketCategory).forEach(([key, value]) => {
      orderArray.push(
        Object.assign(
          {},
          { name: this.getOrderName(tickets_count_by_category, key) },
          { item_id: key },
          { item_quantity: value }
        )
      );
    });
    extraInfo["order_detail"] = orderArray;
    extraInfo["customer"] = customer;
    extraInfo["store_fk"] = store_fk;
    extraInfo["payment_method"] = payment_method;
    if (payment_method === "CARD") {
      extraInfo["card"] = card;
    }
    console.log({ extraInfo });

    if (this.props.orderPK && this.props.orderId) {
      const { orderId, orderPK } = this.props;
      this.props.getOrderStatus(orderId, orderPK);
      this.props.dispatchPending();
    } else {
      this.props.handleOrdersPayment(extraInfo);
    }
  };

  handleMpesaPaymentMethod = method => {
    this.setState({ mpesaPaymentMethod: method });
  };

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
    const { mpesaPaymentMethod } = this.state;
    const {
      customer: { phone_number },
      cardOrMpesaTabIndex,
      orderStatus
    } = this.props;
    return (
      <div>
        <Tabs defaultIndex={cardOrMpesaTabIndex}>
          <TabsBodyWrap>
            <TabList className="pm__tab-list">
              <Tab className="pm__tabs" selectedClassName="pm__tab--selected">
                <PaymentCheckbox
                  id="mobile-payment"
                  onChange={() => this.props.setPaymentMethod("MPESA")}
                  placeholder="Mpesa Payment"
                  defaultChecked={false}
                />
              </Tab>
              <Tab className="pm__tabs" selectedClassName="pm__tab--selected">
                <PaymentCheckbox
                  id="card-payment"
                  onChange={() => this.props.setPaymentMethod("CARD")}
                  placeholder="Card Payment"
                  defaultChecked={false}
                />
              </Tab>
            </TabList>
          </TabsBodyWrap>
          <TabPanel>
            {mpesaPaymentMethod === "pushPayment" ? (
              <MpesaPush
                goToPayBill={() =>
                  this.handleMpesaPaymentMethod("manualPayment")
                }
                handleMobilePayment={this.handleMobilePayment}
              />
            ) : (
              <MpesaPayBill
                goMpesaPush={() => this.handleMpesaPaymentMethod("pushPayment")}
              />
            )}
          </TabPanel>
          <TabPanel>
            <CardForm
              cardInfo={this.props.cardInfo}
              handleCardInfo={this.props.handleCardInfo}
              handleMobilePayment={this.handleMobilePayment}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = ({ paymentSystem }) => ({
  customer: paymentSystem.customer,
  ticketCategory: paymentSystem.ticketCategory,
  event: paymentSystem.event,
  orderPK: paymentSystem.orderPK,
  timeout: paymentSystem.timeout,
  cardOrMpesaTabIndex: paymentSystem.cardOrMpesaTabIndex,
  orderStatus: paymentSystem.orderStatus,
  orderId: paymentSystem.orderId,
  payment_method: paymentSystem.payment_method
});

const mapDispatchToProps = dispatch => ({
  handleOrdersPayment: extraInfo => dispatch(handleOrdersPayment(extraInfo)),
  goTabTwo: (type, ticketModalTabIndex) =>
    dispatch({ type, ticketModalTabIndex }),
  getOrderStatus: (orderId, orderPK) =>
    dispatch(getOrderStatus(orderId, orderPK)),
  handleTimeOut: () => dispatch({ type: ORDERS_STATUS.ERROR }),
  setTicketModalTabIndex: ticketModalTabIndex =>
    dispatch(setTicketModalTabIndex(ticketModalTabIndex)),
  setPaymentMethod: payment_method =>
    dispatch(setPaymentMethod(payment_method)),
  dispatchPending: () => dispatch({ type: ORDERS_STATUS.PENDING })
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: "paymentsMethods", reducer });

export default compose(withReducer, withConnect)(PaymentsMethods);
