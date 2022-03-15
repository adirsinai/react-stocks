import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { formatPrice } from "../utils/helpers";

const Filter = () => {
  const { filters, setFilters, updateFilters, searchHandle } =
    useGlobalContext();

  return (
    <div className="form-content">
      <form className="form-control">
        <div>
          <input
            type="text"
            className="searchTerm"
            placeholder="Filterd Stock..."
            onChange={(e) => searchHandle(e.target.value)}
          />
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="all"
            checked={filters.trend === "all"}
            onChange={updateFilters}
          />
          All
          <input
            type="checkbox"
            name="losing"
            checked={filters.trend === "losing"}
            onChange={updateFilters}
          />
          Losing
          <input
            type="checkbox"
            name="gaining"
            checked={filters.trend === "gaining"}
            onChange={updateFilters}
          />
          Gaining
        </div>
        <div>
          <h5 className="percentView">
            {formatPrice(parseFloat(filters.percentage))}%
          </h5>
          <input         
            type="range"
            name="percentage"
            onChange={updateFilters}
            min={filters.min_percentage}
            max={filters.max_percentage}
            value={filters.percentage}
            step="0.01"
          />
        </div>
      </form>
    </div>
  );
};

export default Filter;
