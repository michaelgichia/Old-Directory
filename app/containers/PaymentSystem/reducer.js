/*
 *
 * PaymentSystem reducer
 *
 */

import {
  PAYMENTS_MODAL,
  PAYMENT_METHODS_TAB,
  PAYMENTS_MODAL_CLOSE,
  CHANGE_CUSTOMER_NO,
  TOTAL_TICKETS_PRICE,
  EVENT,
  ORDERS_PAY,
  ORDERS_STATUS,
  CLEAR_MPESA_PUSH,
  CARD_MPESA_TABS,
  PAYMENT_METHOD,
  orderStatus
} from "./constants";

const initialState = {
  orderPK: null,
  orderId: null,
  timeout: 20000,
  paymentModal: false,
  orderStatus: orderStatus.start,
  customer: {
    email: "",
    name: "",
    phone_number: "",
    confirmEmail: ""
  },
  event: {},
  ticketCategory: {},
  totalTicketsPrice: 0,
  ticketModalTabIndex: 0,
  cardOrMpesaTabIndex: 0,
  payment_method: ''
};

function paymentSystemReducer(state = initialState, action) {
  switch (action.type) {
    case TOTAL_TICKETS_PRICE.SUCCESS:
      return {
        ...state,
        totalTicketsPrice: action.cost
      };

    case PAYMENTS_MODAL.OPEN:
      return {
        ...state,
        paymentModal: true,
        ticketCategory: action.ticketCategory,
        customer: action.customer,
        totalTicketsPrice: action.totalTicketsPrice,
        event: action.event
      };

    case PAYMENTS_MODAL.CLOSE:
      return {
        ...state,
        paymentModal: false,
        ticketModalTabIndex: 0,
        cardOrMpesaTabIndex: 0
      };

    case PAYMENT_METHODS_TAB.SET:
      return {
        ...state,
        ticketModalTabIndex: action.ticketModalTabIndex
      };

    case PAYMENTS_MODAL.CLOSE:
      return {
        ...state,
        paymentModal: false
      };

    case PAYMENTS_MODAL.FINISH:
      console.log("reached to finish");
      return Object.assign({}, state, {
        orderStatus: orderStatus.start,
        orderPK: null,
        orderId: null,
        customer: Object.assign({}, state.customer, {
          email: "",
          name: "",
          phone_number: "",
          confirmEmail: ""
        }),
        totalTicketsPrice: 0,
        ticketModalTabIndex: 0
      });

    case CHANGE_CUSTOMER_NO.SUCCESS:
      const newCustomer = {
        ...state.customer,
        phone_number: action.phone_number
      };
      return {
        ...state,
        customer: newCustomer
      };

    case EVENT.SUCCESS:
      return {
        ...state,
        event: action.event
      };

    case ORDERS_PAY.RESET:
      return {
        ...state,
        orderStatus: orderStatus.start
      };

    case ORDERS_PAY.PENDING:
      return {
        ...state,
        orderStatus: orderStatus.inProgress
      };

    case ORDERS_PAY.SUCCESS:
      return {
        ...state,
        orderStatus: orderStatus.created,
        orderPK: action.orderPK,
        orderId: action.orderId
      };

    case ORDERS_PAY.ERROR:
      return {
        ...state,
        orderStatus: orderStatus.notCreated
      };

    case ORDERS_STATUS.PENDING:
      return {
        ...state,
        orderStatus: orderStatus.pending,
        timeout: state.timeout - 1000
      };

    case ORDERS_STATUS.SUCCESS:
      return {
        ...state,
        orderStatus: orderStatus.paid,
        timeout: state.timeout - 1000
      };

    case ORDERS_STATUS.ERROR:
      return {
        ...state,
        orderStatus: orderStatus.failure,
        timeout: 20000
      };

    case CARD_MPESA_TABS.SET:
      return {
        ...state,
        cardOrMpesaTabIndex: action.cardOrMpesaTabIndex
      };

    case PAYMENT_METHOD.SET:
      return {
        ...state,
        payment_method: action.payment_method
      };

    default:
      return state;
  }
}

export default paymentSystemReducer;

// case PAYBILL.ERROR:
//   return {
//     ...state,
//     orderStatus: orderStatus.paybillFailure,
//     timeout: 10000
//   };

// case PAYBILL.PENDING:
//   return {
//     ...state,
//     orderStatus: orderStatus.paybillPending
//   };
