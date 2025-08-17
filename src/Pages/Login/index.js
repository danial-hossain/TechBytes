import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // separate CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }

    setLoading(true);

    // Simulate API/login
    setTimeout(() => {
      setLoading(false);
      alert(`Logged in with email: ${email}`);
      // TODO: redirect to home page or store login session
    }, 1500);
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          {error && <p className="login-error">{error}</p>}

          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <div className="options-row">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              /> Remember Me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="social-login">
            <p>Or login with:</p>
            <button type="button" className="social-btn google">Google</button>
            <button type="button" className="social-btn facebook">Facebook</button>
          </div>
        </form>

        <p className="login-signup-text">
          Don’t have an account?{' '}
          <Link to="/signup" className="login-signup-link">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
