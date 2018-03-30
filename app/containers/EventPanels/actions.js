/*
 *
 * DirectoryLandingPage actions
 *
 */
import axios from 'axios';
import { EVENTS, getEventsAPI } from './constants';

export const fetchEvents = () => (dispatch) => {
  dispatch({type: EVENTS.PENDING});
  axios.get(getEventsAPI).then((res) => {
    if (res.status === 200) {
      dispatch({
        type: EVENTS.SUCCESS,
        events: res.data
      });
    } else {
      dispatch({
        type: EVENTS.ERROR,
        error: res.error
      });
    }
  });
};
