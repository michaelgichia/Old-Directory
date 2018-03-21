/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import globalReducer from "containers/App/reducer";
import eventPanelsReducer from 'containers/EventPanels/reducer';
import buyTicketReducer from 'containers/EventBuyTicket/reducer';
import eventInfomationReducer from 'containers/EventInfomation/reducer';
import paymentsReducer from 'containers/Payments/reducer';
import paymentsMethodsReducer from 'containers/PaymentsMethods/reducer';
import eventReducer from 'containers/Event/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

export function location(state = null, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return action.payload;
    default:
      return state;
  }
}

const routeReducer = combineReducers({ location });

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    event: eventReducer,
    global: globalReducer,
    eventPanels: eventPanelsReducer,
    buyTicket: buyTicketReducer,
    eventInfomation: eventInfomationReducer,
    payments: paymentsReducer,
    paymentsMethods: paymentsMethodsReducer,
    language: languageProviderReducer,
    ...injectedReducers
  });
}
