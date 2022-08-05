import { combineReducers } from "redux";
import * as Reducers from "./Reducers";
import { connectRouter } from 'connected-react-router';
import { History } from 'history'

// import counterReducer from "./Counter/counter.reducer";

const reducers = {
  ...Reducers,
}

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  ...reducers
})

export default rootReducer;