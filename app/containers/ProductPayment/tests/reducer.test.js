import expect from 'expect';
import productPaymentReducer from '../reducer';

describe('productPaymentReducer', () => {
  it('returns the initial state', () => {
    expect(productPaymentReducer(undefined, {})).toEqual({});
  });
});
