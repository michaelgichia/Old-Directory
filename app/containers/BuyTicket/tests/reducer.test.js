import expect from 'expect';
import buyTicketsReducer from '../reducer';

describe('buyTicketsReducer', () => {
  it('returns the initial state', () => {
    expect(buyTicketsReducer(undefined, {})).toEqual({});
  });
});
