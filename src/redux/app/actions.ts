import { MovieList, ApiConfig } from "models/moviedb";
import { Config } from "models/system";
import { MovieFetchRequest } from "models/api";

const Types = {
  LOADING: "app/LOADING",
  FETCH_START: "app/FETCH_START",
  FETCH_SUCCESS: "app/FETCH_SUCCESS",
  CONFIG_READY: "app/CONFIG_READY",
  API_CONFIG_READY: "app/API_CONFIG_READY",
  ERROR: "app/ERROR",
};

export interface ErrorAction {
  type: typeof Types.ERROR;
  code: string | null;
  errorMsg: string;
}

export interface LoadingAction {
  type: typeof Types.LOADING;
  loading: boolean;
}

export interface FetchStartAction {
  type: typeof Types.FETCH_START;
  movieFetchRequest: MovieFetchRequest;
}

export interface FetchSuccessAction {
  type: typeof Types.FETCH_SUCCESS;
  movieList: MovieList;
}
export interface ApiConfigReadyAction {
  type: typeof Types.API_CONFIG_READY;
  apiConfig: ApiConfig;
}

export interface SystemConfigReadyAction {
  type: typeof Types.CONFIG_READY;
  config: Config;
}

export type AppActions =
  | ErrorAction
  | LoadingAction
  | FetchSuccessAction
  | FetchStartAction
  | ApiConfigReadyAction
  | SystemConfigReadyAction;

const Actions = {
  setLoading: (loading: boolean): LoadingAction => ({
    type: Types.LOADING,
    loading,
  }),
  fetchStart: (movieFetchRequest: MovieFetchRequest): FetchStartAction => ({
    type: Types.FETCH_START,
    movieFetchRequest,
  }),
  fetchSuccess: (movieList: MovieList): FetchSuccessAction => ({
    type: Types.FETCH_SUCCESS,
    movieList,
  }),
  setSystemConfig: (config: Config): SystemConfigReadyAction => ({
    type: Types.CONFIG_READY,
    config,
  }),
  setApiConfig: (apiConfig: ApiConfig): ApiConfigReadyAction => ({
    type: Types.API_CONFIG_READY,
    apiConfig,
  }),
  setError: (code: string, errorMsg: string): ErrorAction => ({
    type: Types.ERROR,
    code,
    errorMsg,
  }),
};

export { Types, Actions };
