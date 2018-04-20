/*
 *
 * Payments reducer
 *
 */

import {
  PAYMENTS_MODAL,
  PAYMENT_METHODS_TAB,
  PAYMENTS_MODAL_CLOSE,
  CHANGE_CUSTOMER_NO,
  TOTAL_TICKETS_PRICE
} from './constants';

const initialState = {
  paymentModal: false,
  // paymentModal: true,
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

function paymentsReducer(state = initialState, action) {
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
      const newCustomer = { ...state.customer, phone_number: action.phone_number };
      return {
        ...state,
        customer: newCustomer
      };

    default:
      return state;
  }
}

export default paymentsReducer;
