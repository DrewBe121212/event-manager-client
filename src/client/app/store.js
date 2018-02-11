import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import axios from 'axios';
import axiousMiddleware from 'redux-axios-middleware';
import createSagaMiddleware from 'redux-saga';
import {config} from 'config';
import {reducers} from 'reducers';
import {rootSaga, refreshAbilities} from 'sagas';

const axiosClient = axios.create({
  baseURL: config.API.EVENT_MANAGER,
  responseType: 'json'
});

const axiosMiddleware = axiousMiddleware(axiosClient);

const history = createHistory();
const routingMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

// array of used middlewares
const middleware = [
  routingMiddleware, axiosMiddleware, sagaMiddleware
];

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

sagaMiddleware.run(refreshAbilities);
sagaMiddleware.run(rootSaga);

export {history, store};
