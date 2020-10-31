import React from "react";
import { useSelector } from "react-redux";
import { Movie } from "models/moviedb";
import { selectApiConfig } from "redux/app/selectors";
import missingImg from "static/img/missing-img.png";

import css from "./movieGrid.module.scss";

interface Props {
  movies?: Movie[];
  onMovieClick: Function;
}

const block = "movie-grid";

const MovieGrid: React.FC<Props> = ({ movies, onMovieClick }) => {
  const apiConfig = useSelector(selectApiConfig);
  const renderMovies = () => {
    if (movies?.length === 0) {
      return <h2>Sorry, no results...</h2>;
    }
    return movies?.map((m) => {
      let imgSrc = missingImg;
      if (m.poster_path) {
        const imgSize = apiConfig?.images.poster_sizes[3];
        imgSrc = `${apiConfig?.images.base_url}${imgSize}${m.poster_path}`;
      }
      return (
        <button className={css[`${block}__card`]} key={m.id}>
          <img src={imgSrc} alt={m.title} />
        </button>
      );
    });
  };
  return (
    <div className={css[`${block}`]}>
      {/* <h1>This is the movie grid</h1> */}
      <div className={css[`${block}__container`]}>{renderMovies()}</div>
    </div>
  );
};

export default MovieGrid;
