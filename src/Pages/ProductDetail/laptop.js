import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./style.css";

const Laptop = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8000/api/laptop-product/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Product not found");
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!userInfo) return navigate("/login");

    try {
      const res = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId: userInfo.id, productId: product._id, quantity }),
      });
      const data = await res.json();
      if (res.ok && data.success) alert("✅ Added to cart!");
      else alert(`❌ Failed: ${data.message || "Unknown error"}`);
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  if (loading) return <p className="loading">Loading product...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.photo} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">${product.price}</p>
        <p className="details">{product.details}</p>

        <div className="quantity-section">
          <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
          />
          <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
        </div>

        <button className="add-to-cart-btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Laptop;
