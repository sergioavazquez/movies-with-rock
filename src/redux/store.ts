import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createSagaMiddleware from "redux-saga";

import reducers from "redux/reducers";
import sagas from "redux/sagas";

const sagaMiddleware = createSagaMiddleware({ onError: (e) => console.log(e) });
const midddlewares = applyMiddleware(sagaMiddleware);

// Create Store
const store = createStore(reducers, composeWithDevTools(midddlewares));

// Run Sagas
sagaMiddleware.run(sagas);

export default store;
