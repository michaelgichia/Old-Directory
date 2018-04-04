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
  orderStatusAPI
} from './constants';

export const handleOrdersPayment = info => dispatch => {
  axios
    .post(ordersPayAPI, info)
    .then(res => {
      console.log({ one: res });
      if (res.status === 201) {
        dispatch({
          type: ORDERS_PAY.SUCCESS,
          orderPK: res.data.id
        });
      } else {
        dispatch({
          type: ORDERS_PAY.ERROR
        });
      }
    })
    .catch(err => {
      console.log({ err });
      dispatch({
        type: ORDERS_PAY.ERROR
      });
    });
};

// export const handleOrdersPayment = info => dispatch => {
//   axios
//     .post(ordersPayAPI, info)
//     .then(response => {
//       console.log({one: response});
//       return axios.get(`${orderStatusAPI}/${response.data.id}`);
//     })
//     .then(res => {
//         console.log({two: res})
//       if (res.status === 200 && res.data.order_status !== null) {
//         dispatch({
//           type: ORDERS_STATUS.SUCCESS
//         });
//       } else {
//         dispatch({
//           type: ORDERS_STATUS.ERROR
//         });
//       }
//     })
//     .catch(err => {
//       console.log({ err });
//       dispatch({
//         type: ORDERS_PAY.ERROR
//       });
//     });
// };

export const getOrderStatus = orderPK => dispatch => {
  return axios.get(`${orderStatusAPI}/${orderPK}`).then(res => {
    console.log({ res });
    if (res.status === 200 && res.data.order_status === 'PAID') {
      dispatch({
        type: ORDERS_STATUS.SUCCESS
      });
    } else {
      return axios.get(`${orderStatusAPI}/${orderPK}`).then(res2 => {
        console.log({res2})
        if (res2.status === 200 && res2.data.order_status === 'PAID') {
          dispatch({
            type: ORDERS_STATUS.SUCCESS
          });
        } else {
          return axios.get(`${orderStatusAPI}/${orderPK}`).then(res3 => {
            console.log({res3})
            if (res3.status === 200 && res3.data.order_status === 'PAID') {
              dispatch({
                type: ORDERS_STATUS.SUCCESS
              });
            } else {
              dispatch({
                type: ORDERS_STATUS.ERROR
              });
            }
          });
        }
      });
    }
  });
};