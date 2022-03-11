import React, { useState } from "react";
import { useGlobalContext } from "../context";


const Filter = () => {
  const { setFilterStocks } = useGlobalContext()

  return (
    <form className="form-control">
      <input
        type="text"
        className="searchTerm"
        placeholder="Filterd Stock..."
        onChange={(e) => setFilterStocks(e.target.value)}
      />
    </form>
  );
};

export default Filter;
