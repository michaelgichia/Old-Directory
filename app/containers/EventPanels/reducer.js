/*
 *
 * EventPanels reducer
 *
 */

import { EVENTS } from './constants';
import data from './data';

const initialState = {
  events: data
};

function eventPanelsReducer(state = initialState, action) {

  switch (action.type) {
    case EVENTS.SUCCESS:
      return {
        ...state,
        events: action.events,
      };

    default:
      return state;
  }
}

export default eventPanelsReducer;