/*
 *
 * DirectoryLandingPage constants
 *
 */
import { asyncActionType } from "utils/helperFunctions";

// APIs
export const getEventsAPI = 'http://api.mymookh.com/api/v2/stores/event/';

// Action Type
export const EVENTS = asyncActionType('EVENTS');

// Url
export const eventPosterBaseUrl = "http://mymookh.com/tickets/uploads";