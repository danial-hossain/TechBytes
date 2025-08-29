import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'; // SignUp CSS

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!fullName || !email || !password) {
      setError('Full Name, Email and Password are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Axios request with proper base URL and timeout
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        {
          fullName,
          email,
          password,
          phone,
          address,
          dob,
          gender
        },
        { timeout: 5000 } // 5 sec timeout
      );

      setLoading(false);
      alert(response.data.message || 'SignUp Successful! Please login.');

      navigate('/login');
    } catch (err) {
      setLoading(false);

      // Detailed error handling
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.message || `Server Error: ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response
        setError('No response from server. Please try again later.');
      } else {
        // Other errors
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
          <input
            type="tel"
            placeholder="Contact Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="signup-login-text">
          Already have an account?{' '}
          <Link to="/login" className="signup-login-link">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
