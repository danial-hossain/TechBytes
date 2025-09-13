import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./style.css";

const LaptopList = () => {
  const [laptops, setLaptops] = useState([]);
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
    const fetchLaptops = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/laptops");
        const data = await res.json();
        setLaptops(data);
      } catch (error) {
        console.error("Error fetching laptops:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLaptops();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="laptop-container">
      <h2 className="laptop-title">Our Laptops</h2>
      <div className="laptop-grid">
        {laptops.map((laptop) => (
          <div key={laptop.id} className="laptop-card">
            <img src={laptop.photo} alt={laptop.name} className="laptop-image" />
            <h3 className="laptop-name">{laptop.name}</h3>
            <p className="laptop-price">${laptop.price}</p>
            <p className="laptop-details">{laptop.details}</p>
            <button className="laptop-btn" onClick={() => addToCart(laptop.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaptopList;
