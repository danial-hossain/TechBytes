// src/Pages/Desktop/index.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./style.css";

const DesktopList = () => {
  const [desktops, setDesktops] = useState([]);
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
    const fetchDesktops = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/desktop"); // ✅ Backend Desktop route
        const data = await res.json();
        console.log("Desktop data:", data); // Debugging
        setDesktops(data);
      } catch (error) {
        console.error("Error fetching desktops:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDesktops();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="desktop-container">
      <h2 className="desktop-title">Our Desktops</h2>
      <div className="desktop-grid">
        {desktops.map((desktop) => (
          <div key={desktop.id} className="desktop-card">
            <img src={desktop.photo} alt={desktop.name} className="desktop-image" />
            <h3 className="desktop-name">{desktop.name}</h3>
            <p className="desktop-price">${desktop.price}</p>
            <p className="desktop-details">{desktop.details}</p>
            <button className="desktop-btn" onClick={() => addToCart(desktop.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopList;
