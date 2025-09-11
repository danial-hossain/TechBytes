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

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Search from "../Search";
import { IoHeartOutline, IoCartOutline, IoReturnUpBackSharp } from "react-icons/io5";
import "./style.css";
import Navigation from "./Navigation";

const Header = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // Re-run on route change

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
          {isLoggedIn ? (
            <Link to="/profile" className="signin-text">Account</Link>
          ) : (
            <Link to="/login" className="signin-text">Account</Link>
          )}
          
          <Link to="/returns">
            <IconWithBadge icon={<IoReturnUpBackSharp size={20} />} count={0} />
          </Link>

          <Link to="/wishlist">
            <IconWithBadge icon={<IoHeartOutline size={20} />} count={0} />
          </Link>

          {/* 🛒 FIX: wrap Cart with Link */}
          <Link to="/cart">
            <IconWithBadge icon={<IoCartOutline size={20} />} count={1} />
          </Link>
        </div>
      </div>

      {/* 🔵 Combined Sub Header Row */}
      <div className="sub-header">
        <div className="container flex items-center gap-6">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
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