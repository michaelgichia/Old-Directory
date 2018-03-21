/*
 *
 * EventInfomation actions
 *
 */

import axios from 'axios';
import { EVENT_INFO, baseAPIEventInfo } from './constants';

export const fetctEventInfo = eventId => (dispatch) => {
  axios.get(`${baseAPIEventInfo}/${eventId}`).then((res) => {
    if (res.status === 200) {
      dispatch({
        type: EVENT_INFO.SUCCESS,
        eventInfo: res.data
      });
    } else {
      dispatch({
        type: EVENT_INFO.ERROR,
        error: res.error
      });
    }
  });
};
