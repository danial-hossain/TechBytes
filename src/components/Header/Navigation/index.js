import Button from '@mui/material/Button';
import React from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./style.css"; // Import your CSS

const Navigation = () => {
  return (
    <nav className="navigation-bar">
      {/* Left: Shop by Categories button */}
      <div className="nav-left">
        <Button className="nav-btn">
          <RiMenu2Fill className="nav-icon" />
          SHOP BY CATEGORIES
        </Button>
      </div>

      {/* Right: Navigation links */}
      <div className="nav-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Desktop</Link>
          </li>
          <li>
            <Link to="/">Laptop</Link>
          </li>
          <li>
            <Link to="/">Electronics</Link>
          </li> 
          <li>
            <Link to="/">Prosthetic Arms</Link>
          </li>
          <li>
            <Link to="/">Prosthetic Legs</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
