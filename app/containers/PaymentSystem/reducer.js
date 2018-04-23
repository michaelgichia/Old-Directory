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
  orderStatus,
  ORDERS_STATUS_MANUAL_FAILURE
} from './constants';


const initialState = {
  orderPK: null,
  orderId: null,
  timeout: 20000,
  paymentModal: false,
  orderStatus: orderStatus.start,
  customer: {
    email: '',
    name: '',
    phone_number: '',
    confirmEmail: ''
  },
  event: {},
  ticketCategory: {},
  totalTicketsPrice: 0,
  ticketModalTabIndex: 0,
  cardOrMpesaTabIndex: 0
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
        event: action.event,

      };

    case PAYMENTS_MODAL.CLOSE:
      return {
        ...state,
        paymentModal: false,
      };

    case PAYMENT_METHODS_TAB.SET:
      return {
        ...state,
        ticketModalTabIndex: action.ticketModalTabIndex
      };

    case PAYMENTS_MODAL.CLOSE:
      return {
        ...state,
        paymentModal: false,
      };

    case PAYMENTS_MODAL.FINISH:
      return {
        ...state,
        paymentModal: false,
        orderPK: null,
        orderId: null,
        customer: {
          email: '',
          name: '',
          phone_number: '',
          confirmEmail: ''
        },
        totalTicketsPrice: 0,
        ticketModalTabIndex: 0,
        orderStatus: orderStatus.start
      };

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
        timeout: 10000
      };

    case ORDERS_STATUS_MANUAL_FAILURE:
      return {
        ...state,
        orderStatus: orderStatus.manualFailure,
        timeout: 10000
      };

    case CARD_MPESA_TABS.SET:
      return {
        ...state,
        cardOrMpesaTabIndex: action.cardOrMpesaTabIndex
      };

    default:
      return state;
  }
}

export default paymentSystemReducer;