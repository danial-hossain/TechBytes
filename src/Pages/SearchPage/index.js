import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/search?q=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-page container">
      <h2>Search Results for: "{query}"</h2>
      {loading && <p>Loading...</p>}
      {results.length === 0 && !loading && <p>No results found</p>}

      <ul className="search-results-list">
        {results.map((product) => (
          <li
            key={product._id}
            className="search-result-item"
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/product/${product.categorySlug}/${product._id}`)
            }
          >
            <img
              src={product.photo}
              alt={product.name}
              className="search-result-image"
            />
            <div className="search-result-info">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.details}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
