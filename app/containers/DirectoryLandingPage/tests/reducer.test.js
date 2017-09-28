import expect from 'expect';
import directoryLandingPageReducer from '../reducer';

describe('directoryLandingPageReducer', () => {
  it('returns the initial state', () => {
    expect(directoryLandingPageReducer(undefined, {})).toEqual({});
  });
});
