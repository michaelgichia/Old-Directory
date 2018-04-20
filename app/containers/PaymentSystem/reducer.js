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
  ORDERS_STATUS_PENDING,
  CLEAR_MPESA_PUSH
} from './constants';

const initialState = {
  orderCreated: false,
  mpesaInitiated: false,
  orderPK: null,
  mpesaPushStatus: null,
  timeout: 30000,
  paymentModal: false,
  // paymentModal: true,
  event: {},
  eventError: '',
  customer: {
    email: '',
    name: '',
    phone_number: '',
    confirmEmail: ''
  },
  event: {},
  ticketCategory: {},
  totalTicketsPrice: 0,
  tabIndex: 0
};

function paymentSystemReducer(state = initialState, action) {
  switch (action.type) {
    case TOTAL_TICKETS_PRICE.SUCCESS:
      return {
        ...state,
        totalTicketsPrice: action.cost
      };

    case PAYMENTS_MODAL.SUCCESS:
      return {
        ...state,
        paymentModal: true,
        ticketCategory: action.ticketCategory,
        customer: action.customer,
        totalTicketsPrice: action.totalTicketsPrice,
        event: action.event
      };

    case PAYMENTS_MODAL.ERROR:
      return {
        ...state,
        paymentModal: false
      };

    case PAYMENT_METHODS_TAB:
      return {
        ...state,
        tabIndex: action.tabIndex
      };

    case PAYMENTS_MODAL_CLOSE:
      return {
        ...state,
        paymentModal: false,
        customer: {
          email: '',
          name: '',
          phone_number: '',
          confirmEmail: ''
        },
        totalTicketsPrice: 0,
        tabIndex: 0
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

    case EVENT.ERROR:
      return {
        ...state,
        eventError: action.error
      };

    case ORDERS_PAY.PENDING:
      return {
        ...state,
        mpesaInitiated: true
      };

    case ORDERS_PAY.SUCCESS:
      return {
        ...state,
        orderCreated: true,
        orderPK: action.orderPK
      };

    case ORDERS_PAY.ERROR:
      return {
        ...state,
        orderCreated: false,
        mpesaPushStatus: false,
        mpesaInitiated: false
      };

    case ORDERS_STATUS_PENDING:
      return {
        ...state,
        orderCreated: true,
        timeout: state.timeout - 2000
      };

    case ORDERS_STATUS.SUCCESS:
      return {
        ...state,
        mpesaPushStatus: true,
        orderCreated: false,
        mpesaInitiated: false,
        timeout: state.timeout - 1000
      };

    case CLEAR_MPESA_PUSH:
      return {
        ...state,
        mpesaPushStatus: null
      };

    case ORDERS_STATUS.ERROR:
      return {
        ...state,
        mpesaPushStatus: null,
        mpesaInitiated: false
      };

    default:
      return state;
  }
}

export default paymentSystemReducer;