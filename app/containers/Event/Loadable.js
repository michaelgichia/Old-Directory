/**
 *
 * Asynchronously loads the component for Event
 *
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
