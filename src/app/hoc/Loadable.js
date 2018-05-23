import ReactLoadable from 'react-loadable';
import { store } from 'store';

const Loadable = (options) => ReactLoadable({
  loading: () => null,
  delay: 300,
  ...options
});

export default Loadable;