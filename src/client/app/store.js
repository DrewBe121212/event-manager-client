import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import axios from 'axios';
import axiousMiddleware from 'redux-axios-middleware';

import {reducers} from './reducers';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  responseType: 'json'
});
const axiosMiddleware = axiousMiddleware(axiosClient);

const history = createHistory();
const routingMiddleware = routerMiddleware(history);

// array of used middlewares
const middleware = [routingMiddleware, axiosMiddleware];

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
