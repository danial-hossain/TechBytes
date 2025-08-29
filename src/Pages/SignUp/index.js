import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Name, Email and Password are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/user/register',
        { name, email, password },
        { withCredentials: true, timeout: 5000 }
      );

      setLoading(false);
      alert(response.data.message || 'SignUp Successful! Check your email for verification.');

      // Navigate to verification page and pass email
      navigate('/verify', { state: { email } });
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || `Server Error: ${err.response.status}`);
      } else if (err.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError(`Error: ${err.message}`);
      }
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        {error && <p className="login-error">{error}</p>}
        <form className="signup-form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
