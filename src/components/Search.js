import React from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const { filters, handleSuggestSearch, handleKeypress } = useGlobalContext();

const { query } = filters;

  return (
    <div className="form-content">
      <form className="form-control">
        <input
          type="text"
          className="searchTerm"
          placeholder="Search stock..."
          onChange={(e) => handleSuggestSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
