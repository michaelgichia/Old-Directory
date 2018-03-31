
import { fromJS } from 'immutable';
import promoCodeSystemReducer from '../reducer';

describe('promoCodeSystemReducer', () => {
  it('returns the initial state', () => {
    expect(promoCodeSystemReducer(undefined, {})).toEqual(fromJS({}));
  });
});
