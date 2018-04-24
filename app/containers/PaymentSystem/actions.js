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
  PAYMENT_METHODS_TAB,
  TOTAL_TICKETS_PRICE,
} from './constants';

export const handleOrdersPayment = info => dispatch => {
  dispatch({ type: ORDERS_PAY.PENDING });
  axios
    .post(`${ordersPayAPI}/`, info)
    .then(
      res => {
        console.log({ res: "created" });
        dispatch({
          type: ORDERS_PAY.SUCCESS,
          orderPK: res.data.order_number,
          orderId: res.data.id
        });
      },
      err => {
        console.log({ err });
        dispatch({
          type: ORDERS_PAY.ERROR
        });
      }
    )
    .catch(err => {
      console.log({ err });
      dispatch({
        type: ORDERS_PAY.ERROR
      });
    });
};

export const getOrderStatus = (orderId, orderPK) => dispatch =>
  axios.get(`${ordersPayAPI}/?id=${orderId}&order_number=${orderPK}`, {timeout: 100}).then(
    res => {
      console.log({ status: res.data.results[0].order_status });
      if (
        res.data.results.length > 0 &&
        res.data.results[0].order_status === 'PAID'
      ) {
        dispatch({
          type: ORDERS_STATUS.SUCCESS
        });
      } else {
        dispatch({
          type: ORDERS_STATUS.PENDING
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

export function closeModalAndPayment() {
  console.log('called')
  return {
    type: PAYMENTS_MODAL.FINISH
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

export function resetPaymentProcess() {
  return {
    type: ORDERS_PAY.RESET
  };
}

export function handleTotalCost(cost) {
  return {
    type: TOTAL_TICKETS_PRICE.SUCCESS,
    cost
  };
}

// export const getManualOrderStatus = (orderId, orderPK) => dispatch => {
//   console.log('manual payment');
//   const API = `${ordersPayAPI}/?id=${orderId}&order_number=${orderPK}`;
//   dispatch({ type: PAYBILL.PENDING });
//   return axios.get(API).then(
//     res => {
//       const { results } = res.data;
//       if (results.length > 0 && results[0].order_status === 'PAID') {
//         dispatch({
//           type: ORDERS_STATUS.SUCCESS
//         });
//       } else if (results.length < 1) {
//         dispatch({
//           type: PAYBILL.ERROR
//         });
//       } else {
//         dispatch({
//           type: ORDERS_STATUS.PENDING
//         });
//       }
//     },
//     err => {
//       console.log({ err });
//       dispatch({
//         type: PAYBILL.ERROR
//       });
//     }
//   );
// };