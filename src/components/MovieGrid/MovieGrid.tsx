import React from "react";
import { useSelector } from "react-redux";
import { Movie } from "models/moviedb";
import { selectApiConfig } from "redux/app/selectors";
import RatingFilter, { RatingFilterState } from "components/RatingFilter";
import missingImg from "static/img/missing-img.png";

import css from "./movieGrid.module.scss";
const block = "movie-grid";
interface Props {
  movies?: Movie[];
  onMovieClick: Function;
  ratingFilterStatus: RatingFilterState;
  ratingFilterClick: Function;
}

const MovieGrid: React.FC<Props> = ({
  movies,
  onMovieClick,
  ratingFilterStatus,
  ratingFilterClick,
}) => {
  const apiConfig = useSelector(selectApiConfig);
  const renderMovies = () => {
    if (movies?.length === 0) {
      return <h2>Sorry, no results...</h2>;
    }
    return movies?.map((m) => {
      let imgSrc = missingImg;
      if (m.poster_path) {
        // imgSize should be chosen according to screen dpi/size.
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
      <RatingFilter
        filterStatus={ratingFilterStatus}
        onFilterClick={ratingFilterClick}
      />

      <div className={css[`${block}__container`]}>{renderMovies()}</div>
    </div>
  );
};

export default MovieGrid;
