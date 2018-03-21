/*
 *
 * EventBuyTicket actions
 *
 */

import axios from 'axios';
import { baseEventAPI, EVENT, PAYMENTS_MODAL } from './constants';

export const fetchEvent = eventId => (dispatch) => {
  axios.get(`${baseEventAPI}/${eventId}`).then((res) => {
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

export function openModal(ticketCategory, customer, totalTicketsPrice, event) {
  return {
    type: PAYMENTS_MODAL.SUCCESS,
    ticketCategory,
    customer,
    totalTicketsPrice,
    event
  };
}

export function closeModal() {
  return {
    type: PAYMENTS_MODAL.ERROR
  };
}
