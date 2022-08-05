import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import * as Reducers from "./Reducers";
import rootSaga from "rootSaga";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (preloadedState?: any) => {

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), sagaMiddleware)
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
