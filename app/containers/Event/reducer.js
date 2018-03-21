/*
 *
 * Event reducer
 *
 */

import { EVENT } from './constants';

const initialState = {
  event: {},
  eventError: ''
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT.SUCCESS:
      return {
        ...state,
        event: action.event
      };

    case EVENT.ERROR:
      return {
        ...state,
        eventError: action.error
      };

    default:
      return state;
  }
}

export default eventReducer;
