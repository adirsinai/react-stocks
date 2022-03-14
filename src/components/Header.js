import React, { useEffect, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { BsArrowClockwise, BsSearch } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { useGlobalContext } from "../context";
import Filter from "./Filter";
import Search from "./Search";
import Refresh from "./Refresh";

const Header = () => {
  const { menuToggle, openSearchMenu, openRefreshMenu, openFilterMenu } =
    useGlobalContext();

  return (
    <>
      <header>
        <h2>STOKR</h2>
        <div>
          <BsSearch className="icon" onClick={() => menuToggle("search")} />
          <BsArrowClockwise
            className="icon"
            onClick={() => menuToggle("refresh")}
          />
          <HiOutlineFilter
            className="icon"
            onClick={() => menuToggle("filter")}
          />
          <FiSettings className="icon" onClick={() => menuToggle("setting")} />
        </div>
      </header>
      {openSearchMenu && <Search />}
      {openRefreshMenu && <Refresh />}
      {openFilterMenu && <Filter />}
      <hr />
    </>
  );
};

export default Header;
