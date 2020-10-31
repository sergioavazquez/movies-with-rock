import React from "react";
import { useSelector } from "react-redux";
import { Movie } from "models/moviedb";
import { selectApiConfig, selectIsLoading } from "redux/app/selectors";
import RatingFilter, { RatingFilterState } from "components/RatingFilter";
import missingImg from "static/img/missing-img.png";
import { BiLoaderCircle } from "react-icons/bi";

import css from "./movieGrid.module.scss";
import SmoothSwitch from "utils/SmoothSwitch";
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
  const isLoading = useSelector(selectIsLoading);

  const renderPlaceholder = () => {
    return (
      <div className={css[`${block}__loader`]}>
        {" "}
        <BiLoaderCircle />
      </div>
    );
  };

  const renderMovies = () => {
    if (movies?.length === 0) {
      return <h2>Sorry, no results...</h2>;
    }
    const movieRenders = movies?.map((m) => {
      let imgSrc = missingImg;
      if (m.poster_path) {
        // imgSize should be chosen according to screen dpi/size.
        const imgSize = apiConfig?.images.poster_sizes[3];
        imgSrc = `${apiConfig?.images.base_url}${imgSize}${m.poster_path}`;
      }
      return (
        <button
          className={css[`${block}__card`]}
          key={m.id}
          onClick={() => {
            onMovieClick(m);
          }}
        >
          <img src={imgSrc} alt={m.title} />
        </button>
      );
    });
    return movieRenders;
  };
  return (
    <div className={css[`${block}`]}>
      <RatingFilter
        filterStatus={ratingFilterStatus}
        onFilterClick={ratingFilterClick}
      />
      <div className={css[`${block}__container`]}>
        <SmoothSwitch
          showContent={!isLoading}
          placeholder={renderPlaceholder}
          content={renderMovies}
        ></SmoothSwitch>
      </div>
    </div>
  );
};

export default MovieGrid;
