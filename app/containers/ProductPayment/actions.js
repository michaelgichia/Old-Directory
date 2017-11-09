/*
 *
 * ProductPayment actions
 *
 */

import axios from "axios";
import {
  PAYMENTS_MODAL,
} from './constants';

export function openModal() {
  return {
    type: PAYMENTS_MODAL.SUCCESS,
  };
}

export function closeModal() {
  return {
    type: PAYMENTS_MODAL.ERROR,
  };
}

