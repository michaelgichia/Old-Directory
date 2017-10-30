/*
 *
 * EventBuyTicket reducer
 *
 */

import { EVENT, ORDERS_PAY } from "./constants";

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

    case ORDERS_PAY.SUCCESS:
      console.log({success: action})
      return {
        ...state
      };

    case ORDERS_PAY.ERROR:
      console.log({error: action})
      return {
        ...state
      };

    default:
      return state;
  }
}

export default buyTicketReducer;
