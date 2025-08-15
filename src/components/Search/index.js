import React from "react";
import "./style.css";

const Search = () => {
  return (
    <div className="search-box classy-search">
      <input
        type="text"
        placeholder="Search products here..."
        className="search-input"
      />
      <button className="search-button">SEARCH</button>
    </div>
  );
};

export default Search;
