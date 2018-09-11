/*
 *
 * DirectoryLandingPage actions
 *
 */
import axios from 'axios';
import { EVENTS, getEventsAPI, EVENTS_MORE } from './constants';

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

export const fetchMoreEvents = (page) => (dispatch) => {
  dispatch({type: EVENTS_MORE.PENDING});
  axios.get(`${getEventsAPI}?page=${page}`).then((res) => {
    if (res.status === 200) {
      dispatch({
        type: EVENTS_MORE.SUCCESS,
        events: res.data
      });
    } else {
      console.log({error: res.error})
    }
  });
};
