import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import axios from 'axios';
import axiousMiddleware from 'redux-axios-middleware';

import {config} from 'config';
import {reducers} from 'reducers';
import {setAbilitiesFromStore} from 'utils/abilities';

const axiosClient = axios.create({
  baseURL: config.API.EVENT_MANAGER,
  responseType: 'json'
});

const axiosMiddleware = axiousMiddleware(axiosClient);

const history = createHistory();
const routingMiddleware = routerMiddleware(history);

// array of used middlewares
const middleware = [
  routingMiddleware, axiosMiddleware
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

setAbilitiesFromStore(store);

export {history, store};
