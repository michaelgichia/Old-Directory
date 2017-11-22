/*
 *
 * PaymentsMethods constants
 *
 */

import { asyncActionType } from "utils/helperFunctions";

// APIs
export const baseEventAPI = "http://api.mymookh.com/api/v2/stores/event/public";
export const ordersPayAPI = "http://api.mymookh.com/api/v2/stores/orders/";
export const orderStatusAPI = "http://api.mymookh.com/api/v2/transactions/orders";

// Action Types
export const ORDERS_PAY = asyncActionType("ORDERS_PAY");
export const ORDERS_STATUS = asyncActionType("ORDERS_STATUS");
