
import { fromJS } from 'immutable';
import paymentsReducer from '../reducer';

describe('paymentsReducer', () => {
  it('returns the initial state', () => {
    expect(paymentsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
