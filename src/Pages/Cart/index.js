import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
>>>>>>> upstream/main
import "./style.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< HEAD

  const userId = "68bbfc3eabfa1a175edb147e";

  useEffect(() => {
    const fetchCart = async () => {
=======
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Get userId from localStorage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.id) setUserId(userInfo.id);
    else navigate("/login");
  }, [navigate]);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;
>>>>>>> upstream/main
      try {
        const res = await fetch(`http://localhost:8000/api/cart/${userId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
<<<<<<< HEAD
        console.log("Data from server:", data);
        const validCartItems = data.filter(item => item.product);
        setCart(validCartItems);
      } catch (err) {
        console.error(err);
        setError(err.message);
=======
        console.log("Cart response:", data);
        setCart(Array.isArray(data) ? data.filter(item => item.product) : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch cart");
>>>>>>> upstream/main
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleDelete = async (itemId) => {
    try {
<<<<<<< HEAD
      const res = await fetch(`http://localhost:8000/api/cart/delete/${itemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      setCart(cart.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) return <div className="cart-container">Loading your cart...</div>;
  if (error) return <div className="cart-container">Error: {error}</div>;

  return (
    <section className="cart-section">
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        {cart.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <Link to="/" className="btn-shop">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart-items-header">
              <span>Product</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="item-product">
                    <img src={item.product.photo} alt={item.product.name} className="item-image" />
                    <div>
                      <span>{item.product.name}</span>
                      <span>${item.product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div>{item.quantity}</div>
                  <div>${(item.product.price * item.quantity).toFixed(2)}</div>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
=======
      const res = await fetch(`http://localhost:8000/api/cart/delete/${itemId}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      setCart(cart.filter(item => item._id !== itemId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete item");
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="cart-section">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/" className="btn-shop">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items-header">
            <span>Product</span><span>Quantity</span><span>Subtotal</span>
          </div>
          <div className="cart-items-list">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <div className="item-product">
                  <img src={item.product.photo} alt={item.product.name} className="item-image" />
                  <div>
                    <span>{item.product.name}</span>
                    <span>${item.product.price.toFixed(2)}</span>
                  </div>
                </div>
                <div>{item.quantity}</div>
                <div>${(item.product.price * item.quantity).toFixed(2)}</div>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
>>>>>>> upstream/main
    </section>
  );
};

export default Cart;
