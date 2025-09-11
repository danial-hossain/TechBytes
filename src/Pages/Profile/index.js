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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import './style.css';

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, logout, loading: authLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        });
        setUser(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        if (err.response?.status === 401) {
          logout();
          navigate('/login');
        }
      }
    };

    if (!authLoading && userInfo) {
      fetchUserProfile();
    }
  }, [navigate, userInfo, logout, authLoading]);

  const handleLogout = async () => {
    try {
      if (userInfo) {
        await axios.get('http://localhost:8000/api/user/logout', {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  if (authLoading) {
    return <div className="profile-loading">Loading...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  return (
    <section className="profile-section">
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        {user && (
          <div className="profile-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Add more user details as needed */}
          </div>
        )}
        <button onClick={handleLogout} className="profile-logout-btn">
          Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;