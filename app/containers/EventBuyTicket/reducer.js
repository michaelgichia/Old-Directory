/*
 *
 * EventBuyTicket reducer
 *
 */

import { EVENT } from "./constants";

const initialState = {
  event: {}
};

function buyTicketReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT.SUCCESS:
      return {
        ...state,
        event: action.event
      };
    default:
      return state;
  }
}

export default buyTicketReducer;
