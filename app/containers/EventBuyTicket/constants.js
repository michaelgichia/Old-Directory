/*
 *
 * EventBuyTicket constants
 *
 */

import { asyncActionType } from 'utils/helperFunctions';

// APIs
export const baseEventAPI = 'http://api.mymookh.com/api/v2/stores/event/public';

// Action Types
export const EVENT = asyncActionType('EVENT');
export const PAYMENTS_MODAL = asyncActionType('PAYMENTS_MODAL');

