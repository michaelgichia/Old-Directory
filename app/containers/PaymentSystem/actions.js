/*
 *
 * PaymentSystem actions
 *
 */
import axios from 'axios';

import {
  ORDERS_PAY,
  ORDERS_STATUS,
  baseEventAPI,
  ordersPayAPI,
  orderStatusAPI,
  ORDERS_STATUS_PENDING,
  EVENT,
  PAYMENTS_MODAL,
  CARD_MPESA_TABS,
  PAYMENT_METHODS_TAB
} from './constants';

const CancelToken = axios.CancelToken;

let cancelpayMent;
export const handleOrdersPayment = info => dispatch => {
  dispatch({ type: ORDERS_PAY.PENDING });
  axios
    .post(`${ordersPayAPI}/`, {
      ...info,
      cancelToken: new CancelToken(function executor(c) {
        cancelpayMent = c;
      })
    })
    .then(
      res =>
        dispatch({
          type: ORDERS_PAY.SUCCESS,
          orderPK: res.data.order_number
        }),
      err =>
        dispatch({
          type: ORDERS_PAY.ERROR
        })
    )
    .catch(err => {
      console.log({ err });
      dispatch({
        type: ORDERS_PAY.ERROR
      });
    });
};

export const handleCancelpayMent = () => {
  return cancelpayMent();
};

let cancelStatus;
export const getOrderStatus = orderPK => dispatch =>
  axios
    .get(`${ordersPayAPI}/?order_number=${orderPK}`, {
      cancelToken: new CancelToken(function executor(c) {
        cancelStatus = c;
      })
    })
    .then(
      res => {
        console.log({ status: res.data.results[0].order_status });
        if (res.data.results[0].order_status === 'PAID') {
          dispatch({
            type: ORDERS_STATUS.SUCCESS
          });
        } else {
          dispatch({
            type: ORDERS_STATUS_PENDING
          });
        }
      },
      err => {
        console.log({ err });
        dispatch({
          type: ORDERS_STATUS.ERROR
        });
      }
    );

export const handleCancelStatus = () => {
  return cancelStatus();
};
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

export function openModal(ticketCategory, customer, totalTicketsPrice, event) {
  return {
    type: PAYMENTS_MODAL.OPEN,
    ticketCategory,
    customer,
    totalTicketsPrice,
    event
  };
}

export function closeModal() {
  return {
    type: PAYMENTS_MODAL.CLOSE
  };
}

export function setTicketModalTabIndex(ticketModalTabIndex) {
  return {
    type: PAYMENT_METHODS_TAB.SET,
    ticketModalTabIndex
  };
}

export function setCardOrMpesaTabIndex(cardOrMpesaTabIndex) {
  return {
    type: CARD_MPESA_TABS.SET,
    cardOrMpesaTabIndex
  };
}

// export const fetchEvent = eventId => (dispatch) => {
//   axios.get(`${baseEventAPI}/${eventId}`).then((res) => {
//     if (res.status === 200) {
//       dispatch({
//         type: EVENT.SUCCESS,
//         event: res.data
//       });
//     } else {
//       dispatch({
//         type: EVENT.ERROR,
//         error: res.error
//       });
//     }
//   });
// };
