/*
 *
 * BuyTicket actions
 *
 */

import axios from "axios";
import { baseEventAPI, EVENT } from "./constants";

// Token
const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkZDI2Y2MyLTM1YzgtNGVlYS05YmJjLTljNTkyMjc3MmI0NyIsImZpcnN0X25hbWUiOiJCUklBTiIsImxhc3RfbmFtZSI6Ik1XQUtJTUEiLCJwaG9uZV9udW1iZXIiOiIwNzI4OTU2ODk1IiwiZW1haWwiOiJtd2FkaW1lQGZvcnR1bmVraWRldy5jby5rZSIsInByb2ZpbGVfcGhvdG8iOiIvbWVkaWEvcHJvZmlsZV9waG90b3MvMjAxNy8wOC8yMC9wbGFjZWhvbGRlci1wZXJzb24tMzAweDMwMF8wLmpwZyIsInVzZXJuYW1lIjoibXdhZGltZUBmb3J0dW5la2lkZXcuY28ua2UiLCJvcmlnX2lhdCI6MTUwNTI5MDYwM30.J1nPlh4qhSrIcJs9qxsvWR-mneb_QGVTqX8_IFhLNCM`;
axios.defaults.headers.common.Authorization = token;

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