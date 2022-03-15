import React from "react";

const Search = () => {
  return (
    <div className="form-content">
      <form className="form-control">
        <input type="text" className="searchTerm" placeholder="Add Stock..." />
        <button className="cancel-btn">Cancel</button>
      </form>
    </div>
  );
};

export default Search;
