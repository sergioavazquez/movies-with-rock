import { SagaIterator } from "redux-saga";
import { takeLeading, call } from "redux-saga/effects";
import { Types, FetchStartAction } from "./actions";
import { apiCall } from "api/movies";

const handleMovieFetch = function* (action: FetchStartAction): SagaIterator {
  const apiResponse = yield call(apiCall, action.movieFetchRequest);
  console.log(apiResponse);
};

const appSaga = function* (): SagaIterator {
  yield takeLeading(Types.FETCH_START, handleMovieFetch);
};

export { appSaga };
