import { GlobalState } from "redux/reducers";
// import { Config } from "models/system";
import { MovieList, ApiConfig } from "models/moviedb";

export const selectMovieList = (state: GlobalState): MovieList | null =>
  state.appReducer.movieList;

export const selectApiConfig = (state: GlobalState): ApiConfig | null =>
  state.appReducer.apiConfig;

export const selectIsLoading = (state: GlobalState): boolean =>
  state.appReducer.isLoading;
