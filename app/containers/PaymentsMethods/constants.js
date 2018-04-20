/*
 *
 * PaymentsMethods constants
 *
 */

import { asyncActionType } from 'utils/helperFunctions';

// APIs
export const baseEventAPI = 'https://api.mymookh.com/stores/event/public';
export const ordersPayAPI = 'https://api.mymookh.com/stores/orders';
export const orderStatusAPI = 'https://api.mymookh.com/stores/orders/order_status';

// Action Types
export const ORDERS_PAY = asyncActionType('ORDERS_PAY');
export const ORDERS_STATUS = asyncActionType('ORDERS_STATUS');
export const ORDERS_STATUS_PENDING = "ORDERS_STATUS_PENDING";
export const CLEAR_MPESA_PUSH = 'CLEAR_MPESA_PUSH';
