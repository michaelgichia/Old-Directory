/*
 *
 * PaymentsMethods actions
 *
 */

import axios from "axios";
import {
  ORDERS_PAY,
  baseEventAPI,
  ordersPayAPI
} from "./constants"

export const handleOrdersPayment = info => dispatch => {
  axios.post(ordersPayAPI, info).then( res => {
    if (res.status === 200) {
      dispatch({
        type: ORDERS_PAY.SUCCESS
      })
    } else {
      dispatch({
        type: ORDERS_PAY.ERROR
      })
    }
  })
}