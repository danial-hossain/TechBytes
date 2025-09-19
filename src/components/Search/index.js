// src/components/Search.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      // redirect to /search?q=term
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-box classy-search">
      <input
        type="text"
        placeholder="Search products here..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        SEARCH
      </button>
    </form>
  );
}
