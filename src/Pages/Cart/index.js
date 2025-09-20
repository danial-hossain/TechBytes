import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./style.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useAuth(); // useAuth to get logged-in user
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo) return;

      try {
        const res = await fetch("http://localhost:8000/api/cart", {
          method: "GET",
          credentials: "include", // ✅ send JWT cookie
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (data.success) {
          setCart(
            Array.isArray(data.cart)
              ? data.cart.filter((item) => item.product)
              : []
          );
        } else {
          setError(data.message || "Failed to fetch cart");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userInfo]);

  // Total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Delete item
  const handleDelete = async (itemId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/cart/delete/${itemId}`,
        {
          method: "DELETE",
          credentials: "include", // ✅ send JWT cookie
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Delete failed");

      setCart((prev) => prev.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error("Failed to delete item:", err);
      setError("Failed to delete item");
    }
  };

  // Update quantity
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/cart/update/${itemId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ send JWT cookie
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Update failed");

      setCart((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setError("Failed to update quantity");
    }
  };

  if (loading) return <div className="loading">Loading cart...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="cart-section">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn-shop">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Action</span>
          </div>

          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-product">
                  <img
                    src={item.product.photo}
                    alt={item.product.name}
                    className="item-image"
                  />
                  <div>
                    <span className="item-name">{item.product.name}</span>
                    <span className="item-price">
                      ${item.product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="quantity-section">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item._id, Number(e.target.value))
                    }
                  />
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="item-subtotal">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>

                <div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/order", { state: { cart: cart, total: totalPrice } })
              }
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
