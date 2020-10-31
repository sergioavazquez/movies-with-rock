import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header";
import MovieGrid from "components/MovieGrid";
import { selectMovieList } from "redux/app/selectors";
import { Actions } from "redux/app/actions";
import { MovieApiEndpoints, MovieFetchRequest } from "models/api";

import css from "./spa.module.scss";
const block = "spa";

const SinglePageApp = () => {
  const [ratingFilter, setRatingFilter] = useState({ active: false, stars: 5 });
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

  const fetchMovies = () => {
    if (ratingFilter.active) {
      return movieList?.results.filter(
        (m) =>
          m.vote_average <= ratingFilter.stars * 2 &&
          m.vote_average >= (ratingFilter.stars - 1) * 2
      );
    }
    return movieList?.results;
  };

  return (
    <div className={css[`${block}`]}>
      <Header search={setMovieQuery} />
      <MovieGrid movies={fetchMovies()} onMovieClick={() => {}} />
    </div>
  );
};

export default SinglePageApp;
