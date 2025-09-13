import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import './style.css'; // Make sure this points to your CSS

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuth();
  const [user, setUser] = useState(userInfo);

  useEffect(() => {
    if (!userInfo) navigate("/login");
    else setUser(userInfo);
  }, [userInfo, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/user/logout", { withCredentials: true });
    } catch (err) {
      console.error(err);
    } finally {
      logout();
      navigate("/login");
    }
  };

  const handleEditProfile = () => navigate("/profile/edit");

  if (!user) return <div className="profile-loading">Loading...</div>;

  return (
    <section className="profile-section">
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Address:</strong> {user.address_details?.length ? user.address_details.join(", ") : "No address"}</p>
        </div>

        <div className="profile-buttons">
          <button onClick={handleEditProfile} className="profile-edit-btn">Edit Profile</button>
          <button onClick={handleLogout} className="profile-logout-btn">Logout</button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
