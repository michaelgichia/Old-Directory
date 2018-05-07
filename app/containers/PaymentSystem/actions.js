/*
 *
 * PaymentSystem actions
 *
 */
import axios from 'axios';
import size from 'lodash/size';

import {
  ORDERS_PAY,
  ORDERS_STATUS,
  ORDERS_STATUS_PENDING,
  EVENT,
  PAYMENTS_MODAL,
  CARD_MPESA_TABS,
  PAYMENT_METHODS_TAB,
  TOTAL_TICKETS_PRICE,
  ORDERPK_ORDERID,
  PAYMENT_METHOD,
  baseEventAPI,
  ordersPayAPI,
  orderStatusAPI
} from './constants';

export const handleOrdersPayment = info => dispatch => {
  dispatch({ type: ORDERS_PAY.PENDING });
  axios
    .post(`${ordersPayAPI}/`, info)
    .then(
      res => {
        console.log({ res: 'created' });
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

export const getOrderStatus = (orderId, orderPK) => dispatch => {
  const url = `${ordersPayAPI}/?id=${orderId}&order_number=${orderPK}`;
  return axios
    .get(url)
    .then(res => {
      const { results } = res.data;
      if (size(results) > 0) {
        const order = results[0];
        const status = order.order_status;
        console.log({ status });

        if (status === 'PAID') {
          dispatch({ type: ORDERS_STATUS.SUCCESS });
        }

        if (status === 'FAILED') {
          dispatch({ type: ORDERS_STATUS.FAILURE });
        }

        if (status === 'PENDING') {
          dispatch({ type: ORDERS_STATUS.PENDING });
        }
      } else {
        dispatch({ type: ORDERS_STATUS.PENDING });
      }
    })
    .catch(err => {
      console.log({ err });
      dispatch({
        type: ORDERS_STATUS.ERROR
      });
    });
};

// export const getOrderStatus = (orderId, orderPK) => dispatch => {
//   const url = `${ordersPayAPI}/?id=${orderId}&order_number=${orderPK}`;
//   axios.get(url).then(
//     res => {
//       const { results } = res.data;
//       if (
//         res.data.results.length > 0 &&
//         res.data.results[0].order_status === 'PAID'
//       ) {
//         dispatch({
//           type: ORDERS_STATUS.SUCCESS
//         });
//       } else if (
//         res.data.results.length > 0 &&
//         res.data.results[0].order_status === 'FAILED'
//       ) {
//         console.log({ cardfailed: res });
//         dispatch({
//           type: ORDERS_STATUS.FAILURE
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
//         type: ORDERS_STATUS.ERROR
//       });
//     }
//   )
// }

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
  console.log('called');
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

export function setPaymentMethod(payment_method) {
  return {
    type: PAYMENT_METHOD.SET,
    payment_method
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

export function clearOrderPKOrderId() {
  return {
    type: ORDERPK_ORDERID.RESET
  };
}