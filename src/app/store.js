import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from 'reducers/index';
import { reduxApiMiddleware } from 'libs/redux-api-middleware';

// initialize history
const history = createHistory();

// initialize middleware
const routingMiddleware = routerMiddleware(history);

// collect the middlewares used
const middleware = [
  thunk,
  reduxApiMiddleware,
  routingMiddleware
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

// create store
const store = createStore(
  rootReducer,
  enhancer
);

// persist store
const persistor = persistStore(store);

export { 
  history, 
  store, 
  persistor 
};
