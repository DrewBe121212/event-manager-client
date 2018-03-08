import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import {reducers} from 'reducers';
import {rootSaga} from 'sagas';

// initialize history
const history = createHistory();

// initialize middleware
const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

// array of used middlewares
const middleware = [
  routingMiddleware,
  sagaMiddleware
];

// add logging to non production environments
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

sagaMiddleware.run(rootSaga);

export {history, store};
