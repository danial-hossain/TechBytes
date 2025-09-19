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
        credentials: "include",
        body: JSON.stringify({ userId: userInfo.id, productId, quantity: 1 }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("✅ Added to cart!");
      } else {
        alert(`❌ Failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  useEffect(() => {
    const fetchDesktops = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/desktop");
        const data = await res.json();
        setDesktops(data);
      } catch (err) {
        console.error(err);
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
          <div key={desktop._id} className="desktop-card">
            <img src={desktop.photo} alt={desktop.name} className="desktop-image" />
            <h3
              className="desktop-name"
              style={{ cursor: "pointer", color: "#007bff" }}
              onClick={() => navigate(`/product/desktops/${desktop._id}`)}
            >
              {desktop.name}
            </h3>
            <p className="desktop-price">${desktop.price}</p>
            <p className="desktop-details">{desktop.details}</p>
            <button onClick={() => addToCart(desktop._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopList;
