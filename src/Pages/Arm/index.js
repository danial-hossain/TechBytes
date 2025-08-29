import React, { useEffect, useState } from "react";
import "./style.css";  // ✅ your custom styles

const ArmList = () => {
  const [arms, setArms] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <div key={product.id} className="arm-card">
            <img src={product.photo} alt={product.name} className="arm-image" />
            <h3 className="arm-name">{product.name}</h3>
            <p className="arm-price">${product.price}</p>
            <p className="arm-details">{product.details}</p>
            <button className="arm-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArmList;
