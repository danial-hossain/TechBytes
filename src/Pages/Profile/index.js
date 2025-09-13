import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import './style.css';

const Profile = () => {
  const navigate = useNavigate();
  const { logout, loading: authLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/user/profile', {
          withCredentials: true, // ✅ send cookies automatically
        });
        setUser(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');

        // If token expired or invalid, logout
        if (err.response?.status === 401) {
          logout();
          navigate('/login');
        }
      }
    };

    if (!authLoading) fetchUserProfile();
  }, [authLoading, logout, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/api/user/logout', {
        withCredentials: true, // ✅ send cookies
      });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      logout();
      navigate('/login');
    }
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  if (authLoading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <section className="profile-section">
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        {user && (
          <div className="profile-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
            <p><strong>Address:</strong> {user.address?.length ? user.address.join(', ') : 'No address'}</p>
          </div>
        )}
        <div className="profile-buttons">
          <button onClick={handleEditProfile} className="profile-edit-btn">Edit Profile</button>
          <button onClick={handleLogout} className="profile-logout-btn">Logout</button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
