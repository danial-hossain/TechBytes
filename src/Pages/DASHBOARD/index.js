import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./style.css"; // matches your file

const Dashboard = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  if (!userInfo || userInfo.role !== "ADMIN") {
    navigate("/login"); // prevent non-admins
    return null;
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/dashboard/users")}>Manage Users</li>
          <li onClick={() => navigate("/dashboard/products")}>Manage Products</li>
          <li onClick={() => navigate("/dashboard/orders")}>Orders</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome, {userInfo.name}</h1>
          <p>Role: {userInfo.role}</p>
        </header>

        <section className="dashboard-cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>123</p>
          </div>
          <div className="card">
            <h3>Total Products</h3>
            <p>54</p>
          </div>
          <div className="card">
            <h3>Pending Orders</h3>
            <p>12</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
