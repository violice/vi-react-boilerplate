/* eslint-disable import/no-extraneous-dependencies */
import logger from 'redux-logger';
/* elint-enable */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from 'utils';

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production'
  && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
  : compose;
/* eslint-enable */

export default (history) => {
  const middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const store = createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(...middlewares),
    ),
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  store.injectReducer = (key, reducer) => {
    store.injectedReducers[key] = reducer;
    store.replaceReducer(createRootReducer(history, store.injectedReducers));
  };

  store.injectSaga = (key, saga) => {
    store.injectedSagas[key] = { saga, task: store.runSaga(saga) };
  };

  store.ejectSaga = (key) => {
    store.injectedSagas[key].task.cancel();
  };

  return store;
};
