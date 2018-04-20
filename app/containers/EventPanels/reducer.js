/*
 *
 * EventPanels reducer
 *
 */

import { EVENTS, EVENTS_MORE } from './constants';

const initialState = {
  events: [],
  appState: 'fetching',
  pagination: {
    isInfiniteLoading: false,
    numPages: 0,
    currentPage: 2,
    hasMore: true
  }
};

function eventPanelsReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS.PENDING:
      return {
        ...state,
        appState: 'fetching'
      };

    case EVENTS.SUCCESS:
      return {
        ...state,
        events: action.events.results,
        appState: 'success'
      };

    case EVENTS_MORE.PENDING:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          isInfiniteLoading: true
        }
      };

    case EVENTS_MORE.SUCCESS:
      console.log({ actions: action.events });
      const { pagination } = action.events;
      return {
        ...state,
        events: [...state.events].concat(action.events.results),
        pagination: {
          ...state.pagination,
          isInfiniteLoading: false,
          hasMore:
            pagination.current_page >= pagination.num_pages ? false : true,
          numPages: pagination.num_pages,
          currentPage: pagination.current_page + 1
        }
      };

    default:
      return state;
  }
}

export default eventPanelsReducer;