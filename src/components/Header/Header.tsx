import React, { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";
import css from "./header.module.scss";

const block = "header";

interface Props {
  search: Function;
}

const Header: React.FC<Props> = ({ search }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      search(e.target.value);
    }
  };

  return (
    <header className={css[`${block}`]}>
      <div className={css[`${block}__search`]}>
        <input placeholder="Search..." onChange={(e) => handleSearch(e)} />
        <BiSearch />
      </div>
      <div className={css[`${block}__stars`]}></div>
    </header>
  );
};

export default Header;
