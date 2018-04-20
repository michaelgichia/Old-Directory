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
import CardForm from "components/Forms/CardForm";
import MpesaPush from "./MpesaPush";
import MpesaPayBill from "./MpesaPayBill";
import { handleOrdersPayment, getOrderStatus } from "./actions";
import { ORDERS_PAY, ORDERS_STATUS } from "./constants";
import reducer from "./reducer";
import "./css/payments-methods.css";

export class PaymentsMethods extends Component {
  state = {
    mpesaPage: 1,
    event: {},
    extraInfo: {
      store_fk: "",
      payment_method: "mpesa"
    }
  };

  interValId = null;

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderCreated && nextProps.orderPK && nextProps.timeout > 0) {
      delay(() => this.props.getOrderStatus(nextProps.orderPK), 3000)
    }

    if (nextProps.mpesaPushStatus) {
      this.props.goTabTwo("PAYMENT_METHODS_TAB", 1);
    }

    if (nextProps.mpesaPushStatus === false) {
      this.setState({ mpesaPage: 2 });
    }

    if (nextProps.timeout < 1) {
      this.props.clearDefault();
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
    const extraInfo = {...this.state.extraInfo};
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
    console.log({extraInfo})
    this.props.handleOrdersPayment(extraInfo);
  };

  goMpesaPush = () => this.setState(() => ({ mpesaPage: 1 }));

  handleNextPage = () => {
    this.props.clearMpesaInitiated();
    this.setState(() => ({ mpesaPage: this.state.mpesaPage + 1 }));
  }

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
    const { mpesaPage } = this.state;
    const { customer: { phone_number }, mpesaInitiated } = this.props;
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

const mapStateToProps = ({ buyTicket, paymentSystem }) => ({
  deliveryInfomation: paymentSystem.deliveryInfomation,
  deliveryInfomation: paymentSystem.deliveryInfomation,
  customer: paymentSystem.customer,
  ticketCategory: paymentSystem.ticketCategory,
  event: paymentSystem.event,
  orderCreated: paymentSystem.orderCreated,
  mpesaPushStatus: paymentSystem.mpesaPushStatus,
  orderPK: paymentSystem.orderPK,
  totalTicketsPrice: paymentSystem.totalTicketsPrice,
  timeout: paymentSystem.timeout,
  mpesaInitiated: paymentSystem.mpesaInitiated
});

const mapDispatchToProps = dispatch => ({
  handleOrdersPayment: extraInfo => dispatch(handleOrdersPayment(extraInfo)),
  goTabTwo: (type, tabIndex) => dispatch({ type, tabIndex }),
  getOrderStatus: orderPK => dispatch(getOrderStatus(orderPK)),
  clearDefault: () => dispatch({type: ORDERS_PAY.ERROR}),
  clearMpesaInitiated: () => dispatch({ type: ORDERS_STATUS.ERROR })
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: "paymentsMethods", reducer});

export default compose(withReducer, withConnect)(PaymentsMethods);