
import { fromJS } from 'immutable';
import paymentSystemReducer from '../reducer';

describe('paymentSystemReducer', () => {
  it('returns the initial state', () => {
    expect(paymentSystemReducer(undefined, {})).toEqual(fromJS({}));
  });
});
