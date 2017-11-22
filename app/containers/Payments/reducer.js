/*
 *
 * Payments reducer
 *
 */

import {
  PAYMENTS_MODAL,
  PAYMENT_METHODS_TAB,
  PAYMENTS_MODAL_CLOSE
} from "./constants";

const initialState = {
  paymentModal: false,
  customer: {
    email: "",
    name: "",
    phone_number: "",
    confirmEmail: ""
  },
  // customer: {
  //   email: "mqyynm@gmail.com",
  //   name: "Michael",
  //   phone_number: "254701872069",
  //   confirmEmail: "mqyynm@gmail.com"
  // },
  ticketCategory: {},
  totalTicketsPrice: 0,
  tabIndex: 0
};

function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENTS_MODAL.SUCCESS:
      return {
        ...state,
        paymentModal: true,
        ticketCategory: action.ticketCategory,
        customer: action.customer,
        totalTicketsPrice: action.totalTicketsPrice
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
          email: "",
          name: "",
          phone_number: "",
          confirmEmail: ""
        },
        totalTicketsPrice: 0
      };
    default:
      return state;
  }
}

export default paymentsReducer;