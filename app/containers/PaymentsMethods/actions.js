/*
 *
 * PaymentsMethods actions
 *
 */

import axios from "axios";
import {
  ORDERS_PAY,
  ORDERS_STATUS,
  baseEventAPI,
  ordersPayAPI,
  orderStatusAPI
} from "./constants";

export const handleOrdersPayment = info => dispatch => {
  axios.post(ordersPayAPI, info).then(res => {
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
  });
};

export const getOrderStatus = orderPK => dispatch => {
  axios.get(`${orderStatusAPI}/${orderPK}`).then(res => {
    if (res.status === 200 && res.data.order_status !== null) {
      dispatch({
        type: ORDERS_STATUS.SUCCESS
      });
    } else {
      dispatch({
        type: ORDERS_STATUS.ERROR
      });
    }
  });
};