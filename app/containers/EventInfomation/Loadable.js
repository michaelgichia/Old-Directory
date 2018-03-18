/**
 *
 * Asynchronously loads the component for EventInfomation
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
