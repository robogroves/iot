import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import productionReducer from '../reducers/production';
import engineerReducer from '../reducers/engineer';

var rootReducer;

const settings = require('electron-settings');

settings.defaults({
  app: 'production'
});

settings.get('app').then(val => {
  switch (val) {
    case 'production':
      rootReducer = productionReducer;
      break;
    case 'engineer':
      rootReducer = engineerReducer;
      break;
    default:
      rootReducer = productionReducer;
      break;
  }

    console.log(val);
});

const actionCreators = {
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers/production', () =>
      store.replaceReducer(require('../reducers/production')) // eslint-disable-line global-require
    );
  }

  return store;
}
