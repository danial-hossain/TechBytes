import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
          navigate('/login');
          return;
        }

        const { data } = await axios.get('http://localhost:8000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${userInfo.data.accessToken}`,
          },
        });
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        setLoading(false);
        // If token is invalid or expired, redirect to login
        if (err.response?.status === 401) {
          localStorage.removeItem('userInfo');
          navigate('/login');
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);
  const handleLogout = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        await axios.get('http://localhost:8000/api/user/logout', {
          headers: {
            Authorization: `Bearer ${userInfo.data.accessToken}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('userInfo');
      navigate('/login');
    }

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');

  };

  if (loading) {
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