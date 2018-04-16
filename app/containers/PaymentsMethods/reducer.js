/*
 *
 * PaymentsMethods reducer
 *
 */

import { ORDERS_PAY, ORDERS_STATUS, ORDERS_STATUS_PENDING } from './constants';

const initialState = {
  orderCreated: false,
  mpesaInitiated: false,
  orderPK: null,
  mpesaPushStatus: null,
  timeout: 20000
};

function paymentsMethodsReducer(state = initialState, action) {
  switch (action.type) {
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
        timeout: state.timeout - 2000,
      };

    case ORDERS_STATUS.SUCCESS:
      return {
        ...state,
        mpesaPushStatus: true,
        orderCreated: false,
        mpesaInitiated: false,
        timeout: state.timeout - 1000
      };

    case ORDERS_STATUS.ERROR:
      return {
        ...state,
        mpesaPushStatus: false,
         mpesaInitiated: false,
      };

    default:
      return state;
  }
}

export default paymentsMethodsReducer;