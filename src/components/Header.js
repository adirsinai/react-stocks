import React, { useEffect, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { BsArrowClockwise, BsSearch } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { useGlobalContext } from "../context";
import Filter from "./Filter";
import Search from "./Search";
import Refresh from "./Refresh";
import Settings from "./Settings";

const Header = () => {
  const { hideSortBtn, setHideSortBtn } = useGlobalContext();
  const [openSearchMenu, setOpenSearchMenu] = useState(false);
  const [openRefreshMenu, setOpenRefreshMenu] = useState(false);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [openSettingMenu, setOpenSettingMenu] = useState(false);

  const menuToggle = (currentMenuItem) => {
    if (currentMenuItem === "search") {
      setOpenSearchMenu(!openSearchMenu);
      setOpenRefreshMenu(false);
      setOpenFilterMenu(false);
      setOpenSettingMenu(false);
    }
    if (currentMenuItem === "refresh") {
      setOpenRefreshMenu(!openRefreshMenu);
      setOpenFilterMenu(false);
      setOpenSearchMenu(false);
      setOpenSettingMenu(false);
    }
    if (currentMenuItem === "filter") {
      setOpenFilterMenu(!openFilterMenu);
      setHideSortBtn(!hideSortBtn);
      setOpenSearchMenu(false);
      setOpenRefreshMenu(false);
      setOpenSettingMenu(false);
    }
    if (currentMenuItem === "setting") {
      setOpenSettingMenu(!openSettingMenu);
      setOpenFilterMenu(false);
      setOpenSearchMenu(false);
      setOpenRefreshMenu(false);
    }
  };


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
      {openSettingMenu && <Settings />}
      <hr />
    </>
  );
};

export default Header;
