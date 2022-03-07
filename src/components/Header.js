import React from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { BsArrowClockwise, BsSearch } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
const Header = () => {
  return (
    <>
      <header>
        <h2>STOKR</h2>
        <div>
          <BsSearch className="icon" />
          <BsArrowClockwise className="icon" />
          <HiOutlineFilter className="icon" />
          <FiSettings className="icon" />
        </div>
      </header>
      <hr />
    </>
  );
};

export default Header;
