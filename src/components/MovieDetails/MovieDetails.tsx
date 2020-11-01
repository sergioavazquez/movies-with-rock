import React, { useRef, useLayoutEffect } from "react";
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
  const closeRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (movie !== null && closeRef.current !== null) {
      closeRef.current.focus();
    }
  }, [movie]);

  const renderMovieDetails = () => {
    const mainClass = [css[`${block}`]];
    let content = null;
    if (movie) {
      mainClass.push(css["show"]);
      let imgSrc = missingBack;
      if (movie.backdrop_path) {
        // imgSize should be chosen according to screen dpi/size.
        const imgSize = apiConfig?.images.poster_sizes[5];
        imgSrc = `${apiConfig?.images.secure_base_url}${imgSize}${movie.backdrop_path}`;
      }
      content = (
        <>
          <div className={css[`${block}__card__description`]}>
            <div className={css[`${block}__card__description__row`]}>
              <span
                className={css[`${block}__card__description__row__value-title`]}
              >
                {movie?.title}
              </span>
            </div>
          </div>
          <img src={imgSrc} alt={movie.title} />
          <div className={css[`${block}__card__description`]}>
            <div className={css[`${block}__card__description__row`]}>
              <span className={css[`${block}__card__description__row__label`]}>
                Rating:
              </span>
              <span className={css[`${block}__card__description__row__value`]}>
                {movie?.vote_average}
              </span>
            </div>
            <div className={css[`${block}__card__description__row`]}>
              <span className={css[`${block}__card__description__row__label`]}>
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
        </>
      );
    }
    return (
      <div className={mainClass.join(" ")}>
        <div className={css[`${block}__card`]}>
          <button
            onClick={() => {
              close();
            }}
            ref={closeRef}
            className={css[`${block}__card__close`]}
          >
            <IoIosClose />
          </button>
          {content}
        </div>
      </div>
    );
  };
  return renderMovieDetails();
};

export default MovieDetails;
