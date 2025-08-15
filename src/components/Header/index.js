import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Search from "../Search";
import { IoHeartOutline, IoCartOutline, IoReturnUpBackSharp } from "react-icons/io5";
import "./style.css";
import Navigation from "./Navigation";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header-container">
      {/* 🔴 Promo Strip */}
      <div className="top-strip">
        <p className="promo-text">
          Get up to 50% off new season styles, limited time only
        </p>
        <div className="top-links">
          <Link to="/help-center">Help Center</Link>
          <Link to="/order-tracking">Order Tracking</Link>
        </div>
      </div>

      {/* 🟢 Main Header */}
      <div className="main-header-content container">
        {/* Logo */}
        <div className="header-logo flex items-center">
          <img src={logo} alt="Logo" className="logo" />
          <h2 className="brand-name">TechBytes</h2>
        </div>

        {/* Search */}
        <div className="header-search">
          <Search />
        </div>

        {/* Icons + Login */}
        <div className="header-icons">
          <Link to="/login" className="signin-text">Login / Register</Link>
          <IconWithBadge icon={<IoReturnUpBackSharp size={20} />} count={0} />
          <IconWithBadge icon={<IoHeartOutline size={20} />} count={0} />
          <IconWithBadge icon={<IoCartOutline size={20} />} count={1} />
        </div>
      </div>

      {/* 🔵 Combined Sub Header Row */}
      <div className="sub-header">
        <div className="container flex items-center gap-6">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
         
          </Link>
          <Navigation /> {/* Now placed beside Home */}
        </div>
      </div>
    </header>
  );
};

const IconWithBadge = ({ icon, count }) => (
  <div className="icon-badge">
    {icon}
    {count > 0 && <span className="badge">{count}</span>}
  </div>
);

export default Header;
