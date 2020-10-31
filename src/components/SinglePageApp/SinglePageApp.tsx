import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header";
import MovieGrid from "components/MovieGrid";
import { selectMovieList } from "redux/app/selectors";
import { Actions } from "redux/app/actions";
import { MovieApiEndpoints, MovieFetchRequest } from "models/api";
import { RatingFilterState } from "components/RatingFilter";

import css from "./spa.module.scss";
const block = "spa";

const SinglePageApp = () => {
  const [ratingFilterStatus, setRatingFilterStatus] = useState<
    RatingFilterState
  >({
    active: false,
    stars: 5,
  });
  const [movieQuery, setMovieQuery] = useState("");
  const dispatch = useDispatch();
  const movieList = useSelector(selectMovieList);

  useEffect(() => {
    let request: MovieFetchRequest = { endpoint: MovieApiEndpoints.DISCOVER };
    if (movieQuery.length >= 3) {
      request = {
        endpoint: MovieApiEndpoints.SEARCH,
        query: movieQuery,
      };
    }
    dispatch(Actions.fetchStart(request));
  }, [dispatch, movieQuery]);

  const fetchMovies = useCallback(() => {
    if (ratingFilterStatus.active) {
      return movieList?.results.filter(
        (m) =>
          m.vote_average <= ratingFilterStatus.stars * 2 &&
          m.vote_average >= (ratingFilterStatus.stars - 1) * 2
      );
    }
    return movieList?.results;
  }, [movieList, ratingFilterStatus]);

  return (
    <div className={css[`${block}`]}>
      <Header search={setMovieQuery} />
      <MovieGrid
        movies={fetchMovies()}
        onMovieClick={() => {}}
        ratingFilterStatus={ratingFilterStatus}
        ratingFilterClick={setRatingFilterStatus}
      />
    </div>
  );
};

export default SinglePageApp;
