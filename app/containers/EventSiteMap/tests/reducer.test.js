import expect from 'expect';
import eventSiteMapReducer from '../reducer';

describe('eventSiteMapReducer', () => {
  it('returns the initial state', () => {
    expect(eventSiteMapReducer(undefined, {})).toEqual({});
  });
});
