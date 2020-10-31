import React, { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { ReactComponent as Logo } from "static/img/rock-icon.svg";
import css from "./header.module.scss";

const block = "header";

interface Props {
  search: Function;
}

const Header: React.FC<Props> = ({ search }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    search(encodeURI(e.target.value));
  };

  return (
    <header className={css[`${block}`]}>
      <div className={css[`${block}__brand`]}>
        <Logo />
        <span>M.T.R.</span>
      </div>
      <div className={css[`${block}__search`]}>
        <input placeholder="Search..." onChange={(e) => handleSearch(e)} />
        <BiSearch />
      </div>
    </header>
  );
};

export default Header;
