<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
>>>>>>> upstream/main
import "./style.css";  // ✅ your custom styles

const ArmList = () => {
  const [arms, setArms] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD

  // 👤 Temporary: hardcode a userId (replace later with logged-in user)
  const userId = "68bbfc3eabfa1a175edb147e";

  // ✅ Function to add a product to the cart
  const addToCart = async (productId) => {
=======
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  // ✅ Function to add a product to the cart
  const addToCart = async (productId) => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

>>>>>>> upstream/main
    try {
      const res = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
        body: JSON.stringify({ userId, productId }),
=======
        body: JSON.stringify({ userId: userInfo.id, productId }),
>>>>>>> upstream/main
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Added to cart!");
      } else {
        alert("❌ Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Fetch products when component loads
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
<<<<<<< HEAD
              onClick={() => addToCart(product.id)}  // ✅ connect button
=======
              onClick={() => {
                console.log('product:', product);
                addToCart(product.id);
              }}  // ✅ connect button
>>>>>>> upstream/main
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ArmList;
=======
export default ArmList;
>>>>>>> upstream/main
