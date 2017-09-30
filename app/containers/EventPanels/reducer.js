/*
 *
 * EventPanels reducer
 *
 */

import { EVENTS } from './constants';

const initialState = {
  events: []
};

function eventPanelsReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS.SUCCESS:
      return {
        ...state,
        events: action.events
      };

    default:
      return state;
  }
}

export default eventPanelsReducer;
