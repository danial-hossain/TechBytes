import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./style.css";

const ElectronicsList = () => {
  const [products, setProducts] = useState([]);
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
      alert(data.success ? "✅ Added to cart!" : "❌ Failed to add to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/electronics");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching electronics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="electronics-container">
      <h2 className="electronics-title">Electronics</h2>
      <div className="electronics-grid">
        {products.map((product) => (
          <div key={product.id} className="electronics-card">
            <img src={product.photo} alt={product.name} className="electronics-image" />
            <h3 className="electronics-name">{product.name}</h3>
            <p className="electronics-price">${product.price}</p>
            <p className="electronics-details">{product.details}</p>
            <button className="electronics-btn" onClick={() => addToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsList;
