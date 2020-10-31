import { SagaIterator } from "redux-saga";
import { call, put, select, throttle } from "redux-saga/effects";
import { Types, FetchStartAction, Actions } from "./actions";
import { fetchTmdbMovies, fetchTmdbConfig } from "api/movies";
import { selectApiConfig } from "./selectors";

const handleApiConfigFetch = function* (): SagaIterator {
  const apiConfig = yield call(fetchTmdbConfig);
  if (apiConfig.ok) {
    yield put(Actions.setApiConfig(apiConfig.data));
  }
};

const handleMovieFetch = function* (action: FetchStartAction): SagaIterator {
  const apiConfig = yield select(selectApiConfig);
  yield put(Actions.setLoading(true));
  if (!apiConfig) {
    yield call(handleApiConfigFetch);
  }
  const apiResponse = yield call(fetchTmdbMovies, action.movieFetchRequest);
  if (apiResponse.ok) {
    yield put(Actions.fetchSuccess(apiResponse.data));
    yield put(Actions.setLoading(false));
  }
};

const appSaga = function* (): SagaIterator {
  yield throttle(250, Types.FETCH_START, handleMovieFetch);
};

export { appSaga };
