import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./style.css";

const LegsList = () => {
  const [legs, setLegs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userInfo.id, productId }),
      });

      const data = await res.json();
      if (data.success) alert("✅ Added to cart!");
      else alert("❌ Failed to add to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const fetchLegs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/legs");
        const data = await res.json();
        setLegs(data);
      } catch (error) {
        console.error("Error fetching prosthetic legs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLegs();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="legs-container">
      <h2 className="legs-title">Prosthetic Legs</h2>
      <div className="legs-grid">
        {legs.map((leg) => (
          <div key={leg.id} className="legs-card">
            {/* Navigate to detail page on click */}
            <img
              src={leg.photo}
              alt={leg.name}
              className="legs-image"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/legs/${leg.id}`)}
            />
            <h3
              className="legs-name"
              style={{ cursor: "pointer", color: "#007bff" }}
              onClick={() => navigate(`/product/legs/${leg.id}`)}
            >
              {leg.name}
            </h3>
            <p className="legs-price">${leg.price}</p>
            <p className="legs-details">{leg.details}</p>
            <button className="legs-btn" onClick={() => addToCart(leg.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegsList;
