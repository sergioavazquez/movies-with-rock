import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import css from "./ratingFilter.module.scss";

const block = "rating-filter";

export interface RatingFilterState {
  active: boolean;
  stars: number;
}

interface Props {
  onFilterClick: Function;
  filterStatus: RatingFilterState;
}

const RatingFilter: React.FC<Props> = ({ onFilterClick, filterStatus }) => {
  const onStarClick = (star: number) => {
    const active =
      filterStatus.active && star === filterStatus.stars ? false : true;
    onFilterClick({ active, stars: star });
  };

  return (
    <div className={css[`${block}`]}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          aria-label={"rating filter"}
          key={s}
          onClick={() => onStarClick(s)}
          className={css[`${block}__star`]}
        >
          {filterStatus.active && filterStatus.stars >= s ? (
            <BsStarFill className={css[`${block}__star-full`]} />
          ) : (
            <BsStar className={css[`${block}__star-outline`]} />
          )}
        </button>
      ))}
    </div>
  );
};

export default RatingFilter;
