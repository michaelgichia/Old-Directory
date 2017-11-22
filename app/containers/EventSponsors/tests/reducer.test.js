import expect from 'expect';
import eventSponsorsReducer from '../reducer';

describe('eventSponsorsReducer', () => {
  it('returns the initial state', () => {
    expect(eventSponsorsReducer(undefined, {})).toEqual({});
  });
});
