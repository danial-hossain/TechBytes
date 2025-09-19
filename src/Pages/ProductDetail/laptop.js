import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./style.css";

const Laptop = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/laptop-product/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
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
        body: JSON.stringify({ userId: userInfo.id, productId: product._id, quantity }),
      });
      const data = await res.json();
      data.success ? alert("✅ Added to cart!") : alert("❌ Failed to add to cart");
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <p className="loading">Loading product...</p>;

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
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <input type="number" min="1" value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value)))} />
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>
        <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Laptop;
