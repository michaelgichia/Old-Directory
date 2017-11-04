/*
 *
 * Payments reducer
 *
 */

import {
  PAYMENTS_MODAL,
} from './constants';

const initialState = {
  paymentsModal: false,
};

function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENTS_MODAL.SUCCESS:
      return {
        ...state,
        paymentsModal: true
      };
    case PAYMENTS_MODAL.ERROR:
      return {
        ...state,
        paymentsModal: false
      };
    default:
      return state;
  }
}

export default paymentsReducer;
