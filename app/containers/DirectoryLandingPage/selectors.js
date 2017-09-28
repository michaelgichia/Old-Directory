import { createSelector } from 'reselect';

/**
 * Direct selector to the directoryLandingPage state domain
 */
const selectDirectoryLandingPageDomain = () => (state) => state.directoryLandingPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DirectoryLandingPage
 */

const makeSelectDirectoryLandingPage = () => createSelector(
  selectDirectoryLandingPageDomain(),
  (substate) => substate
);

export default makeSelectDirectoryLandingPage;
export {
  selectDirectoryLandingPageDomain,
};
