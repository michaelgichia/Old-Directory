/*
 *
 * Payments reducer
 *
 */

import {
  PAYMENTS_MODAL,
  PAYMENTS_FORM,
  TICKET_CATEGORY
} from './constants';

const initialState = {
  paymentModal: false,
  deliveryInfomation: {
    location: "",
    streetAddress: "",
    apartment: "",
    deliveryCost: ""
  },
  customer: {
    email: "",
    name: "",
    phone_number: "",
    confirmEmail: "",
  },
  ticketCategory: {}
};

function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENTS_MODAL.SUCCESS:
      return {
        ...state,
        paymentModal: true,
        ticketCategory: action.ticketCategory
      };
    case PAYMENTS_MODAL.ERROR:
      return {
        ...state,
        paymentModal: false
      };
    case PAYMENTS_FORM.SUCCESS:
      return {
        ...state,
        deliveryInfomation: action.deliveryInfomation,
        customer: action.customer
      };
    case PAYMENTS_FORM.ERROR:
      return {
        ...state,
        deliveryInfomation: action.deliveryInfomation,
        customer: action.customer
      };
    default:
      return state;
  }
}

export default paymentsReducer;
