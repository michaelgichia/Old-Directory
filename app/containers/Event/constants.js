/*
 *
 * Event constants
 *
 */

import { asyncActionType } from 'utils/helperFunctions';

// APIs
export const baseEventAPI = 'http://api.mymookh.com/api/v2/stores/event/public';
export const ordersPayAPI = 'http://api.mymookh.com/api/v2/stores/orders/';

// Action Types
export const EVENT = asyncActionType('EVENT');
