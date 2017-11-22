/*
 *
 * EventBuyTicket actions
 *
 */

import axios from "axios";
import { baseEventAPI, EVENT, PAYMENTS_MODAL } from "./constants";

export const fetchEvent = eventId => dispatch => {
  axios.get(`${baseEventAPI}/${eventId}`).then(res => {
    if (res.status === 200) {
      dispatch({
        type: EVENT.SUCCESS,
        event: res.data
      });
    } else {
      dispatch({
        type: EVENT.ERROR,
        error: res.error
      });
    }
  });
};

// export const handleOrdersPayment = info => dispatch => {
//   axios.post(ordersPayAPI, info).then( res => {
//     console.log({res})
//     if (res.status === 200) {
//       dispatch({
//         type: ORDERS_PAY.SUCCESS
//       })
//     } else {
//       dispatch({
//         type: ORDERS_PAY.ERROR
//       })
//     }
//   })
// }

export function openModal(ticketCategory, customer) {
  return {
    type: PAYMENTS_MODAL.SUCCESS,
    ticketCategory,
    customer
  };
}

export function closeModal() {
  return {
    type: PAYMENTS_MODAL.ERROR,
  };
}
