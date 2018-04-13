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

export const getOrderStatus = orderPK => dispatch => {
  return axios.get(`${orderStatusAPI}/${orderPK}`).then(first => {
    console.log({ first });
    if (
      `${first.status}`.includes('20') &&
      first.data.order_status === 'PAID'
    ) {
      dispatch({
        type: ORDERS_STATUS.SUCCESS
      });
    } else {
      return axios.get(`${orderStatusAPI}/${orderPK}`).then(second => {
        console.log({ second });
        if (
          `${second.status}`.includes('20') &&
          second.data.order_status === 'PAID'
        ) {
          dispatch({
            type: ORDERS_STATUS.SUCCESS
          });
        } else {
          return axios.get(`${orderStatusAPI}/${orderPK}`).then(third => {
            console.log({ third });
            if (
              `${third.status}`.includes('20') &&
              third.data.order_status === 'PAID'
            ) {
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