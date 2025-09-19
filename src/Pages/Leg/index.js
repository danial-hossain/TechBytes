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
        credentials: "include",
        body: JSON.stringify({ userId: userInfo.id, productId, quantity: 1 }),
      });

      const data = await res.json();
      if (res.ok && data.success) alert("✅ Added to cart!");
      else alert(`❌ Failed: ${data.message || "Unknown error"}`);
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  useEffect(() => {
    const fetchLegs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/legs");
        const data = await res.json();
        setLegs(data);
      } catch (err) {
        console.error("Error fetching prosthetic legs:", err);
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
          <div key={leg._id} className="legs-card">
            <img
              src={leg.photo}
              alt={leg.name}
              className="legs-image"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/legs/${leg._id}`)}
            />
            <h3
              className="legs-name"
              style={{ cursor: "pointer", color: "#007bff" }}
              onClick={() => navigate(`/product/legs/${leg._id}`)}
            >
              {leg.name}
            </h3>
            <p className="legs-price">${leg.price}</p>
            <p className="legs-details">{leg.details}</p>
            <button className="legs-btn" onClick={() => addToCart(leg._id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegsList;
