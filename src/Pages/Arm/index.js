import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./style.css";

const ArmList = () => {
  const [arms, setArms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  // Add product to cart
  const addToCart = async (productId) => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userInfo.id,   // ✅ your userId from localStorage/auth
          productId,             // ✅ correct MongoDB _id
          quantity: 1,           // ✅ default quantity
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("✅ Added to cart!");
      } else {
        alert(`❌ Failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Fetch arm products
  useEffect(() => {
    const fetchArms = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/arm");
        const data = await res.json();
        setArms(data);
      } catch (error) {
        console.error("Error fetching arm products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArms();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="arm-container">
      <h2 className="arm-title">Arm Prosthetics</h2>
      <div className="arm-grid">
        {arms.map((product) => (
          <div key={product._id} className="arm-card">
            <img src={product.photo} alt={product.name} className="arm-image" />
            <h3 className="arm-name">{product.name}</h3>
            <p className="arm-price">${product.price}</p>
            <p className="arm-details">{product.details}</p>
            <button
              className="arm-btn"
              onClick={() => addToCart(product._id)} // ✅ use _id
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArmList;
