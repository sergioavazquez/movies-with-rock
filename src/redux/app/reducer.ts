import { createReducer } from "redux/utils";
import { MovieList } from "models/moviedb";
import { Config } from "models/system";
import { ErrorNotification } from "models/notifications";
import {
  ErrorAction,
  LoadingAction,
  Types,
  AppActions,
  SystemConfigReadyAction,
  FetchSuccessAction,
} from "./actions";

interface AppState {
  config: Config | null;
  isLoading: boolean;
  mainError: ErrorNotification;
  movieList: MovieList | null;
}

const initialState: AppState = {
  config: null,
  isLoading: false,
  mainError: {
    code: null,
    errorMsg: "",
  },
  movieList: null,
};

const handleError = (state: AppState, action: ErrorAction): AppState => ({
  ...state,
  mainError: {
    code: action.code,
    errorMsg: action.errorMsg,
  },
});

const handleLoading = (state: AppState, action: LoadingAction): AppState => ({
  ...state,
  isLoading: action.loading,
});

const handleFetchSuccess = (
  state: AppState,
  action: FetchSuccessAction
): AppState => ({
  ...state,
  movieList: action.movieList,
});

const handleConfigReady = (
  state: AppState,
  action: SystemConfigReadyAction
): AppState => ({
  ...state,
  config: action.config,
});

const actionHandlers = {
  [Types.LOADING]: handleLoading,
  [Types.FETCH_SUCCESS]: handleFetchSuccess,
  [Types.ERROR]: handleError,
  [Types.CONFIG_READY]: handleConfigReady,
};

export default createReducer<AppState, AppActions>(
  initialState,
  actionHandlers
);
