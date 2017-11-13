import expect from 'expect';
import eventReducer from '../reducer';

describe('eventReducer', () => {
  it('returns the initial state', () => {
    expect(eventReducer(undefined, {})).toEqual({});
  });
});
