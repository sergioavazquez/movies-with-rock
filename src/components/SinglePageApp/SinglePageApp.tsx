import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header";
import MovieGrid from "components/MovieGrid";
import MovieDetails from "components/MovieDetails";
import { selectMovieList } from "redux/app/selectors";
import { Actions } from "redux/app/actions";
import { Movie } from "models/moviedb";
import { MovieApiEndpoints, MovieFetchRequest } from "models/api";
import { RatingFilterState } from "components/RatingFilter";

import css from "./spa.module.scss";
const block = "spa";

const SinglePageApp = () => {
  const [ratingFilterStatus, setRatingFilterStatus] =
    useState<RatingFilterState>({
      active: false,
      stars: 5,
    });
  const [movieDetail, setMovieDetail] = useState<Movie | null>(null);
  const [movieQuery, setMovieQuery] = useState("");
  const dispatch = useDispatch();
  const movieList = useSelector(selectMovieList);

  useEffect(() => {
    let request: MovieFetchRequest = {
      endpoint: MovieApiEndpoints.DISCOVER,
      sortBy: "popularity.desc",
    };
    if (movieQuery.length >= 1) {
      request = {
        endpoint: MovieApiEndpoints.SEARCH,
        query: movieQuery,
        sortBy: "popularity.desc",
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
        onMovieClick={setMovieDetail}
        ratingFilterStatus={ratingFilterStatus}
        ratingFilterClick={setRatingFilterStatus}
      />
      <MovieDetails movie={movieDetail} close={() => setMovieDetail(null)} />
    </div>
  );
};

export default SinglePageApp;
