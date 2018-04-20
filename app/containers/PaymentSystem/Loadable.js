/**
 *
 * Asynchronously loads the component for PaymentSystem
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
