import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import {reducers} from './reducers';

const history = createHistory();

const myRouterMiddleware = routerMiddleware(history);

const middleware = [myRouterMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger({
    duration: true,
    collapsed: true,
    logErrors: true
  });
  middleware.push(loggerMiddleware);
}

const enhancer = composeWithDevTools(
  applyMiddleware(...middleware)
);

const store = createStore(
  reducers,
  enhancer
);

export {history, store};
