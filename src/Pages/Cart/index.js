import React from 'react';
//<Route path="/cart" element={<Cart />} />
import './style.css';
import treeImage from './tree.jpg'; // ✅ correct path

const Cart = () => {
  // Sample cart items
  const cartItems = [
    { id: 1, name: 'Product 1', price: 49.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
  ];

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-section">
      <div className="cart-container">
        {/* 🖼️ Image */}
        <img src={treeImage} alt="Tree" className="cart-image" />

        <h2 className="cart-title">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">Qty: {item.quantity}</span>
                <span className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="cart-total">
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
