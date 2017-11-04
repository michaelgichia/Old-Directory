/*
 *
 * Payments reducer
 *
 */

import {
  PAYMENTS_MODAL,
} from './constants';

const initialState = {
  paymentModal: false,
};

function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENTS_MODAL.SUCCESS:
      return {
        ...state,
        paymentModal: true
      };
    case PAYMENTS_MODAL.ERROR:
      return {
        ...state,
        paymentModal: false
      };
    default:
      return state;
  }
}

export default paymentsReducer;
