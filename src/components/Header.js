import React, { useEffect, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { BsArrowClockwise, BsSearch } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { useGlobalContext } from "../context";
import Filter from "./Filter";
import Search from "./Search";

const Header = () => {
  const { menuToggle,menuState } =
    useGlobalContext();

const {search,refresh,filter} = menuState

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
      {search && <Search />}
      {filter && <Filter />}
      <hr />
    </>
  );
};

export default Header;
