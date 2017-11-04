/*
 *
 * Payments actions
 *
 */

import {
  PAYMENTS_MODAL,
} from './constants';

export function closeModal() {
  return {
    type: PAYMENTS_MODAL.SUCCESS,
  };
}
