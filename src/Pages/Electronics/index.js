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
      data.success ? alert("✅ Added to cart!") : alert("❌ Failed to add to cart");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/electronics");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching electronics:", err);
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
            <img src={product.photo} alt={product.name} />
            <h3
              className="product-link"
              style={{ cursor: "pointer", color: "#007bff" }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.name}
            </h3>
            <p>${product.price}</p>
            <p>{product.details}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsList;
