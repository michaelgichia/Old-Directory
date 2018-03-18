/*
 *
 * PaymentsMethods reducer
 *
 */

import {
  ORDERS_PAY,
  ORDERS_STATUS
} from './constants';

const initialState = {
  orderCreated: false,
  orderPK: null,
  mpesaPushStatus: null
};

function paymentsMethodsReducer(state = initialState, action) {
  switch (action.type) {

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
        mpesaPushStatus: false
      };

    case ORDERS_STATUS.SUCCESS:
      return {
        ...state,
        mpesaPushStatus: true
      };

    case ORDERS_STATUS.ERROR:
      return {
        ...state,
        mpesaPushStatus: false
      };

    default:
      return state;
  }
}

export default paymentsMethodsReducer;
