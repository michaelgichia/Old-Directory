/*
 *
 * App reducer
 *
 */
import { combineReducers } from 'redux';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = {};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}


export default combineReducers({
  global: globalReducer,
});
