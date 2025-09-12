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

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !otp) {
      setError('Email and OTP are required');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/user/verify-email',
        { email, otp },
        { withCredentials: true }
      );

      setLoading(false);
      setSuccess(data.message || 'Email verified successfully!');
      alert('Email verified successfully!');
      navigate('/login');
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
    <section className="verification-section">
      <div className="verification-container">
        <h2 className="verification-title">Verify Your Email</h2>
        {error && <p className="verification-error">{error}</p>}
        {success && <p className="verification-success">{success}</p>}

        <form className="verification-form" onSubmit={handleVerify}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Verification;