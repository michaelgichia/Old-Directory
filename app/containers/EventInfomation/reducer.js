/*
 *
 * EventInfomation reducer
 *
 */

import {
  EVENT_INFO,
} from './constants';

const initialState = {
  eventInfo: {}
};

function eventInfomationReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_INFO.SUCCESS:
      return {
        ...state,
        eventInfo: action.eventInfo
      };

    default:
      return state;
  }
}

export default eventInfomationReducer;
