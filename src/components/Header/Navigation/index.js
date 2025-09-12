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
            <Link to="/arms">Prosthetic Arms</Link> {/* ✅ goes to ArmList */}
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