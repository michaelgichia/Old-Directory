/**
 *
 * Asynchronously loads the component for EventPanels
 *
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
