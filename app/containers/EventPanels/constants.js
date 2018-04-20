/*
 *
 * DirectoryLandingPage constants
 *
 */
import { asyncActionType } from 'utils/helperFunctions';

// APIs
export const getEventsAPI = 'https://api.mymookh.com/stores/event/public/';

// Action Type
export const EVENTS = asyncActionType('EVENTS');
export const EVENTS_MORE = asyncActionType("EVENTS_MORE");

// Url
export const eventPosterBaseUrl = 'http://mymookh.com/tickets/uploads';
