/*
 *
 * PaymentsMethods actions
 *
 */

import axios from 'axios';
import {
  ORDERS_PAY,
  ORDERS_STATUS,
  baseEventAPI,
  ordersPayAPI,
  orderStatusAPI,
  ORDERS_STATUS_PENDING
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
}

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
}

// const status = orderPK => {
//   return axios.get(`${ordersPayAPI}/${orderPK}`).then(res => {
//     if (res.statusText !== "OK") {
//       dispatch({
//         type: ORDERS_STATUS.ERROR
//       });
//     } else {
//       return res;
//     }
//   });
// }

// export const getOrderStatus = orderPK => dispatch => {
//   return status(orderPK).then(res => {
//     if (res.data.order_status = "PENDING") {
//       return status(orderPK)
//     } else if (res.data.order_status = "PAID")
//   })
// }

// export const getOrderStatus = orderPK => dispatch => {
//   console.log('call for status');
//   return axios.get(`${ordersPayAPI}/${orderPK}`).then(first => {
//     console.log({ first });
//     if (first.statusText.includes('OK') && first.data.order_status === 'PAID') {
//       dispatch({
//         type: ORDERS_STATUS.SUCCESS
//       });
//     } else {
//       return axios.get(`${ordersPayAPI}/${orderPK}`).then(second => {
//         console.log({ second });
//         if (
//           second.statusText.includes('OK') &&
//           second.data.order_status === 'PAID'
//         ) {
//           dispatch({
//             type: ORDERS_STATUS.SUCCESS
//           });
//         } else {
//           return axios.get(`${ordersPayAPI}/${orderPK}`).then(third => {
//             console.log({ third });
//             if (
//               third.statusText.includes('OK') &&
//               third.data.order_status === 'PAID'
//             ) {
//               dispatch({
//                 type: ORDERS_STATUS.SUCCESS
//               });
//             } else {
//               dispatch({
//                 type: ORDERS_STATUS.ERROR
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// };