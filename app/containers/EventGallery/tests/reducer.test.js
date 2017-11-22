import expect from 'expect';
import eventGalleryReducer from '../reducer';

describe('eventGalleryReducer', () => {
  it('returns the initial state', () => {
    expect(eventGalleryReducer(undefined, {})).toEqual({});
  });
});
