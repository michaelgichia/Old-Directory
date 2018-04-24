/*
 *
 * PaymentSystem constants
 *
 */

import { asyncActionType } from 'utils/helperFunctions';

// Action Types
export const PAYMENTS_MODAL = asyncActionType('PAYMENTS_MODAL');
export const TOTAL_TICKETS_PRICE = asyncActionType('TOTAL_TICKETS_PRICE');
export const CHANGE_CUSTOMER_NO = asyncActionType('CHANGE_CUSTOMER_NO');

export const PAYMENTS_MODAL_CLOSE = 'PAYMENTS_MODAL_CLOSE';

// Action Types
export const EVENT = asyncActionType('EVENT');

// APIs
export const baseEventAPI = 'https://api.mymookh.com/stores/event/public';
export const ordersPayAPI = 'https://api.mymookh.com/stores/orders';
export const orderStatusAPI = 'https://api.mymookh.com/stores/orders/order_status';

// Action Types
export const ORDERS_PAY = asyncActionType('ORDERS_PAY');
export const ORDERS_STATUS = asyncActionType('ORDERS_STATUS');
export const CLEAR_MPESA_PUSH = 'CLEAR_MPESA_PUSH';
// Card or Mpesa tabs
export const CARD_MPESA_TABS = asyncActionType("CARD_MPESA_TABS");
// Modal parent tabs
export const PAYMENT_METHODS_TAB = asyncActionType("PAYMENT_METHODS_TAB");
export const PAYBILL = asyncActionType("PAYBILL");
// Order status
export const orderStatus = {
  start: 'start',
  inProgress: 'inProgress',
  notCreated: 'notCreated',
  created: 'created',
  pending: 'pending',
  paid: 'paid',
  failure: 'failure',
  finished: 'finished'
};

