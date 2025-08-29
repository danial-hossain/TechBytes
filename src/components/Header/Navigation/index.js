import React from 'react';
import { Link } from "react-router-dom";
import "./style.css"; // Import your CSS

const Navigation = () => {
  return (
    <nav className="navigation-bar">
      {/* Navigation links only */}
      <div className="nav-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Desktop</Link>
          </li>
          <li>
            <Link to="/laptops">Laptop</Link> {/* <-- updated route */}
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
