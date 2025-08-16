import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Login = () => {
  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form">
          <input
            type="email"
            placeholder="Email"
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">Login</button>
        </form>

        {/* Link to Sign Up */}
        <p className="login-signup-text">
          Don’t have an account?{' '}
          <Link to="/signup" className="login-signup-link">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;