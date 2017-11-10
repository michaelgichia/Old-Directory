/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import languageProviderReducer from "containers/LanguageProvider/reducer";
import eventPanelsReducer from "containers/EventPanels/reducer";
import buyTicketReducer from "containers/EventBuyTicket/reducer";
import eventInfomationReducer from "containers/EventInfomation/reducer";
import paymentsReducer from "containers/Payments/reducer";
import paymentsMethodsReducer from "containers/PaymentsMethods/reducer";

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    buyTicket: buyTicketReducer,
    eventPanels: eventPanelsReducer,
    eventInfomation: eventInfomationReducer,
    payments: paymentsReducer,
    paymentsMethods: paymentsMethodsReducer,
    language: languageProviderReducer,
    ...asyncReducers
  });
}
