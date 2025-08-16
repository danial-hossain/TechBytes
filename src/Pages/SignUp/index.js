import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const SignUp = () => {
  // State for inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSignUp = (e) => {
    e.preventDefault(); // prevent page reload
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    alert('Sign Up button clicked!');
    // You can add your Firebase or API signup logic here
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-title">Sign Up</h2>
        <form className="login-form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">Sign Up</button>
        </form>

        <p className="login-signup-text">
          Already have an account?{' '}
          <Link to="/login" className="login-signup-link">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
