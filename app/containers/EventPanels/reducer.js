/*
 *
 * EventPanels reducer
 *
 */

import { EVENTS } from './constants';

const initialState = {
  events: [],
  appState: 'fetching'
};

function eventPanelsReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS.PENDING:
      return {
        ...state,
        events: action.events,
        appState: 'fetching'
      };

    case EVENTS.SUCCESS:
      return {
        ...state,
        events: action.events.results,
        appState: 'success'
      };

    default:
      return state;
  }
}

export default eventPanelsReducer;