import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";

const Navigation = () => {
  return (
    <nav className="navigation-bar">
      <div className="nav-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Desktop</Link></li>
          <li><Link to="/laptops">Laptop</Link></li>
          <li><Link to="/electronics">Electronics</Link></li> {/* updated */}
          <li><Link to="/arms">Prosthetic Arms</Link></li>
          <li><Link to="/">Prosthetic Legs</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
