/*
 *
 * EventBuyTicket constants
 *
 */

import { asyncActionType } from 'utils/helperFunctions';

// APIs
export const baseEventAPI = 'https://api.mymookh.com/stores/event/public';

// Action Types
export const EVENT = asyncActionType('EVENT');
export const PAYMENTS_MODAL = asyncActionType('PAYMENTS_MODAL');

