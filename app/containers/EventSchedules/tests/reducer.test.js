import expect from 'expect';
import eventSchedulesReducer from '../reducer';

describe('eventSchedulesReducer', () => {
  it('returns the initial state', () => {
    expect(eventSchedulesReducer(undefined, {})).toEqual({});
  });
});
