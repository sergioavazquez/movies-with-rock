import React from "react";
import { useSelector } from "react-redux";
import { Movie } from "models/moviedb";
import { selectApiConfig } from "redux/app/selectors";
import { IoIosClose } from "react-icons/io";
import missingBack from "static/img/missing-back.png";

import css from "./movieDetails.module.scss";
const block = "movie-details";

interface Props {
  movie?: Movie | null;
  close: Function;
}

const MovieDetails: React.FC<Props> = ({ movie, close }) => {
  const apiConfig = useSelector(selectApiConfig);

  const renderMovieDetails = () => {
    if (movie) {
      let imgSrc = missingBack;
      if (movie.backdrop_path) {
        // imgSize should be chosen according to screen dpi/size.
        const imgSize = apiConfig?.images.poster_sizes[5];
        imgSrc = `${apiConfig?.images.base_url}${imgSize}${movie.backdrop_path}`;
      }
      return (
        <div className={css[`${block}`]}>
          <div className={css[`${block}__card`]}>
            <button
              onClick={() => {
                close();
              }}
              className={css[`${block}__card__close`]}
            >
              <IoIosClose />
            </button>
            <div className={css[`${block}__card__description`]}>
              <div className={css[`${block}__card__description__row`]}>
                <span
                  className={
                    css[`${block}__card__description__row__value-title`]
                  }
                >
                  {movie?.title}
                </span>
              </div>
            </div>
            <img src={imgSrc} alt={movie.title} />
            <div className={css[`${block}__card__description`]}>
              <div className={css[`${block}__card__description__row`]}>
                <span
                  className={css[`${block}__card__description__row__label`]}
                >
                  Rating:
                </span>
                <span
                  className={css[`${block}__card__description__row__value`]}
                >
                  {movie?.vote_average}
                </span>
              </div>
              <div className={css[`${block}__card__description__row`]}>
                <span
                  className={css[`${block}__card__description__row__label`]}
                >
                  Overview:
                </span>
              </div>
              <div className={css[`${block}__card__description__row`]}>
                <span
                  className={
                    css[`${block}__card__description__row__value-no-pad`]
                  }
                >
                  {movie?.overview}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  return renderMovieDetails();
};

export default MovieDetails;
